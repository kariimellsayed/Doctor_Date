"use client";

import { useState } from "react";
import Image from "next/image";
import { NavLinks } from "../_Constants/Constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import {
  LoginLink,
  LogoutLink,
  useKindeAuth,
} from "@kinde-oss/kinde-auth-nextjs";
import { FiMenu, FiX } from "react-icons/fi"; // أيقونات القائمة
import { RiLogoutBoxRLine } from "react-icons/ri";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const pathLink = usePathname();
  const { user, isAuthenticated, isLoading } = useKindeAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full z-10 bg-white shadow-md relative">
      <div className="padding-x flex justify-between items-center py-4">
        {/* Logo */}
        <div className="flex items-center gap-10">
          <Link href={"/"} className="flex items-center gap-2">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={35}
              height={35}
              className="sm:w-10 w-7 h-auto"
            />
            <span className="text-primary text-xs sm:text-lg font-semibold">
              Doctor Date
            </span>
          </Link>
          {/* Navigation - Desktop */}
          <ul className="hidden md:flex items-center gap-8">
            {NavLinks.map((link) => (
              <li key={link.id}>
                <Link
                  className={`text-neutral-800 font-semibold transition hover:text-primary text-sm ${
                    link.href === pathLink &&
                    "text-primary font-bold border-b-2 border-primary"
                  }`}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* User Info or Login/Signup */}
        <div className="flex items-center">
          {isLoading || isLoggingOut ? (
            <p className="text-neutral-500 text-sm">Loading...</p>
          ) : isAuthenticated ? (
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="bg-blue-100 px-4 py-1 rounded-lg flex-center gap-2">
                    <div className="rounded-full overflow-hidden">
                      <Image
                        src={user?.picture || "/default-avatar.jpg"}
                        alt="User Avatar"
                        width={35}
                        height={35}
                        className="object-cover sm:w-10 h-auto w-7"
                      />
                    </div>
                    <p className="text-sm font-semibold text-neutral-800 sm:block hidden">
                      {user?.given_name || "User Name"}
                    </p>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    {user?.given_name || "User Name"}
                    <span className="ml-1">{user?.family_name}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link
                      href={"/my-booking"}
                      className={`text-black font-bold ${pathLink == "/my-booking" && "text-primary"}`}
                    >
                      My Booking
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <LogoutLink>
                <Button
                  variant="outline"
                  className="rounded-full border-black text-black sm:w-8 w-6 h-auto duration-200 hover:text-white hover:bg-black"
                  onClick={() => setIsLoggingOut(true)}
                >
                  <RiLogoutBoxRLine size={50} />
                </Button>
              </LogoutLink>
            </div>
          ) : (
            <LoginLink>
              <Button className="rounded-md">Get Started</Button>
            </LoginLink>
          )}
        </div>

        {/* Menu Button - Mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-primary text-2xl"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Sidebar - Mobile */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <button
          className="absolute top-4 right-4 text-primary text-2xl"
          onClick={() => setIsMenuOpen(false)}
        >
          <FiX />
        </button>
        <ul className="flex flex-col items-center justify-center h-full gap-6">
          {NavLinks.map((link) => (
            <li key={link.id}>
              <Link
                className={`text-neutral-800 font-semibold text-lg ${
                  link.href === pathLink &&
                  "text-primary font-bold border-b-2 border-primary"
                }`}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
