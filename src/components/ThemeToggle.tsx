
import { Button } from "@/components/ui/button";
import { Moon, Sun, Book } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "sepia";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme;
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = {
      light: "dark",
      dark: "sepia",
      sepia: "light",
    }[theme] as Theme;

    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.body.className = nextTheme;
  };

  const icons = {
    light: <Sun className="h-5 w-5" />,
    dark: <Moon className="h-5 w-5" />,
    sepia: <Book className="h-5 w-5" />,
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full transition-transform hover:scale-110"
    >
      {icons[theme]}
    </Button>
  );
};
