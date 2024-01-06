import { useUserContext } from "@/context/auth-context";
import { multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import { PenBox } from "lucide-react";
import { Link } from "react-router-dom";
import PostStats from "./post-stats";

type postCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: postCardProps) => {
  
  const { user } = useUserContext();

  return (
    <div className="bg-[#09090A] lg:rounded-3xl border border-[#202023] p-5 lg:p-7 w-full max-w-screen-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3  w-full">
          <Link to={`/post-detail/${post.creator.$id}`}>
            <img
              src={
                post?.creator?.imageUrl ||
                "/assets/icons/prfile-placeholder.svg"
              }
              alt="creator img"
              className="rounded-full w-12 lg:h-12"
            />
          </Link>

          <div className="flex flex-col">
            <p className=" text-[16px] font-medium leading-[140%]">
              {post.creator.name}
            </p>
            <div className="flex justify-center items-center gap-2 text-[#7878A3]">
              <p className=" text-xs sm:text-sm">
                {multiFormatDateString(post.$createdAt)}
              </p>
              -<p className=" text-xs sm:text-sm">{post.location}</p>
            </div>
          </div>
        </div>
        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}
        >
          <PenBox className="text-indigo-500" />
        </Link>
      </div>

      <Link to={`/posts/${post.$id}`}>
        <div
          className="text-[14px] font-medium leading-[140%]
        lg:text-[16px] py-5
        "
        >
          <p>{post.caption}</p>

          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string, idx: number) => (
              <li key={idx} className="text-[#7878A3]">
                #{tag}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={post.imageUrl}
          alt="post img"
          className="h-84 xs:h-[350px] lg:h-[500px] w-full rounded-[20px] object-cover mb-5 object-top"
        />
      </Link>

      <PostStats post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
