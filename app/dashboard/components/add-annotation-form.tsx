"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface AddAnnotationFormProps {
  xPercent: number;
  yPercent: number;
  onSend: (message: string) => void;
  onClose: () => void;
}

export function AddAnnotationForm({ xPercent, yPercent, onSend, onClose }: AddAnnotationFormProps) {
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message.trim());
  };

  return (
    <div
      ref={formRef}
      data-annotation
      className="absolute z-30 -translate-x-1/2"
      style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
    >
      <div className="bg-neutral-50 rounded-lg p-4 w-72 rounded-tl-none">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Placeholder"
          className="w-full h-24 px-3 py-2.5 bg-white border border-neutral-100 rounded-sm text-sm text-neutral-900 placeholder:text-neutral-400 resize-none outline-none focus:border-primary-400 focus:ring-[3px] focus:ring-primary-100"
        />
        <div className="flex gap-2 mt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 h-9 text-sm font-medium text-neutral-700"
          >
            Close
          </Button>
          <Button
            onClick={handleSend}
            variant="secondary"
            className="flex-1 h-9 text-sm font-medium text-white"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
