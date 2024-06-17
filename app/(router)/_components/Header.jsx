"use client";
import React, { useEffect } from "react";
import { BellDot, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
function Header() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  return (
    <div className="p-4 bg-white flex justify-between">
      <div className=" flex p-2 border gap-2 rounded-md justify-between">
        <Search height={17} />
        <input
          type="text"
          placeholder="Search....."
          className="outline-none"
        ></input>
      </div>
      <div className="flex items-center gap-4">
        <BellDot className="text-gray-500" />
        {isLoaded && user ? (
          <UserButton afterSignOutUrl="/courses"/>
        ) : (
          <Link href={'/sign-in'}>
            <Button> Get Started</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
