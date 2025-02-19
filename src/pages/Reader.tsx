
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FontControls } from "@/components/FontControls";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Reader = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [isReading, setIsReading] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("sans");
  const [fontWidth, setFontWidth] = useState(400);
  const [lineSpacing, setLineSpacing] = useState(1.5);
  const [wordSpacing, setWordSpacing] = useState(0);

  useEffect(() => {
    const savedPreferences = localStorage.getItem("reader-preferences");
    if (savedPreferences) {
      const { 
        fontSize: savedFontSize, 
        fontFamily: savedFontFamily,
        fontWidth: savedFontWidth,
        lineSpacing: savedLineSpacing,
        wordSpacing: savedWordSpacing
      } = JSON.parse(savedPreferences);
      
      setFontSize(savedFontSize);
      setFontFamily(savedFontFamily);
      setFontWidth(savedFontWidth);
      setLineSpacing(savedLineSpacing);
      setWordSpacing(savedWordSpacing);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "reader-preferences",
      JSON.stringify({ 
        fontSize, 
        fontFamily,
        fontWidth,
        lineSpacing,
        wordSpacing
      })
    );
  }, [fontSize, fontFamily, fontWidth, lineSpacing, wordSpacing]);

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "+" || e.key === "=") {
          e.preventDefault();
          setFontSize((prev) => prev + 1);
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

  const handleSubmit = () => {
    if (text.trim()) {
      setIsReading(true);
    }
  };

  return (
    <div className={`min-h-screen bg-reader-light dark:bg-reader-dark sepia:bg-reader-sepia transition-colors duration-300`}>
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {isReading ? (
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setIsReading(false)}
          className="fixed top-4 left-4 z-50 rounded-full shadow-lg bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          variant="secondary"
          size="icon"
          onClick={() => navigate("/")}
          className="fixed top-4 left-4 z-50 rounded-full shadow-lg bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      )}

      <div className="reader-container">
        {!isReading ? (
          <div className="max-w-3xl mx-auto min-h-screen flex items-center">
            <div className="w-full bg-background/50 backdrop-blur-sm p-4 rounded-lg border shadow-sm">
              <Textarea
                placeholder="Paste or type your text here..."
                className="min-h-[200px] text-base resize-y bg-transparent border-none focus:ring-0"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <div className="mt-2 flex justify-end gap-2">
                {text && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="text-sm"
                  >
                    Copy text
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={handleSubmit}
                  className="text-sm"
                  disabled={!text.trim()}
                >
                  Start reading
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`prose max-w-none animate-fade-in mx-auto px-4
                       ${fontFamily === "sans" ? "font-sans" : ""}
                       ${fontFamily === "serif" ? "font-serif" : ""}
                       ${fontFamily === "mono" ? "font-mono" : ""}`}
            style={{ 
              fontSize: `${fontSize}px`,
              fontWeight: fontWidth,
              lineHeight: lineSpacing,
              wordSpacing: `${wordSpacing}em`,
            }}
          >
            {text.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>

      {isReading && text && (
        <FontControls
          fontSize={fontSize}
          setFontSize={setFontSize}
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
          fontWidth={fontWidth}
          setFontWidth={setFontWidth}
          lineSpacing={lineSpacing}
          setLineSpacing={setLineSpacing}
          wordSpacing={wordSpacing}
          setWordSpacing={setWordSpacing}
        />
      )}
    </div>
  );
};

export default Reader;
