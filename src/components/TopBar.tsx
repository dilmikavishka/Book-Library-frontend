import { Button } from "./ui/button";
import { Menu } from "lucide-react";

interface TopBarProps {
  setSidebarOpen: (open: boolean) => void;
  userName?: string;
  profileImageUrl?: string;
}

export default function TopBar({
  setSidebarOpen,
  userName = "Admin",
  profileImageUrl = "https://i.pravatar.cc/40", // placeholder avatar
}: TopBarProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      {/* Left: menu button + title (mobile) */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-800 lg:hidden">
          Book‑Club Admin
        </h1>
      </div>

      {/* Right: greeting + profile */}
      <div className="flex items-center space-x-3">
        <span className="hidden sm:block text-sm text-gray-600">
          Welcome back, <span className="font-medium">{userName}</span>
        </span>
        <img
          src={profileImageUrl}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border border-gray-300"
        />
      </div>
    </header>
  );
}
