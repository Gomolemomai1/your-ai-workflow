import {
  LayoutDashboard,
  Mail,
  NotebookPen,
  ListChecks,
  Search,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  to: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  {
    to: "/",
    label: "Dashboard",
    description: "Your AI workspace at a glance",
    icon: LayoutDashboard,
  },
  {
    to: "/email",
    label: "Smart Email",
    description: "Draft professional emails in seconds",
    icon: Mail,
  },
  {
    to: "/notes",
    label: "Meeting Notes",
    description: "Turn raw notes into clear summaries",
    icon: NotebookPen,
  },
  {
    to: "/planner",
    label: "Task Planner",
    description: "Break goals into prioritised plans",
    icon: ListChecks,
  },
  {
    to: "/research",
    label: "Research",
    description: "Structured briefings on any topic",
    icon: Search,
  },
  {
    to: "/chat",
    label: "Assistant Chat",
    description: "Ask anything, keep the context",
    icon: MessageSquare,
  },
];