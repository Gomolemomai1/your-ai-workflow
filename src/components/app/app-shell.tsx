import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Sparkles, X } from "lucide-react";
import { useState, type ReactNode } from "react";

import { navItems } from "./nav-items";
import { ResponsibleAiNotice } from "./responsible-ai-notice";
import { cn } from "@/lib/utils";

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex h-full flex-col gap-6 p-5">
      <Link to="/" onClick={onNavigate} className="flex items-center gap-3">
        <span
          className="flex size-10 items-center justify-center rounded-xl"
          style={{ backgroundImage: "var(--gradient-primary)" }}
        >
          <Sparkles className="size-5 text-primary-foreground" />
        </span>
        <span className="leading-tight">
          <span className="block font-display text-sm font-semibold">Workplace AI</span>
          <span className="block text-xs text-muted-foreground">Productivity Assistant</span>
        </span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                "group flex items-start gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
              )}
            >
              <item.icon
                className={cn("mt-0.5 size-4 shrink-0", active && "text-primary")}
                aria-hidden
              />
              <span>
                <span className="block font-medium">{item.label}</span>
                <span className="block text-xs text-muted-foreground">{item.description}</span>
              </span>
            </Link>
          );
        })}
      </nav>

      <ResponsibleAiNotice compact />
    </div>
  );
}

export function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[17rem_1fr]">
      <aside className="hidden border-r border-sidebar-border bg-sidebar lg:block">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <SidebarContent />
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close navigation"
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 border-r border-sidebar-border bg-sidebar">
            <button
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-4 rounded-md p-1.5 text-muted-foreground hover:bg-sidebar-accent"
            >
              <X className="size-4" />
            </button>
            <SidebarContent onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/80 px-4 py-4 backdrop-blur md:px-8">
          <button
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
            className="rounded-md border border-border p-2 text-muted-foreground hover:text-foreground lg:hidden"
          >
            <Menu className="size-4" />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold md:text-2xl">{title}</h1>
            <p className="truncate text-xs text-muted-foreground md:text-sm">{subtitle}</p>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}