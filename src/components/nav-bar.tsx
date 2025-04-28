"use client";
import Link from "next/link";
import { useState } from "react";
import AccountDropdown from "./account-dropdown";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling
    }
  };

  return (
    <div className="border border-amber-700 min-h-14 w-full mb-10 flex flex-col md:py-5">
      {/* Announcement Section */}
      <div className="border border-amber-700 md:flex justify-end sm:flex hidden">
        <AccountDropdown />
      </div>

      {/* Navbar */}
      <div className="flex items-center justify-between border border-amber-700 p-4">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/path-to-your-logo.png"
            alt="Logo"
            className="h-8 w-auto mr-4"
          />
        </div>

        {/* Hamburger Icon (Mobile Only) */}
        <button
          className="md:hidden text-amber-700 focus:outline-none"
          onClick={toggleMenu} // Toggle menu state and handle scrolling
        >
          <Menu size={24} />
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4 md:text-lg">
          <Link href={"/"} className="no-underline text-black hover:text-black">
            /home
          </Link>
          <Link
            href={"/resource"}
            className="no-underline text-black hover:text-black"
          >
            /resources
          </Link>
          <Link
            href={"/community"}
            className="no-underline text-black hover:text-black"
          >
            /community
          </Link>
          <Link
            href={"/support"}
            className="no-underline text-black hover:text-black"
          >
            /support
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white dark:bg-red-400 z-50 flex flex-col items-center space-y-4 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="border border-amber-700 py-3 w-full flex justify-end px-5">
          <button
            className=""
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = "auto"; // Re-enable scrolling
            }}
          >
            <X />
          </button>
        </div>

        <div className="border border-amber-700 flex flex-col w-full px-7 items-center space-y-4 mb-auto ">
          <Link
            href={"/"}
            className="text-amber-700 hover:text-amber-900 text-lg"
          >
            /home
          </Link>
          <Link
            href={"/resource"}
            className="text-amber-700 hover:text-amber-900 text-lg"
          >
            /resources
          </Link>
          <Link
            href={"/community"}
            className="text-amber-700 hover:text-amber-900 text-lg"
          >
            /community
          </Link>
          <Link
            href={"/support"}
            className="text-amber-700 hover:text-amber-900 text-lg"
          >
            /support
          </Link>
        </div>

        <div className="border border-amber-700 w-full flex justify-end p-10 ">
          <AccountDropdown />
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } md:hidden`}
        onClick={() => {
          setIsMenuOpen(false);
          document.body.style.overflow = "auto"; // Re-enable scrolling
        }}
      ></div>
    </div>
  );
}
