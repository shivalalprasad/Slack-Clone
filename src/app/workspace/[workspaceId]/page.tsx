// interface Props {
//   params: {
//     workspaceId: string
//   }
// }
type Props = {
  params: Promise<{ workspaceId: string }>;
};


export default async function WorkSpaceIPage({ params }: Props) {
  return <div>id: {(await params).workspaceId}</div>
}
