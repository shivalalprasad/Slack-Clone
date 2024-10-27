'use client';

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";

const Page = ()=>{
  const tasks = useQuery(api.tasks.get);
  return(
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    {tasks?.map(({ _id, text }) => <Button key={_id} size="lg">{text}</Button>)}
  </main>
  )
}

export default Page;
