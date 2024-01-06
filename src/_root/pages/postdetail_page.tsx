import { useParams, Link, useNavigate } from "react-router-dom";


import {
  useGetPostById,
  // useGetUserPosts,
  useDeletePost,
} from "@/lib/react-query/queriesAndMutations";
import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import {  Loader2, PenBox, StepBack, Trash } from "lucide-react";
import PostStats from "@/components/shared/post-stats";

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext();

  const { data: post, isLoading } = useGetPostById(id || " ");
  // const { data: userPosts, isLoading: isUserPostLoading } = useGetUserPosts(
  //   post?.creator.$id
  // );
  const { mutate: deletePost } = useDeletePost();

  // const relatedPosts = userPosts?.documents.filter(
  //   (userPost) => userPost.$id !== id
  // );

  const handleDeletePost = () => {
    deletePost({ postId: id || " ", imageId: post?.imageId });
    navigate(-1);
  };

  return (
    <div className="flex flex-col flex-1 gap-10 overflow-y-scroll py-10 px-5 md:p-14 custom-scrollbar items-center">
      <div className="hidden md:flex max-w-5xl w-full">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="flex gap-4 items-center justify-start hover:bg-transparent hover:text-indigo-400">
         <StepBack />
          <p className="text-[14px] font-medium leading-[140%] lg:text-[16px]">Back</p>
        </Button>
      </div>

      {isLoading || !post ? (
        <Loader2  className="w-16 h-16 animate-spin"/>
      ) : (
        <div className="bg-[#09090A] w-full max-w-5xl rounded-[30px] flex-col flex xl:flex-row border border-[#1F1F22] xl:rounded-l-[24px]">
          <img
            src={post?.imageUrl}
            alt="creator"
            className="h-80 lg:h-[480px] xl:w-[48%] rounded-t-[30px] xl:rounded-l-[24px] xl:rounded-tr-none object-cover p-5 bg-[#000000]"
          />

          <div className="bg-[#09090A] flex flex-col gap-5 lg:gap-7 flex-1 items-start p-8 rounded-[30px]">
            <div className="flex justify-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3">
                <img
                  src={
                    post?.creator.imageUrl 
                  }
                  alt="creator"
                  className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                />
                <div className="flex gap-1 flex-col">
                  <p className="text-[16px] font-medium leading-[140%] lg:text-[18px] lg:font-bold lg:leading-[140%] text-[#FFFFFF]">
                    {post?.creator.name}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-[#7878A3]">
                    <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px] lg:font-normal lg:leading-[140%] ">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    •
                    <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px] lg:font-normal lg:leading-[140%]">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex items-center justify-center gap-3">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && "hidden"}`}>
                  <PenBox className="w-5 h-5 text-indigo-500" />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  className={`ost_details-delete_btn ${
                    user.id !== post?.creator.$id && "hidden"
                  }`}>
                  <Trash className="w-5 h-5 text-red-800" />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-[#1F1F22]/80" />

            <div className="flex flex-col flex-1 w-full text-[14px] font-medium leading-[140%] lg:text-[16px] lg:font-normal">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string, index: string) => (
                  <li
                    key={`${tag}${index}`}
                    className="text-[#7878A3] text-[14px] font-normal leading-[140%]">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl">
        <hr className="border w-full border-[#1F1F22]/80" />

        <h3 className="text-[18px] font-bold leading-[140%] md:text-[24px]  tracking-tighter w-full my-10">
          More Related Posts
        </h3>
        {/* {isUserPostLoading || !relatedPosts ? (
          <Loader />
        ) : (
          <GridPostList posts={relatedPosts} />
        )} */}
      </div>
    </div>
  );
};

export default PostDetails;