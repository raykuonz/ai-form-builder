import { SidebarNavItem } from "@/types/nav-types"

export const DASHBOARD_NAVIGATION_CONFIG: {
  sidebarNav: SidebarNavItem[];
} = {
  sidebarNav: [
    {
      title: "My Forms",
      href: "/view-forms",
      icon: "library",
    },
    {
      title: "Results",
      href: "/results",
      icon: "list",
    },
    {
      title: "Settings",
      href: "/settings",
      icon: "settings",
    },
  ]
}

export const MAX_FREE_FORMS = 3;