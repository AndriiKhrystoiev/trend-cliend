"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Eye } from "@/components/icons";
import { Clock } from "@/components/icons";

interface AnnotationCardProps {
  name: string;
  avatar?: string;
  initials: string;
  timestamp: string;
  message: string;
  className?: string;
  showConnector?: boolean;
  onViewAnnotation?: () => void;
}

function AnnotationCard({
  name,
  avatar,
  initials,
  timestamp,
  message,
  className,
  showConnector = false,
  onViewAnnotation,
}: AnnotationCardProps) {
  return (
    <div className={cn("flex gap-3", className)}>
      {/* Avatar with timeline connector */}
      <div className="relative flex flex-col items-center">
        <Avatar className="size-6 shrink-0 relative z-10">
          {avatar && <AvatarImage src={avatar} alt={name} />}
          <AvatarFallback className="bg-neutral-100 text-neutral-600 text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>
        {showConnector && (
          <div className="w-px flex-1 bg-primary-25" />
        )}
      </div>

      <div className={cn("flex-1 rounded-lg border border-neutral-50 bg-white p-4", showConnector && "mb-6")}>
        {/* Header: name + timestamp */}
        <div className="flex flex-col items-start sm:items-center justify-between mb-3 sm:mb-5 sm:flex-row gap-2">
          <span className="text-sm font-semibold text-neutral-900">
            {name}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-primary-25 px-2.5 py-1 text-xs font-medium text-primary-700">
            <Clock />
            {timestamp}
          </span>
        </div>

        {/* Message */}
        <div className="rounded-md border border-neutral-50 bg-neutral-25 p-3 mb-3 sm:mb-5">
          <p className="text-sm text-neutral-700 leading-relaxed">{message}</p>
        </div>

        {/* View annotation button */}
        <Button
          variant="outline"
          onClick={onViewAnnotation}
          className="gap-1.5 text-neutral-600 hover:bg-neutral-50 px-6"
        >
          <Eye className="size-4" />
          View annotation
        </Button>
      </div>
    </div>
  );
}

export { AnnotationCard };
export type { AnnotationCardProps };
