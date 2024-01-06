import { ImageIcon } from "lucide-react";

import PostForms from "@/components/forms/post-forms";

const CreatePostPage = () => {
  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 overflow-y-scroll py-10 pt-2 px-5 md:px-8 lg:pt-6 lg:p-14 ">
        <div className="flex items-center font-bold max-w-5xl justify-start gap-3 w-full">
          <ImageIcon className="mr-2" />
          <h2 className="text-lg ">Create Post</h2>
        </div>

        <PostForms action={"create"} />
      </div>
    </div>
  );
};

export default CreatePostPage;
