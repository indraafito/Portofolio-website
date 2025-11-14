import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  User,
  Award,
  Briefcase,
  Mail,
  Shield,
  LogOut,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { onAuthChange, clearAuthToken } from "@/lib/auth";
import { toast } from "sonner";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "About", path: "/about", icon: User },
  { name: "Skills", path: "/skills", icon: Award },
  { name: "Projects", path: "/projects", icon: Briefcase },
  { name: "Contact", path: "/contact", icon: Mail },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthChange((token) => {
      setIsAdmin(!!token);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    clearAuthToken();
    toast.success("Logged out successfully");
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-card border-b shadow-lg backdrop-blur-xl"
          : "glass-card border-b backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to={isAdmin ? "/admin" : "/"}
            className="group relative text-2xl font-bold glow-text transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center gap-2">
              <span className="relative">
                {isAdmin ? "Dashboard" : "Moriartyy."}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full" />
              </span>
              {!isAdmin && (
                <Sparkles className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path} className="group">
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`relative overflow-hidden transition-all duration-300 ${
                      isActive ? "btn-glow" : "hover:scale-105"
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Icon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                      {item.name}
                    </span>
                    {!isActive && (
                      <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    )}
                  </Button>
                </Link>
              );
            })}

            {isAdmin && (
              <Link to="/admin" className="group">
                <Button
                  variant={location.pathname === "/admin" ? "default" : "ghost"}
                  className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                    location.pathname === "/admin" ? "btn-glow neon-border" : ""
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Shield className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    Admin
                  </span>
                </Button>
              </Link>
            )}
          </div>

          {/* Theme Switcher + Logout (desktop kanan atas) */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeSwitcher />
            {isAdmin && (
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="relative overflow-hidden group hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="relative group hover:scale-110 transition-all duration-300"
            >
              <span className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {isOpen ? (
                <X className="relative z-10 transition-transform duration-300 rotate-0 group-hover:rotate-90" />
              ) : (
                <Menu className="relative z-10 transition-transform duration-300" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <div
                  key={item.path}
                  style={{
                    animation: `slideInFromLeft 0.3s ease-out ${
                      index * 50
                    }ms both`,
                  }}
                >
                  <Link to={item.path} onClick={() => setIsOpen(false)}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start relative overflow-hidden group transition-all duration-300 ${
                        isActive ? "btn-glow" : "hover:translate-x-2"
                      }`}
                    >
                      <span className="relative z-10 flex items-center gap-1.5">
                        <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                        {item.name}
                      </span>
                      {!isActive && (
                        <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary to-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                      )}
                    </Button>
                  </Link>
                </div>
              );
            })}

            {isAdmin && (
              <>
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  style={{
                    animation: `slideIn 0.3s ease-out ${
                      navItems.length * 50
                    }ms both`,
                  }}
                >
                  <Button
                    variant={
                      location.pathname === "/admin" ? "default" : "outline"
                    }
                    className="w-full justify-start neon-border relative overflow-hidden group hover:translate-x-2 transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Shield className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                      Admin
                    </span>
                  </Button>
                </Link>

                <div
                  style={{
                    animation: `slideIn 0.3s ease-out ${
                      (navItems.length + 1) * 50
                    }ms both`,
                  }}
                >
                  <Button
                    variant="destructive"
                    className="w-full justify-start relative overflow-hidden group hover:translate-x-2 transition-all duration-300"
                    onClick={handleLogout}
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                      Logout
                    </span>
                    <span className="absolute left-0 top-0 h-full w-1 bg-red-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
