import { Models } from "appwrite";
import { useState, useEffect } from "react";
import { checkIsLiked } from "@/lib/utils";
import {
  useLikePost,
  useSavePost,
  useDeleteSavedPost,
  useGetCurrentUser,
} from "@/lib/react-query/queriesAndMutations";
import { Bookmark, BookmarkCheck, HeartIcon } from "lucide-react";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);
  
  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavePost } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((Id) => Id !== userId);
    } else {
      likesArray.push(userId);
    }

    setLikes(likesArray);
    likePost({ postId: post.$id, likesArray });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavePost({ savedPostId: savedPostRecord.$id });
    }

    savePost({ userId: userId, postId: post.$id });
    setIsSaved(true);
  };

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center gap-1 cursor-pointer">
        <span onClick={(e) => handleLikePost(e)}>
          <HeartIcon
            className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-400 hover:fill-indigo-600"
            fill={`${checkIsLiked(likes, userId) ? "#305194" : ""}`}
          />
        </span>
        <span className="text-sm sm:text-lg">{likes.length}</span>
      </div>
      <div className="flex items-center gap-1 cursor-pointer ">
        {/* <>
              <Loader2 className="w-4 h-4 animate-spin" />
            </>
       */}
        <>
          {isSaved ? (
            <BookmarkCheck
              onClick={(e) => handleSavePost(e)}
              className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-400"
              fill="#305194"
            />
          ) : (
            <Bookmark
              onClick={(e) => handleSavePost(e)}
              className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-400 hover:fill-indigo-600"
            />
          )}
        </>
      </div>
    </div>
  );
};

export default PostStats;
