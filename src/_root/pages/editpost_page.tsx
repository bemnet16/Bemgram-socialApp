import {  ClipboardEditIcon, Loader2 } from "lucide-react";

import PostForms from "@/components/forms/post-forms";
import { useParams } from "react-router-dom";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";

const EditPostPage = () => {

  const { id } = useParams()
  const { data: post, isPending: isLoadingPost } = useGetPostById(id || " ")

  if(isLoadingPost) return <div className="flex items-center justify-center w-full"> <Loader2 className="w-16 h-16 animate-spin" /></div>

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 overflow-y-scroll py-10 pt-2 px-5 md:px-8 lg:pt-6 lg:p-14 ">
        <div className="flex items-center font-bold max-w-5xl justify-start gap-3 w-full">
          <ClipboardEditIcon className="mr-2" />
          <h2 className="text-lg ">Edit Post</h2>
        </div>

          <PostForms post={post} action={"update"}/>
      </div>
    </div>
  );
};

export default EditPostPage;
