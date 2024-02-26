"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { ArrowRight, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  isAuth: boolean;
};

const MobileNav = ({ isAuth }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      setOpen((prev) => !prev);
    }
  }, [pathname]);

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setOpen((prev) => !prev);
    }
  };

  return (
    <div className="sm:hidden">
      <Menu
        className="relative z-50 h-5 w-5 text-zinc-700"
        onClick={() => setOpen((prev) => !prev)}
      />

      {!open ? (
        <div className="fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-0 w-full">
          <ul className="absolute bg-white border-b border-zinc-200 shadow-xl grid w-full gap-3 px-10 pt-20 pb-8">
            {!isAuth ? (
              <>
                <li>
                  <Link
                    onClick={() => closeOnCurrent("/sign-up")}
                    className="flex items-center w-full font-semibold text-green-600"
                    href="/sign-up"
                  >
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </li>
                <li className="my-3 h-px w-full bg-gray-300" />
                <li>
                  <Link
                    onClick={() => closeOnCurrent("/sign-in")}
                    className="flex items-center w-full font-semibold"
                    href="/sign-in"
                  >
                    Sign in
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    onClick={() => closeOnCurrent("/dashboard")}
                    className="flex items-center w-full font-semibold"
                    href="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="my-3 h-px w-full bg-gray-300" />
                <li>
                  <LogoutLink className="flex items-center w-full font-semibold">
                    Sign Out
                  </LogoutLink>
                </li>
              </>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default MobileNav;
