"use client";
import * as React from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectComboboxProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  maxVisible?: number;
  label?: string;
}

export const MultiSelectCombobox: React.FC<MultiSelectComboboxProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  maxVisible = 6,
  label,
}) => {
  const [open, setOpen] = React.useState(false);

  // Hiển thị tối đa maxVisible option, còn lại trong dropdown search
  const visibleOptions = options.slice(0, maxVisible);
  const dropdownOptions = options.slice(maxVisible);

  const handleCheck = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  return (
    <div>
      {label && <div className="mb-1 font-medium">{label}</div>}
      <div className="flex flex-wrap gap-2">
        {visibleOptions.map((opt) => (
          <label key={opt.value} className="flex items-center gap-1">
            <Checkbox
              checked={value.includes(opt.value)}
              onCheckedChange={() => handleCheck(opt.value)}
              id={opt.value}
            />
            <span>{opt.label}</span>
          </label>
        ))}
        {dropdownOptions.length > 0 && (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-8 px-2 py-1 text-xs flex items-center gap-1"
                type="button"
              >
                <ChevronDown size={16} />
                More
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0">
              <Command>
                <CommandInput placeholder={placeholder} />
                <CommandList>
                  {dropdownOptions.map((opt) => (
                    <CommandItem
                      key={opt.value}
                      onSelect={() => handleCheck(opt.value)}
                      className="flex items-center gap-2"
                    >
                      <Checkbox
                        checked={value.includes(opt.value)}
                        onCheckedChange={() => handleCheck(opt.value)}
                        id={opt.value}
                        className="mr-2"
                      />
                      <span>{opt.label}</span>
                      {value.includes(opt.value) && (
                        <Check size={16} className="ml-auto text-[#00416A]" />
                      )}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};
