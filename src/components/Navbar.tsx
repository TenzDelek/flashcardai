import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";

const Navbar = () => {
  return (
    <div className=" flex items-center px-7 py-4 border-b justify-between">
      <div>FlashCardAI</div>
      <div>
        <SignedIn>
            <UserButton/>
        </SignedIn>
        <SignedOut>
        <SignInButton />
        </SignedOut>
      </div>
    </div>
  );
};

export default Navbar;
