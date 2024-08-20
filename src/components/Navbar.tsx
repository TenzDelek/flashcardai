import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import logo from "../../public/logo.png";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className=" flex items-center px-7 py-4 border-b justify-between">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            width={50}
            height={50}
            placeholder="blur"
          />
        </Link>
        <p className=" font-bold">
          FLASHAI <br />
          <span className=" text-xs font-light">
            Generate your Flash with Ease
          </span>{" "}
        </p>
      </div>
      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  );
};

export default Navbar;
