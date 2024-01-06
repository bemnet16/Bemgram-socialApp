import PostCard from "@/components/shared/post-card";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { Loader2 } from "lucide-react";

const HomePage = () => {
  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPost,
  } = useGetRecentPosts();

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 py-10 px-5 md:px-8 lg:p-14 overflow-y-scroll">
        <div className=" max-w-screen-sm flex flex-col items-center w-full gap-6 md:gap-9">
          <h2 className="md:text-lg font-semibold text-left w-full">
            Home Feed
          </h2>
          {isErrorPost && (
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-bold">Something went wrong</h2>
              <h1 className="text-3xl">posts can't fetched</h1>
            </div>
          )}
          {isPostLoading && !posts ? (
            <Loader2 className="w-20 h-20 animate-spin" />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.$id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
