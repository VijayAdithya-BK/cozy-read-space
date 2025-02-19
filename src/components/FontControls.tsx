import { Button } from "@/components/ui/button";
import { 
  MinusIcon, 
  PlusIcon, 
  Type as TypeIcon,
  StretchHorizontal,
  MoveVertical,
  GripHorizontal
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";

interface FontControlsProps {
  fontSize: number;
  setFontSize: (size: number) => void;
  fontFamily: string;
  setFontFamily: (font: string) => void;
  fontWidth: number;
  setFontWidth: (width: number) => void;
  lineSpacing: number;
  setLineSpacing: (spacing: number) => void;
  wordSpacing: number;
  setWordSpacing: (spacing: number) => void;
}

export const FontControls = ({
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
  fontWidth,
  setFontWidth,
  lineSpacing,
  setLineSpacing,
  wordSpacing,
  setWordSpacing,
}: FontControlsProps) => {
  const handleFontSizeChange = (increment: boolean) => {
    setFontSize(Math.max(12, fontSize + (increment ? 1 : -1)));
  };

  return (
    <div className="font-controls transition-all duration-200 hover:bg-background group-hover:backdrop-blur-xl opacity-60 hover:opacity-100">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleFontSizeChange(false)}
        className="rounded-full"
      >
        <MinusIcon className="h-4 w-4" />
      </Button>
      
      <span className="text-sm font-medium">{fontSize}px</span>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleFontSizeChange(true)}
        className="rounded-full"
      >
        <PlusIcon className="h-4 w-4" />
      </Button>

      <div className="h-6 w-px bg-border mx-2" />

      <Select value={fontFamily} onValueChange={setFontFamily}>
        <SelectTrigger className="w-[140px]">
          <TypeIcon className="h-4 w-4 mr-2" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sans">Sans-serif</SelectItem>
          <SelectItem value="serif">Serif</SelectItem>
          <SelectItem value="mono">Monospace</SelectItem>
        </SelectContent>
      </Select>

      <div className="h-6 w-px bg-border mx-2" />

      <div className="flex items-center gap-2">
        <StretchHorizontal className="h-4 w-4" />
        <input
          type="range"
          min="300"
          max="900"
          step="100"
          value={fontWidth}
          onChange={(e) => setFontWidth(Number(e.target.value))}
          className="w-20"
        />
      </div>

      <div className="h-6 w-px bg-border mx-2" />

      <div className="flex items-center gap-2">
        <MoveVertical className="h-4 w-4" />
        <input
          type="range"
          min="1"
          max="2"
          step="0.1"
          value={lineSpacing}
          onChange={(e) => setLineSpacing(Number(e.target.value))}
          className="w-20"
        />
      </div>

      <div className="h-6 w-px bg-border mx-2" />

      <div className="flex items-center gap-2">
        <GripHorizontal className="h-4 w-4" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={wordSpacing}
          onChange={(e) => setWordSpacing(Number(e.target.value))}
          className="w-20"
        />
      </div>
    </div>
  );
};
