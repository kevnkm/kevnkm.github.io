import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PillNav from "./PillNav";
import logo from "../images/kevnkm_icon.png";

const menuItems = [
    { label: "About", ariaLabel: "Welcome", href: "/" },
    { label: "Projects", ariaLabel: "View my projects", href: "/projects" },
    { label: "Contact", ariaLabel: "Get in touch", href: "/contact" },
];

const Header = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50 && !isMenuOpen) {
                // Scrolling down and menu is closed
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY) {
                // Scrolling up
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY, isMenuOpen]);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 flex items-center justify-center h-16 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
                }`}
        >
            <PillNav
                logo={logo}
                logoAlt="Kevin Kim"
                items={menuItems}
                activeHref={location.pathname}
                className="flex items-center w-full px-4"
                baseColor="#000"
                pillColor="#fff"
                hoveredPillTextColor="#fff"
                pillTextColor="#000"
                ease="power3.out"
                initialLoadAnimation={true}
                onMobileMenuClick={() => {
                    setIsMenuOpen((prev) => !prev);
                }}
            />
        </header>
    );
};

export default Header;