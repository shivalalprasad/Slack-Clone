"use client";

import { useCreateWorkspaceModalAtom } from "@/features/workspaces/store/use-create-workspace-modal";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";

import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Loader } from "lucide-react";



export default function Home() {
  const router = useRouter()
  const [open, setOpen] = useCreateWorkspaceModalAtom()
  const { data, isLoading } = useGetWorkspaces()
  const workspaceId = useMemo(() => data?.[0]?._id, [data])

  useEffect(() => {
    if (isLoading) return;
    if (workspaceId) {
      console.log("redirect to workspace: "+workspaceId)
      router.replace(`/workspace/${workspaceId}`)
    } else if(!open) {
      console.log("open create workspace modal")
      setOpen(true)
    }
  },[isLoading, workspaceId,
     open, setOpen,
      router
    ]
)

  return (
    <div className="h-full flex items-center justify-center text-white">
      <Loader
      className='size-4 animate-spin text-muted-foreground' />
    </div>
  );
}
