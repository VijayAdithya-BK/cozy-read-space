
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-reader-light dark:bg-reader-dark sepia:bg-reader-sepia transition-colors duration-300">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="container max-w-3xl mx-auto px-4 py-16">
        <div className="space-y-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Welcome to Cozy Read Space</h1>
          
          <p className="text-lg text-muted-foreground">
            A comfortable reading environment for your text content
          </p>

          <div className="space-y-6 text-left bg-background/50 backdrop-blur-sm p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold">How to use:</h2>
            
            <ol className="space-y-4 list-decimal list-inside text-base">
              <li>Paste or type your text in the input box</li>
              <li>Click "Start reading" to enter reading mode</li>
              <li>Customize your reading experience with the tools at the bottom:
                <ul className="pl-6 mt-2 space-y-2 list-disc list-inside">
                  <li>Adjust font size using the + and - buttons</li>
                  <li>Choose between Sans-serif, Serif, or Monospace fonts</li>
                  <li>Modify font weight for comfortable reading</li>
                  <li>Adjust line height and word spacing</li>
                </ul>
              </li>
              <li>Use the back button to return to the input page at any time</li>
            </ol>

            <div className="mt-8">
              <p className="text-sm text-muted-foreground mb-4">
                Tip: You can also use Ctrl/Cmd + and - to adjust font size while reading
              </p>
            </div>
          </div>

          <Button
            onClick={() => navigate("/reader")}
            size="lg"
            className="gap-2"
          >
            Start Reading
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
