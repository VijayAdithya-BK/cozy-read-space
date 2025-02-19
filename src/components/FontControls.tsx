
import { Button } from "@/components/ui/button";
import { 
  MinusIcon, 
  PlusIcon, 
  Type as TypeIcon
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
}

export const FontControls = ({
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
}: FontControlsProps) => {
  const handleFontSizeChange = (increment: boolean) => {
    setFontSize(Math.max(12, Math.min(24, fontSize + (increment ? 1 : -1))));
  };

  return (
    <div className="font-controls animate-fade-in">
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
    </div>
  );
};
