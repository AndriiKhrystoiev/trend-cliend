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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);
  const [selectedPenIds, setSelectedPenIds] = useState<Set<string>>(new Set());

  return (
    <div className="flex h-screen flex-col bg-neutral-25">
      {/* Header */}
      <Header
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isMenuOpen={isSidebarOpen}
        showMenuButton
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar - always visible */}
        <SidebarNav className="hidden lg:flex w-48 shrink-0" />

        {/* Tablet Sidebar - collapsible with arrow toggle */}
        <SidebarNav
          className="hidden md:flex lg:hidden shrink-0"
          collapsible
          collapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-100 bg-black/50 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            {/* Sidebar */}
            <div className="fixed left-0 top-[72px] z-50 h-[calc(100vh-72px)] w-64 md:hidden">
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
                  <div className="text-neutral-900 font-semibold">09/14/2025 14:00</div>
                  <div className="text-neutral-400">09/14/2025 21:00</div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsToolbarOpen(true)}
                  className="size-10 border-neutral-50 bg-neutral-25"
                >
                  <Menu className="size-5 text-neutral-600" />
                </Button>
              </div>

              {/* Desktop/Tablet: Toolbar Row */}
              <div className="hidden md:block mb-6">
                <ChartToolbar />
              </div>

              {/* Chart Area */}
              <DashboardLineChart selectedPenIds={selectedPenIds} />

              {/* Active Pens Table - Inside the same card */}
              <div className="mt-6">
                <ActivePensTable
                  selectedRows={selectedPenIds}
                  onSelectedRowsChange={setSelectedPenIds}
                />
              </div>
            </Card>
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
          <div className="fixed right-0 top-0 z-100 h-full w-[120px] bg-primary-25 shadow-xl md:hidden overflow-y-auto">
            <div className="flex items-center justify-end p-4 border-b border-neutral-50">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsToolbarOpen(false)}
                className="size-8 text-neutral-600 hover:bg-neutral-50"
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
