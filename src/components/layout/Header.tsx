import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Search, Home, Smile, Gift, Trophy, Grid3X3, Tv, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo-lumiere.png";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Главная", href: "/" },
  { icon: Smile, label: "Детям", href: "/kids" },
  { icon: Gift, label: "Бесплатно", href: "/free" },
  { icon: Trophy, label: "Спорт", href: "/sports" },
  { icon: Grid3X3, label: "Коллекции", href: "/collections" },
  { icon: Tv, label: "ТВ каналы", href: "/tv" },
];

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const isCatalogOpen = location.pathname === "/catalog";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const openCatalog = () => {
    navigate("/catalog");
  };

  const closeCatalog = () => {
    navigate(-1);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[72px]">
          {/* Left section */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Lumiere" className="h-8 w-auto" />
            </Link>
            
            <button 
              onClick={isCatalogOpen ? closeCatalog : openCatalog}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full transition-colors",
                isCatalogOpen 
                  ? "bg-muted text-foreground" 
                  : "text-foreground/80 hover:text-foreground hover:bg-muted/50"
              )}
            >
              {isCatalogOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              <span className="text-sm font-medium hidden sm:inline">Каталог</span>
            </button>
            
            <form onSubmit={handleSearch} className="relative hidden md:flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Поиск"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => navigate("/search")}
                className="pl-9 w-48 lg:w-64 bg-muted/50 border-border/50 focus:bg-muted"
              />
            </form>
          </div>

          {/* Center navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "nav-link",
                    isActive && "active"
                  )}
                >
                  <item.icon className="nav-link-icon" />
                  <span className="nav-link-label">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-3">
            <Button 
              variant="default"
              className="bg-gradient-primary hover:opacity-90 text-sm font-semibold px-4"
            >
              15 сом за 30 дней
            </Button>
            
            <Link to="/auth">
              <Button 
                variant="outline" 
                className="border-border/50 hover:bg-muted/50"
              >
                Войти
              </Button>
            </Link>
            
            <button 
              onClick={() => navigate("/search")}
              className="md:hidden p-2 text-foreground/80 hover:text-foreground"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <nav className="lg:hidden border-t border-border/30 overflow-x-auto scrollbar-hide">
        <div className="flex items-center px-4 py-2 gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "nav-link flex-shrink-0",
                  isActive && "active"
                )}
              >
                <item.icon className="nav-link-icon" />
                <span className="nav-link-label whitespace-nowrap">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
