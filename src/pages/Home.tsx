import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import profileImage from "@/assets/afito-profile.png";

const Home = () => {
  const [profile, setProfile] = useState(null);

  // Ambil data dari backend API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:3001/profiles");
        const data = await res.json();
        // Karena data kamu array (pakai [ {...} ]), ambil item pertama
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
          {/* Left Side - Profile Image */}
          <div className="flex justify-center md:justify-end order-1 md:order-1">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-primary rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 animate-glow-pulse"></div>
              <img
                src={profile.photo_url || profileImage}
                alt={profile.full_name}
                className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-primary/50 shadow-glow-lg"
              />
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div className="space-y-6 text-center md:text-left order-2 md:order-2 animate-fade-in">
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

            {/* Social Links */}
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
