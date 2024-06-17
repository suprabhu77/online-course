"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Layout,
  Shield,
  Mail,
  BookOpen,
  BadgeIcon,
  GraduationCap,
  LayoutGrid,
  LayoutDashboard,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
function SideNavBar() {
  const { user, isLoaded } = useUser();
  const menuList = [
    {
      id: 8,
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      auth: user,
    },
    {
      id: 1,
      name: "All Courses",
      icon: BookOpen,
      path: "/courses",
      auth: true,
    },
    {
      id: 3,
      name: "Membership",
      icon: Shield,
      path: "/membership",
      auth: true,
    },
    {
      id: 4,
      name: "Store",
      icon: LayoutGrid,
      path: "/store",
      auth: true,
    },
    {
      id: 5,
      name: "Upgrade",
      icon: GraduationCap,
      path: "/browse",
      auth: true,
    },
  ];
  const path = usePathname();
  useEffect(() => {
    console.log("path", path);
  }, []);
  return (
    <div className="bg-white p-5 shadow-sm border h-screen">
      <Image src="/image.png" alt="logo" width={170} height={80}></Image>
      <hr className="mt-5" />
      <div className="">
        {menuList.map((item, index) => item.auth && (
          <Link href={item.path}>
            <div
              className={`group flex 
              gap-3 
              mt-1
              text-[20px]
              items-center 
              p-3 px-6
              text-gray-500 
              cursor-pointer
              hover:bg-primary
              rounded-md
              transition-all ease-in-out duration-200
            `}
            >
              <item.icon className="group-hover:animate-bounce" />
              <h2>{item.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideNavBar;
