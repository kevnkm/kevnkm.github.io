import React from "react";
import logo from "../images/kevinkmkim_icon.png";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div className="h-screen bg-white flex flex-col overflow-hidden">
            <nav className="bg-white p-4 h-16 flex-shrink-0">
                <div className="container mx-auto flex justify-between items-center h-full px-4">
                    <Link to="/" className="flex items-center">
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-6 w-auto"
                            draggable="false"
                        />
                        <span className="text-xl font-bold font-dot-gothic-16 sm:inline ml-2">
                            Kevin Kim
                        </span>
                    </Link>
                </div>
            </nav>

            <div className="flex flex-1 justify-center items-center space-x-8 overflow-hidden">
                <div className="flex flex-col space-y-4">
                    <a
                        href="https://www.cubeloom.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-blue-500 text-lg text-center"
                    >
                        Cubeloom
                    </a>
                    <a
                        href="https://kevinkmkim.github.io/GraphicsHub/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-blue-500 text-lg text-center"
                    >
                        GraphicsHub
                    </a>
                    <a
                        href="https://github.com/kevinkmkim"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-blue-500 text-lg text-center"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://www.linkedin.com/in/kevinkmkim/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-blue-500 text-lg text-center"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Home;