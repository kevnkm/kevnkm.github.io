import Magnet from "@/components/Magnet";
import { Github, Linkedin } from "lucide-react";

const Contact = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground transition-colors duration-300 p-4">
            <h1 className="text-2xl font-bold mb-8 text-foreground text-center">
                Love creating in entertainment or edtech? Let&apos;s connect!
            </h1>
            <div className="flex space-x-6">
                <Magnet wrapperClassName="w-16 h-16" innerClassName="w-full h-full">
                    <a
                        href="https://github.com/kevnkm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                    >
                        <Github className="w-12 h-12 text-foreground hover:text-primary transition-colors" />
                    </a>
                </Magnet>

                <Magnet wrapperClassName="w-16 h-16" innerClassName="w-full h-full">
                    <a
                        href="https://www.linkedin.com/in/kevnkm/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                    >
                        <Linkedin className="w-12 h-12 text-foreground hover:text-primary transition-colors" />
                    </a>
                </Magnet>
            </div>
        </div>
    );
};

export default Contact;
