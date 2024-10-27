"use client";

import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";

export default function Home() {
  const { signOut } = useAuthActions();
  return (
    <div className="h-full flex items-center justify-center bg-blue-800 text-white">
      <p>
      Logged in!
      </p>
      <Button size='lg' variant='destructive' className="m-4" onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
}
