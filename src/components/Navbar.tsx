import React from "react";
import PageWrapper from "./PageWrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import UserAccountNav from "./UserAccountNav";
import MobileNav from "./MobileNav";

type Props = {};

const Navbar = async (props: Props) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <PageWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            <span>docu-inquire</span>
          </Link>

          <MobileNav isAuth={!!user} />

          {/* Desktop Menu */}
          <div className="hidden items-center space-x-4 sm:flex">
            {!user ? (
              <>
                <LoginLink
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Sign in
                </LoginLink>
                <RegisterLink
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  Get Started
                </RegisterLink>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Dashboard
                </Link>
                <UserAccountNav
                  name={
                    !user.given_name || !user.family_name
                      ? "Your Account"
                      : `${user.given_name} ${user.family_name}`
                  }
                  email={user.email ?? ""}
                  imgUrl={user.picture ?? ""}
                />
              </>
            )}
          </div>
        </div>
      </PageWrapper>
    </nav>
  );
};

export default Navbar;
