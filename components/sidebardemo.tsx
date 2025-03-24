"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DashboardComponent } from "./Dashboard";
import { PlusIcon, SearchIcon } from "lucide-react";

export function SidebarDemo() {
  const [selectedPage, setSelectedPage] = useState("dashboard");

  const links = [
    { label: "Explore", icon: <SearchIcon className="h-5 w-5" />, page: "explore", href: "#" },
    { label: "Profile", icon: <IconUserBolt className="h-5 w-5" />, page: "profile", href: "#" },
    { label: "Settings", icon: <IconSettings className="h-5 w-5" />, page: "settings", href: "#" },
    { label: "Become a creator", icon: <PlusIcon className="h-5 w-5" />, page: "creator", href: "#" },
  ];

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen"
      )}
    >
      <Sidebar>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <Logo />
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <button key={idx} onClick={() => setSelectedPage(link.page)}>
                  <SidebarLink link={link} />
                </button>
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 h-full overflow-y-auto p-4">
        <DashboardComponent selectedPage={selectedPage} />
      </div>
    </div>
  );
}

export const Logo = () => (
  <Link href="#" className="relative z-20 flex items-center space-x-2 py-1 text-2xl font-normal text-white">
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-bold">
      Super
    </motion.span>
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-bold text-[#FF4D4D]">
      DM
    </motion.span>
  </Link>
);
