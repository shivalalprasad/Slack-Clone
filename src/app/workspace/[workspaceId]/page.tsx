'use client';

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
export default function WorkSpaceIPage() {
  const workspaceId = useWorkspaceId()
  const {data} = useGetWorkspace({ id:workspaceId})
  return(
    <div>
       Workspace name: {JSON.stringify(data?.name)}<br/>
       CreatedAt: {JSON.stringify(data?._creationTime)}<br/>
       Workspace id: {JSON.stringify(data?._id)}<br/>
       Join Code: {JSON.stringify(data?.joinCode)}<br/>
       Userid: {JSON.stringify(data?.userId)} <br/>
       {/* // return <div>WorkSpaceIPage</div> */}
    </div>
  );
}
