"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MessageCircleIcon, TrophyIcon, UserIcon } from "lucide-react";
import { DarkModeToggle } from "./theme-toggle";

const Header = ({ isPro }: { isPro: boolean }) => {
  const { isSignedIn } = useUser();

  return (
    <header>
      <div className="layout-container">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl">
            KNOWVIA
          </Link>

          {isSignedIn && (
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard">
                <Button variant={"ghost"} size={"sm"}>
                  Dashboard
                </Button>
              </Link>
              <Link href="/communities">
                <Button variant={"ghost"} size={"sm"}>
                  <UserIcon className="size-4 text-primary" />
                  Communities
                </Button>
              </Link>
              <Link href="/chat">
                <Button variant={"ghost"} size={"sm"}>
                  <MessageCircleIcon className="size-4 text-primary" />
                  Chat
                </Button>
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-6">
          {isSignedIn ? (
            <>
              {isPro ? (
                <Badge variant={"outline"}>
                  <TrophyIcon className="size-6 text-primary" />
                  Pro
                </Badge>
              ) : (
                "Free"
              )}

              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "size-8",
                  },
                }}
              />
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/sign-in">
                <Button variant={"ghost"} size={"sm"}>
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size={"sm"}>Sign Up</Button>
              </Link>
            </div>
          )}
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
