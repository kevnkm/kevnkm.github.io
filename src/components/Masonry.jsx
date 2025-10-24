import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

const useMedia = (queries, values, defaultValue) => {
  const get = () =>
    values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;

  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach((q) => matchMedia(q).addEventListener("change", handler));
    return () =>
      queries.forEach((q) =>
        matchMedia(q).removeEventListener("change", handler)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries]);

  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

const preloadImages = async (urls) => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve();
          img.onerror = () => {
            console.error(`Failed to load image: ${src}`);
            resolve();
          };
        })
    )
  );
};

const Masonry = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
}) => {
  const columns = useMedia(
    [
      "(min-width:1600px)",
      "(min-width:1200px)",
      "(min-width:800px)",
      "(min-width:500px)",
    ],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const animationTimeline = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const isDesktop = useMedia(["(min-width: 768px)"], [true], false);

  const getInitialPosition = (item) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;

    if (animateFrom === "random") {
      const directions = ["top", "bottom", "left", "right"];
      direction = directions[Math.floor(Math.random() * directions.length)];
    }

    switch (direction) {
      case "top":
        return { x: item.x, y: -200 };
      case "bottom":
        return { x: item.x, y: window.innerHeight + 200 };
      case "left":
        return { x: -200, y: item.y };
      case "right":
        return { x: window.innerWidth + 200, y: item.y };
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    const imageUrls = items.filter((i) => i.img).map((i) => i.img);

    if (imageUrls.length === 0) {
      setImagesReady(true);
      return;
    }

    preloadImages(imageUrls)
      .then(() => {
        setImagesReady(true);
      })
      .catch((err) => {
        console.error("Error preloading images:", err);
        setImagesReady(true);
      });
  }, [items]);

  const grid = useMemo(() => {
    if (!width) return [];

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    return items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height = child.height / 2;
      const y = colHeights[col];

      colHeights[col] += height;

      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  useLayoutEffect(() => {
    if (!imagesReady || grid.length === 0) return;

    if (animationTimeline.current) {
      animationTimeline.current.kill();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsInitialLoad(false);
      },
    });

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const element = document.querySelector(selector);

      if (!element) return;

      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
      };

      if (isInitialLoad) {
        const initialPos = getInitialPosition(item);

        gsap.set(selector, {
          opacity: 0,
          x: initialPos.x,
          y: initialPos.y,
          width: item.w,
          height: item.h,
          scale: 1,
          ...(blurToFocus && { filter: "blur(10px)" }),
        });

        tl.to(
          selector,
          {
            opacity: 1,
            ...animationProps,
            scale: 1,
            ...(blurToFocus && { filter: "blur(0px)" }),
            duration: 0.8,
            ease: "power3.out",
          },
          index * stagger
        );
      } else {
        gsap.to(selector, {
          ...animationProps,
          duration: duration,
          ease: ease,
          overwrite: "auto",
        });
      }
    });

    animationTimeline.current = tl;

    return () => {
      if (animationTimeline.current) {
        animationTimeline.current.kill();
      }
    };
  }, [
    grid,
    imagesReady,
    isInitialLoad,
    stagger,
    animateFrom,
    blurToFocus,
    duration,
    ease,
  ]);

  const handleMouseEnter = (e, item) => {
    const element = e.currentTarget;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: hoverScale,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay");
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.3,
          duration: 0.3,
        });
      }
    }
  };

  const handleMouseLeave = (e, item) => {
    const element = e.currentTarget;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay");
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
        });
      }
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const ItemDetailContent = () => {
    if (!selectedItem) return null;

    return (
      <div className="space-y-4">
        {selectedItem.img && (
          <img
            src={selectedItem.img}
            alt={selectedItem.id}
            className="w-full rounded-lg"
          />
        )}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Item ID: {selectedItem.id}
          </p>
          {selectedItem.url && (
            <Button
              onClick={() =>
                window.open(selectedItem.url, "_blank", "noopener")
              }
              className="w-full"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit Link
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div ref={containerRef} className="relative w-full h-full">
        {grid.map((item) => (
          <div
            key={item.id}
            data-key={item.id}
            className="absolute p-1.5 cursor-pointer top-0 left-0 will-change-transform will-change-opacity"
            onClick={() => handleItemClick(item)}
            onMouseEnter={(e) => handleMouseEnter(e, item)}
            onMouseLeave={(e) => handleMouseLeave(e, item)}
          >
            {item.img ? (
              <div
                className="relative w-full h-full bg-cover bg-center rounded-lg shadow-xl border border-border"
                style={{ backgroundImage: `url(${item.img})` }}
              >
                {colorShiftOnHover && (
                  <div className="color-overlay absolute inset-0 bg-primary/20 opacity-0 pointer-events-none rounded-lg" />
                )}
              </div>
            ) : (
              <div className="relative w-full h-full bg-background text-foreground flex items-center justify-center rounded-lg shadow-xl border border-border uppercase text-[10px] leading-[10px]">
                <span>No Image Available</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedItem?.name || "Item Details"}</DialogTitle>
            </DialogHeader>
            <ItemDetailContent />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>{selectedItem?.name || "Item Details"}</DrawerTitle>
            </DrawerHeader>
            <div className="px-4">
              <ItemDetailContent />
            </div>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}

      <style jsx global>{`
        [data-radix-dialog-overlay],
        [vaul-drawer-wrapper] [vaul-overlay] {
          backdrop-filter: blur(10px) !important;
          -webkit-backdrop-filter: blur(10px) !important;
        }
      `}</style>
    </>
  );
};

export default Masonry;
