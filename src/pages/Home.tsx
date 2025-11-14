import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import profileImage from "@/assets/afito-profile.png";

const Home = () => {
  const [profile, setProfile] = useState(null);
  const { currentColor } = useTheme();
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:3001/profiles");
        const data = await res.json();
        setProfile(data[0]);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="container max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left Side Image */}
          <div className="flex justify-center md:justify-end order-1 md:order-1">
            <div className="relative w-80 h-96 md:w-96 md:h-[28rem] overflow-visible">

              {/* Efek api bergerak - Single Layer */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle at 50% 70%, hsl(var(--primary-glow) / 1), transparent)`,
                  filter: "blur(85px)",
                  zIndex: -1,
                  animation: "fireGlow 8s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite",
                  transformOrigin: "center 60%"
                }}
              ></div>

              <img
                src={profile.photo_url || profileImage}
                alt={profile.full_name}
                className="w-full h-full object-cover relative z-10 rounded-lg"
              />

              {/* Shadow bawah */}
              <div
                className="absolute bottom-0 left-0 w-full h-24 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0))",
                  transform: "translateY(100%) scaleY(0.8)",
                  filter: "blur(10px)",
                  opacity: 0.45
                }}
              ></div>
            </div>
          </div>

          {/* Right Side Text */}
          <div
            ref={textRef}
            onMouseMove={(e) => {
              const el = textRef.current;
              if (!el) return;
              const rect = el.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              el.style.setProperty("--mx", `${x}px`);
              el.style.setProperty("--my", `${y}px`);
            }}
            onMouseEnter={() => {
              const el = textRef.current;
              if (!el) return;
              el.style.setProperty("--cursor-opacity", "1");
            }}
            onMouseLeave={() => {
              const el = textRef.current;
              if (!el) return;
              el.style.setProperty("--cursor-opacity", "0");
            }}
            className="space-y-6 text-center md:text-left order-2 md:order-2 animate-fade-in cursor-area"
          >
            <h1 className="text-5xl md:text-6xl font-bold glow-text">
              {profile.full_name}
            </h1>

            <p className="text-2xl text-primary font-semibold">
              {profile.title}
            </p>

            <p className="text-lg text-muted-foreground max-w-xl">
              {profile.tagline}
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
              <Link to="/projects">
                <Button className="btn-glow" size="lg">
                  View Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link to="/contact">
                <Button variant="outline" size="lg" className="neon-border">
                  Contact Me
                </Button>
              </Link>
            </div>

            <div className="flex gap-4 justify-center md:justify-start pt-4">
              <a
                href="https://github.com/indraafito"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-primary/50 hover:border-primary hover:shadow-glow-md transition-all"
              >
                <Github className="h-5 w-5" />
              </a>

              <a
                href="https://linkedin.com/in/indraafito"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-primary/50 hover:border-primary hover:shadow-glow-md transition-all"
              >
                <Linkedin className="h-5 w-5" />
              </a>

              <a
                href="mailto:indraafito56@gmail.com"
                className="p-3 rounded-full border border-primary/50 hover:border-primary hover:shadow-glow-md transition-all"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
