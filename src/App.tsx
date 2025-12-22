import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Work from "./pages/Work";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="flex flex-col min-h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;