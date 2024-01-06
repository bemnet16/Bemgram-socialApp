import GridPostList from "@/components/shared/gridpost-list";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
import { Loader2 } from "lucide-react";

const LikedPostsPage = () => {
  const { data: currentUser } = useGetCurrentUser();

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader2 className="w-24 h-24 animate-spin" />
      </div>
    );

  return (
    <>
      {currentUser.liked.length === 0 && (
        <p className="text-light-4">No liked posts</p>
      )}

      <GridPostList posts={currentUser.liked} showStats={false} />
    </>
  );
};

export default LikedPostsPage;