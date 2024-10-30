/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { AlertTriangle, HashIcon, Loader, MessageSquareText, SendHorizonal } from 'lucide-react'

import { useCurrentMember } from '@/features/members/api/use-current-member'
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace'

import { useGetMember } from '@/features/members/api/use-get-members'
import { useGetChannels } from '@/features/channels/api/use-get-channels'
import { useCreateChannelModal } from '@/features/channels/store/use-create-channel-modal'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { useChannelId } from '@/hooks/use-channel-id'

import WorkspaceHeader from './workspace-header'
import SidebarItem from './sidebar-item'
import WorkspaceSection from './workspace-section'
import UserItem from './user-item'

export default function WorkspaceSidebar() {
  const workspaceId = useWorkspaceId()
  const channelId = useChannelId()
  const [open, setOpen] = useCreateChannelModal()

  const { data: member, isLoading: memberLoading } = useCurrentMember({ workspaceId })
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId })
  const { data: channels, isLoading: channelsLoading } = useGetChannels({ workspaceId })
  const { data: members, isLoading: membersLoading } = useGetMember({ workspaceId })

  if (memberLoading || workspaceLoading) {
    return (
      <div className='flex flex-col bg-[#5e2c5f] h-full items-center justify-center'>
        <Loader className='size-5 animate-spin text-white' />
      </div>
    )
  }

  if (!member || !workspace) {
    return (
      <div className='flex flex-col gap-y-2 bg-[#5e2c5f] h-full items-center justify-center'>
        <AlertTriangle className='size-5 text-white' />
        <p className='text-white text-sm'>Workspace not found</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col bg-[#5e2c5f] h-full'>
      <WorkspaceHeader workspace={workspace} isAmin={member.role === 'admin'} />
      <div className='flex flex-col px-2 mt-3'>
        <SidebarItem label='Messages' id='messages' icon={MessageSquareText} variant={'default'} />
        <SidebarItem label='Drafts & Send' id='drafts' icon={SendHorizonal} variant={'default'} />
      </div>
      <WorkspaceSection label='Channels' hint='New channel' onNew={member.role === 'admin' ? () => setOpen(true) : undefined}>
        {channels?.map((channel) => (
          <SidebarItem key={channel._id} label={channel.name} id={channel._id} icon={HashIcon} variant={channelId === channel._id ? 'active' : 'default'} />
        ))}
      </WorkspaceSection>
      <WorkspaceSection
        label='Direct Messages'
        hint='New direct message'
        onNew={() => console.log('new direct message')}
      >
        {members?.map((item) => (
          <UserItem key={item._id} id={item._id} label={item.user.name} image={item.user.image} />
        ))}
      </WorkspaceSection>
    </div>
  )
}
