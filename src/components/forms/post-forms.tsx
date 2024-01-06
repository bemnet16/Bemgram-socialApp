import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/auth-context";
import FileUploader from "../shared/file-uploader";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Models } from "appwrite";
import { toast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  caption: z.string().min(5, { message: "caption required" }).max(2200),
  location: z.string().min(2, { message: "location required" }).max(100),
  file: z.custom<File[]>(),
  tags: z.string(),
});

type PostFormProps = {
  post?: Models.Document;
  action: "create" | "update";
};

const PostForms = ({ post, action }: PostFormProps) => {
  const { user } = useUserContext();
  const { mutateAsync: createPost, isPending: isCreatingPost } =
    useCreatePost();
  const {mutateAsync: updatePost, isPending: isUpdatingPost} = useUpdatePost()

  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caption: post ? post?.caption : "",
      location: post ? post?.location : "",
      file: [],
      tags: post ? post.tags.join(",") : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (action === "create") {
      const newPost = await createPost({
        ...values,
        userId: user.id,
      });

      if (!newPost) {
        return toast({
          variant: "destructive",
          title: "Something went wrong!",
          description: "Post doesn't created. please try again.",
        });
      } else {
        navigate("/");
      }
    } else if(post && action === "update") {
      const updatedPost = await updatePost({
        ...values,
      postId: post.$id,
      imageId: post?.imageId,
        imageUrl: post?.imageUrl
      })

      if(!updatedPost){
        return toast({
          variant:"destructive",
          title:"Post doesn't updated!",
          description:"Something went wrong. please try again"
        })

      }

        return navigate(`/posts/${post.$id}`)
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-start w-full max-w-5xl gap-9 md:w-3/4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-white px-2">Caption</FormLabel>
                <FormControl className="border-none outline-none">
                  <Textarea
                    className=" h-36 bg-[#131315] rounded-xl border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-[#7878A3]"
                    {...field}
                    placeholder=""
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs px-2" />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-white px-2">Add Photos</FormLabel>
                <FormControl className="border-none outline-none">
                  <FileUploader
                    fieldChange={field.onChange}
                    mediaUrl={post?.imageUrl}
                  />
                </FormControl>
                {/* <FormMessage className="text-red-500 text-xs px-2" >
                    there must be a photo!
                </FormMessage> */}
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-white px-2">Add Location</FormLabel>
                <FormControl className="border-none outline-none">
                  <Input
                    {...field}
                    placeholder=""
                    className=" bg-[#131315] rounded-xl border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-[#7878A3] p-5 pb-6"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs px-2" />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-white px-2">
                  Add Tags (separated by comma ",")
                </FormLabel>
                <FormControl className="border-none outline-none">
                  <Input
                    {...field}
                    placeholder="e.g: img, picture, photo, photograph"
                    className=" bg-[#131315] rounded-xl border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-[#7878A3] p-5 pb-6"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs px-2" />
              </FormItem>
            );
          }}
        />

        <div className="flex justify-end gap-3">
          {(!isCreatingPost && !isUpdatingPost) && (
            <Button onClick={() => navigate("/")}>Cancel</Button>
          )}
          <Button
            disabled={isCreatingPost || isUpdatingPost}
            type="submit"
            className="px-8 bg-indigo-700 hover:bg-indigo-600"
          >
            {(isCreatingPost || isUpdatingPost)? (
              <div className="flex items-center">
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                {isCreatingPost?
                "creating..." : "updating.."
              }
              </div>
            ) : (
              <>{action === "create"? "Create" : "Update"}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForms;
