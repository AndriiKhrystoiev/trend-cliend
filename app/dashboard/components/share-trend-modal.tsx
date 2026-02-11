"use client";

import { useState } from "react";
import { X, Link, Check, Trash2, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

interface SharedUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

const mockSharedUsers: SharedUser[] = [
  {
    id: "1",
    name: "Thomas Lean",
    email: "Thomas Lean@gmail.com",
    avatar: "/avatars/thomas.jpg",
  },
  {
    id: "2",
    name: "Ella Miron",
    email: "Thomas Lean@gmail.com",
    avatar: "/avatars/ella.jpg",
  },
];

interface ShareTrendModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareTrendModal({ open, onOpenChange }: ShareTrendModalProps) {
  const [emails, setEmails] = useState("");
  const [sharedUsers, setSharedUsers] = useState<SharedUser[]>(mockSharedUsers);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.info("Invitation link copied!", {
      position: "top-center",
      closeButton: true,
      style: {
        backgroundColor: "#f0fdf4",
        borderColor: "#bbf7d0",
        color: "#14532d",
      },
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInvite = () => {
    if (!emails.trim()) return;
    setEmails("");
  };

  const handleRemoveUser = (id: string) => {
    setSharedUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-116 p-6 gap-0"
      >
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between mb-5">
          <DialogTitle className="text-xl font-semibold text-neutral-900">
            Share this trend
          </DialogTitle>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 transition-colors border-b border-neutral-600 pb-0.5"
            >
              {copied ? (
                <Check className="size-4 text-emerald-700" />
              ) : (
                <Link className="size-3" />
              )}
              Copy link
            </button>
            <button
              onClick={() => onOpenChange(false)}
              className="text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>
        </DialogHeader>

        {/* Email input + Invite button */}
        <div className="flex gap-2 mb-5">
          <div className="relative flex-1">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-300" />
            <Input
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              placeholder="Emails, comma separated"
              className="pl-9 h-10 text-sm border-neutral-100"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleInvite();
              }}
            />
          </div>
          <Button
            onClick={handleInvite}
            className="h-10 px-6 text-sm font-medium"
          >
            Invite
          </Button>
        </div>

        {/* Who has access */}
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 mb-3">
            Who has access
          </h3>
          <div className="flex flex-col gap-2">
            {sharedUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-sm bg-neutral-25 px-3 py-2.5"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-neutral-400">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveUser(user.id)}
                  className="text-neutral-300 hover:text-neutral-500 transition-colors"
                >
                  <Trash2 className="size-4 text-neutral-600" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
