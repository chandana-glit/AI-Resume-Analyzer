import { Textarea } from "../components/ui/textarea";
import { Briefcase } from "lucide-react";

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function JobDescriptionInput({ value, onChange }: JobDescriptionInputProps) {
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-foreground mb-2">
        Paste Job Description
      </label>
      <div className="relative">
        <Textarea
          placeholder="Paste the complete job description here...

Include:
• Job title and company
• Required skills and qualifications
• Nice-to-have skills
• Responsibilities
• Experience requirements"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[140px] resize-none text-sm leading-relaxed pr-4 focus:ring-2 focus:ring-primary/20 rounded-xl"
        />
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <Briefcase className="w-3.5 h-3.5 text-muted-foreground/50" />
          <span className="text-xs text-muted-foreground">
            {wordCount} words
          </span>
        </div>
      </div>
    </div>
  );
}
