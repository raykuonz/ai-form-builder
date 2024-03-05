import { SessionProvider } from "next-auth/react";

import { DASHBOARD_NAVIGATION_CONFIG } from "@/lib/constants";
import DashboardNav from "@/components/navigation/dashboard-nav";
import Header from "@/components/header";
import UpgradeAccountButton from "@/components/navigation/upgrade-account-button";
import FormGeneratorWrapper from "@/components/form-generator/form-generator-wrapper";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({
  children,
}: AdminLayoutProps) => {

  return (
    <div
      className="flex min-h-screen flex-col space-y-6"
    >
      <Header />
      <div
        className="container grid gap-12 md:grid-cols-[200px_1fr] flex-1"
      >
        <aside
          className="hidden w-[200px] flex-col md:flex pr-2 border-r justify-between"
        >
          <DashboardNav
            items={DASHBOARD_NAVIGATION_CONFIG.sidebarNav}
          />
          <UpgradeAccountButton />
        </aside>
        <main
          className="flex w-full flex-1 flex-col overflow-hidden"
        >
          <header
            className="flex items-center"
          >
            <h1
              className="text-4xl m-5 p-4 font-semibold"
            >
              Dashboard
            </h1>
            <SessionProvider>
              <FormGeneratorWrapper />
            </SessionProvider>
          </header>
          <hr
            className="my-1"
          />
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout