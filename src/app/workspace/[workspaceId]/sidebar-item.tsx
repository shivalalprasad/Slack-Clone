import Link from 'next/link'
import { LucideIcon } from 'lucide-react'
import { IconType } from 'react-icons/lib'
import { cva, VariantProps } from 'class-variance-authority'
import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
const sidebarItemVariants = cva(
  'flex items-center gap-1.5 justify-start font-normal h-7 px-[18px] text-sm overflow-hidden',
  {
    variants: {
      variant: {
        default: 'text-[#f9edffcc]',
        active: 'text-[#481349] bg-white/90 hover:bg-white/90'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)
interface SidebarItemProps {
  label: string
  id: string
  icon: LucideIcon | IconType
  variant?: VariantProps<typeof sidebarItemVariants>['variant']
}
export default function SidebarItem({ label, id, icon: Icon, variant }: SidebarItemProps) {
  const workspaceId = useWorkspaceId()
  return (
    <Button variant='transparent' size='sm' className={cn(sidebarItemVariants({ variant: variant }))} asChild>
      <Link href={`/workspace/${workspaceId}/channel/${id}`}>
        <Icon className='size-3.5 mr-1 shrink-0' />
        <p className='truncate'>{label}</p>
      </Link>
    </Button>
  )
}
