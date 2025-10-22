import React from "react";
import StaggeredMenu from "./StaggeredMenu";
import logo from "../images/kevnkm_icon.png";

const menuItems = [
    { label: "Home", ariaLabel: "View my projects", link: "/" },
    { label: "About", ariaLabel: "Learn about me", link: "/about" },
    { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
];

const socialItems = [
    { label: "GitHub", link: "https://github.com/kevnkm" },
    { label: "LinkedIn", link: "https://www.linkedin.com/in/kevnkm/" },
];

const Header: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between h-25">
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
                onMenuOpen={() => console.log("Menu opened")}
                onMenuClose={() => console.log("Menu closed")}
                className="flex items-center w-full"
            />
        </header>
    );
};

export default Header;