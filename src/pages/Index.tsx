
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FontControls } from "@/components/FontControls";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Index = () => {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("sans");

  useEffect(() => {
    const savedPreferences = localStorage.getItem("reader-preferences");
    if (savedPreferences) {
      const { fontSize: savedFontSize, fontFamily: savedFontFamily } = JSON.parse(savedPreferences);
      setFontSize(savedFontSize);
      setFontFamily(savedFontFamily);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "reader-preferences",
      JSON.stringify({ fontSize, fontFamily })
    );
  }, [fontSize, fontFamily]);

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "+" || e.key === "=") {
          e.preventDefault();
          setFontSize((prev) => Math.min(24, prev + 1));
        } else if (e.key === "-") {
          e.preventDefault();
          setFontSize((prev) => Math.max(12, prev - 1));
        }
      }
    };

    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success("Text copied to clipboard");
  };

  return (
    <div className={`min-h-screen bg-reader-light dark:bg-reader-dark sepia:bg-reader-sepia transition-colors duration-300`}>
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="reader-container">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-background/50 backdrop-blur-sm p-4 rounded-lg border shadow-sm">
            <Textarea
              placeholder="Paste or type your text here..."
              className="min-h-[200px] text-base resize-y bg-transparent border-none focus:ring-0"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {text && (
              <div className="mt-2 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="text-sm"
                >
                  Copy text
                </Button>
              </div>
            )}
          </div>

          {text && (
            <div
              className={`prose prose-lg max-w-none animate-fade-in
                         ${fontFamily === "sans" ? "font-sans" : ""}
                         ${fontFamily === "serif" ? "font-serif" : ""}
                         ${fontFamily === "mono" ? "font-mono" : ""}`}
              style={{ fontSize: `${fontSize}px` }}
            >
              {text.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {text && <FontControls
        fontSize={fontSize}
        setFontSize={setFontSize}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
      />}
    </div>
  );
};

export default Index;
