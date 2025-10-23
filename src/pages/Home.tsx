import graduationImage from "@/images/me/graduation.jpg";

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground transition-colors duration-300 p-6 text-center">

            {/* // Circular profile picture. Make it bigger */}
            <img
                src={graduationImage}
                alt="Kevin Kim"
                className="w-64 h-64 rounded-full mb-6 object-cover"
            />
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
                Hi, I'm Kevin 👋
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                I'm an interactive designer and developer passionate about blending{" "}
                <span className="text-foreground font-medium">creativity</span>,{" "}
                <span className="text-foreground font-medium">technology</span>, and{" "}
                <span className="text-foreground font-medium">education</span>.
                Recently, I've been building XR games, AI-powered productivity tools, and immersive learning experiences for research purposes.
            </p>
        </div>
    );
};

export default Home;
