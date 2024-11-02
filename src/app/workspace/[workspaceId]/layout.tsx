'use client'
import { Loader } from 'lucide-react'

import Thread from '@/features/messages/components/thread'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { usePanel } from '@/hooks/use-panel'

import Sidebar from './sidebar'
import Toolbar from './toolbar'
import WorkspaceSidebar from './workspace-sidebar'

import { Id } from '../../../../convex/_generated/dataModel'

interface WorkspaceLayoutProps {
  children: React.ReactNode
}

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  const { parentMessageId, onClose } = usePanel()

  const showPanel = !!parentMessageId

  return (
    <div className=' h-full'>
      <Toolbar />
      <div className='flex h-[calc(100vh-40px)]'>
        <Sidebar />
        <ResizablePanelGroup direction='horizontal' autoSaveId='ca-workspace-layout'>
          <ResizablePanel defaultSize={20} minSize={11} className='bg-[#5e2c5f]'>
            <WorkspaceSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20}>{children}</ResizablePanel>
          {showPanel && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel minSize={20} defaultSize={29}>
                {parentMessageId ? (
                  <Thread messageId={parentMessageId as Id<'messages'>} onClose={onClose} />
                ) : (
                  <div className='flex h-full items-center justify-center'>
                    <Loader className='size-5 animate-spin text-muted-foreground' />
                  </div>
                )}
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
