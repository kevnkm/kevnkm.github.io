import { useState, useEffect } from "react";
import StaggeredMenu from "./StaggeredMenu";
import { useNavigate } from "react-router-dom";
import logo from "../images/kevnkm_icon.png";

const menuItems = [
    { label: "Home", ariaLabel: "Welcome", link: "/" },
    { label: "Projects", ariaLabel: "View my projects", link: "/projects" },
    { label: "About", ariaLabel: "Learn about me", link: "/about" },
    { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
];

const socialItems = [
    { label: "GitHub", link: "https://github.com/kevnkm" },
    { label: "LinkedIn", link: "https://www.linkedin.com/in/kevnkm/" },
];

const Header = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

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
            className={`fixed top-0 left-0 w-full z-100 flex items-center justify-between h-25 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
                }`}
        >
            <StaggeredMenu
                position="right"
                items={menuItems}
                socialItems={socialItems}
                displaySocials={true}
                displayItemNumbering={true}
                menuButtonColor="#000"
                openMenuButtonColor="#ff6b6b"
                changeMenuColorOnOpen={true}
                colors={["#B19EEF", "#5227FF"]}
                logoUrl={logo}
                accentColor="#ff6b6b"
                onMenuOpen={() => {
                    setIsMenuOpen(true);
                    console.log("Menu opened");
                }}
                onMenuClose={() => {
                    setIsMenuOpen(false);
                    console.log("Menu closed");
                }}
                onLogoClick={() => {
                    navigate("/");
                }}
                className="flex items-center w-full"
            />
        </header>
    );
};

export default Header;