"use client";

import { cn } from "@util";
import { useEffect, useRef, useState } from "react";

interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  disabled?: boolean;
  label: string;
}

export const CustomDropdown = ({
  value,
  onChange,
  options,
  disabled = false,
  label,
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="flex items-center gap-2 text-base text-slate-300">
        <span className="font-medium">{label}</span>
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className="min-w-40 rounded-lg border-2 border-slate-700 bg-transparent px-4 py-2.5 text-base text-slate-100 text-left focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between"
        >
          <span>{selectedOption?.label}</span>
          <svg
            className={cn(
              "w-4 h-4 transition-transform",
              isOpen && "rotate-180",
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <title>Dropdown arrow</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </label>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border-2 border-slate-700 bg-slate-950 shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                "w-full px-4 py-2.5 text-left text-base hover:bg-slate-800 first:rounded-t-md last:rounded-b-md",
                option.value === value
                  ? "bg-blue-500/20 text-blue-300"
                  : "text-slate-100",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
