declare module "@/components/Masonry" {
  import { FC } from "react";

  interface MasonryItem {
    id: string | number;
    img?: string;
    url: string;
    height: number;
    [key: string]: any; // For any additional properties
  }

  interface MasonryProps {
    items: MasonryItem[];
    ease?: string;
    duration?: number;
    stagger?: number;
    animateFrom?: "top" | "bottom" | "left" | "right" | "center" | "random";
    scaleOnHover?: boolean;
    hoverScale?: number;
    blurToFocus?: boolean;
    colorShiftOnHover?: boolean;
  }

  const Masonry: FC<MasonryProps>;
  export default Masonry;
}
