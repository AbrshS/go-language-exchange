import {
  LayoutDashboard,
  Settings,
  History,
  type LucideIcon,
  User
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

// ---------------------------------------------------------------------------
// Sidebar navigation — add your domain pages here as you build them.
// Example: { label: "Projects", href: "/dashboard/projects", icon: FolderKanban }
// ---------------------------------------------------------------------------
export const sidebarNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Sessions", href: "/dashboard/sessions", icon: History },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
  // { label: "Profile", href: "/dashboard/profile", icon: User },
];

