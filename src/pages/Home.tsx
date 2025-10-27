import { useEffect, useState } from 'react';
import graduationImage from "@/images/me/graduation.jpg";
import TiltedCard from "@/components/TiltedCard";
import AnimatedContent from '@/components/AnimatedContent';
import RotatingText from '@/components/RotatingText';

const useIsTouchDevice = () => {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const checkTouch = () => {
            const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            setIsTouchDevice(isTouch);
        };

        checkTouch();

        window.addEventListener('touchstart', checkTouch);
        return () => window.removeEventListener('touchstart', checkTouch);
    }, []);

    return isTouchDevice;
};

const Home = () => {
    const isTouchDevice = useIsTouchDevice();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground transition-colors duration-300 p-6 text-center">
            <AnimatedContent
                distance={50}
                direction="vertical"
                reverse={false}
                duration={1}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity
                scale={1}
                threshold={0.2}
                delay={0.3}
            >
                {isTouchDevice ? (
                    <img
                        src={graduationImage}
                        alt="Kevin Kim"
                        className="w-64 h-64 rounded-full mb-6 object-cover"
                        draggable={false}
                    />
                ) : (
                    <TiltedCard
                        imageSrc={graduationImage}
                        altText="Kevin Kim"
                        containerHeight="16rem"
                        containerWidth="16rem"
                        imageHeight="16rem"
                        imageWidth="16rem"
                        scaleOnHover={1.1}
                        rotateAmplitude={10}
                        showMobileWarning={false}
                        showTooltip={false}
                        displayOverlayContent={false}
                        borderRadius="50%"
                    />
                )}
                <h1 className="text-3xl md:text-4xl font-bold my-6">
                    Hi, I'm Kevin 👋
                </h1>
            </AnimatedContent>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                I'm an interactive designer and developer passionate about blending{" "}
                <span className="text-foreground font-medium">creativity</span>,{" "}
                <span className="text-foreground font-medium">technology</span>, and{" "}
                <span className="text-foreground font-medium">education</span>.
                Recently, I've been building XR games, AI-powered productivity tools, and immersive learning experiences for research purposes.
            </p>
            <div>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                    Outside of work, I enjoy playing
                </p>
                <RotatingText
                    texts={['basketball', 'instruments🎹🎸', 'chess', 'Smash Bros', 'board games', 'random card games that no one has heard of']}
                    mainClassName="text-base md:text-lg  text-foreground overflow-hidden justify-center rounded-lg"
                    staggerFrom={"random"}
                    initial={{ y: "-100%" }}
                    animate={{ y: 1 }}
                    exit={{ y: "100%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={3500}
                /></div>
        </div>
    );
};

export default Home;