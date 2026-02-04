"use client";

import { useState } from "react";
import { X, Menu } from "lucide-react";
import { Header } from "@/components/shared/navigation/header";
import { SidebarNav } from "@/components/shared/navigation/sidebar-nav";
import { ChartToolbar, MobileToolbar } from "@/app/dashboard/components/chart-toolbar";
import { DashboardLineChart } from "@/app/dashboard/components/line-chart";
import { ActivePensTable } from "@/app/dashboard/components/active-pens-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col bg-[#f8f9fc]">
      {/* Header */}
      <Header
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isMenuOpen={isSidebarOpen}
        showMenuButton
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <SidebarNav className="hidden lg:flex w-48 shrink-0" />

        {/* Tablet/Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            {/* Sidebar */}
            <div className="fixed left-0 top-[72px] z-50 h-[calc(100vh-72px)] w-64 lg:hidden">
              <SidebarNav className="h-full" />
            </div>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4">
            {/* Chart Widgets Card - Contains toolbar and chart */}
            <Card className="border-0 shadow-none bg-white rounded-lg p-4">
              {/* Mobile: Date & Toolbar Toggle */}
              <div className="flex items-center justify-between md:hidden mb-4">
                <div className="text-sm">
                  <div className="text-[#101828] font-semibold">09/14/2025 14:00</div>
                  <div className="text-[#6a7282]">09/14/2025 21:00</div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsToolbarOpen(true)}
                  className="size-10 border-[#ebedf6] bg-[#f8f9fc]"
                >
                  <Menu className="size-5 text-[#57637b]" />
                </Button>
              </div>

              {/* Desktop/Tablet: Toolbar Row */}
              <div className="hidden md:block mb-6">
                <ChartToolbar />
              </div>

              {/* Chart Area */}
              <DashboardLineChart />
            </Card>

            {/* Active Pens Table */}
            <div className="mt-4">
              <ActivePensTable />
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Toolbar Sheet */}
      {isToolbarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setIsToolbarOpen(false)}
          />
          {/* Toolbar Sheet */}
          <div className="fixed right-0 top-0 z-50 h-full w-[200px] bg-white shadow-xl md:hidden overflow-y-auto">
            <div className="flex items-center justify-end p-4 border-b border-[#ebedf6]">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsToolbarOpen(false)}
                className="size-8 text-[#57637b] hover:bg-[#f3f4f6]"
              >
                <X className="size-5" />
              </Button>
            </div>
            <MobileToolbar />
          </div>
        </>
      )}
    </div>
  );
}
