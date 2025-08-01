"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/services/auth";
import { protectedRoutes } from "./protectedRoutes";

type UserRole = keyof typeof data;

const data = {
  student: [
    {
      title: "Assignments",
      url: "/student",
    },
    {
      title: "Submissions",
      url: "/student/submissions",
    },
  ],
  instructor: [
    {
      title: "Dashboard",
      url: "/instructor",
    },
    {
      title: "Assignments",
      url: "/instructor/assignments",
    },
    {
      title: "Submissions",
      url: "/instructor/submissions",
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: {
    role: UserRole;
  };
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const menuItems = data[user.role] ?? [];

  return (
    <Sidebar {...props}>
      <div className="flex flex-col h-full justify-between">
        {/* Top Section (Menu) */}
        <SidebarContent className="p-4">
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={pathname === item.url}>
                  <Link href={item.url}>{item.title}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        {/* Bottom Section (Logout) */}
        <div className="p-4 border-t">
          <Button
            className="w-full"
            onClick={async () => {
              await logoutUser();
              if (protectedRoutes.some((route) => pathname.match(route))) {
                router.push("/");
              }
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <SidebarRail />
    </Sidebar>
  );
}
