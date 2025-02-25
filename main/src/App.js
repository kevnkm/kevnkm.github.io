import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./pages/Home";
import logo from "./images/memoji_laptop.png";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <nav className="bg-white p-4 h-16">
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

            <a
              href="https://kevinkmkim.github.io/GraphicsHub/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GraphicsHub
            </a>
            <a
              href="https://github.com/kevinkmkim"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/kevinkmkim/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </nav>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
