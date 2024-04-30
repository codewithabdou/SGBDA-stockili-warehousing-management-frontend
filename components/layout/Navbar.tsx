"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { RiMenuFoldLine } from "react-icons/ri";
import { ImCancelCircle } from "react-icons/im";
import ThemeToggle from "@components/shared/Theme/ThemeToggle";
import { Style_Script } from "next/font/google";

const signature = Style_Script({ subsets: ["latin"], weight: ["400"] });

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [showDiv, setShowDiv] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos > prevScrollPos) {
        if (showDiv) setShowDiv(false);
      } else {
        if (!showDiv) setShowDiv(true);
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
    document.body.style.overflow = open ? "auto" : "hidden";
  };

  const links = [
    { name: "Zones", href: "/zones" },
    { name: "Products", href: "/products" },
    { name: "Providers", href: "/providers" },
  ];

  return (
    <>
      {(showDiv || open) && (
        <nav
          className={`fixed  ${
            prevScrollPos > 10 || open ? "" : "bg-transparent"
          } z-50 w-full transition-all shadow-sm   duration-300  top-0`}
        >
          <div
            className={`px-4 py-10 h-20   hidden items-center justify-around lg:flex w-full`}
          >
            <Link className={`w-[15%] text-4xl flex items-center   `} href="/">
              <p className={signature.className}>Stockili.</p>
            </Link>
            <div className={`flex    items-center gap-10`}>
              <div className={`flex    items-center gap-10 `}>
                {links.map((link, index) => (
                  <Link key={index} href={link.href}>
                    <p
                      className={`primary-gradient font-medium after:bg-foreground `}
                    >
                      {link.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
            <ThemeToggle />
          </div>

          <div
            className={`  lg:hidden  relative flex w-full h-20  items-center justify-between px-6`}
          >
            <Link
              className={`w-1/2 text-4xl md:w-1/4 flex items-center   `}
              href="/"
            >
              <p className={signature.className}>Stockili.</p>
            </Link>
            <div className={`flex  items-center gap-8`}>
              <ThemeToggle />
              {open ? (
                <ImCancelCircle
                  onClick={toggleMenu}
                  size={25}
                  className="font-semibold cursor-pointer"
                />
              ) : (
                <RiMenuFoldLine
                  onClick={toggleMenu}
                  size={25}
                  className="font-semibold cursor-pointer"
                />
              )}
            </div>
            <div
              className={` absolute gap-6 py-12 transition-all duration-300 top-20  w-full min-h-screen h-10 bg-background left-0 ${
                open ? "flex  flex-col " : "translate-x-full"
              } `}
            >
              <div
                className={`flex  px-8   flex-col text-xl justify-around gap-4  font-semibold`}
              >
                {links.map((link, index) => (
                  <Link key={index} onClick={toggleMenu} href={link.href}>
                    <p className={`primary-gradient w-fit`}>{link.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
