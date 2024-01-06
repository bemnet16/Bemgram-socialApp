import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// import { createUserAccount } from "@/lib/appwrite/api";
import { useUserContext } from "@/context/auth-context";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutations";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "please enter valid name" })
    .max(50, { message: "larg characters" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "Password must be 8 character" }),
  username: z.string().min(2, { message: "username is required" }),
});

const SingUpPage = () => {
  const { mutateAsync: createUserAccount, isPending: isSigningUp } =
    useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount();
  const {checkAuthUser, isLoading: isUserLoading} = useUserContext()
  const navigate = useNavigate()
  const { toast } = useToast();
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const newUser = await createUserAccount(values);

    if (!newUser) {
     return toast({
        variant: "destructive",
        title: "Sing up faild! Please try again.",
      });
    } else {
      toast({
        title: "You have registered successfully",
      });
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    if (!session) {
      return toast({
        variant: "destructive",
        title: "sign in faild! please try again",
      });
    }

    const isLoggedIn  = await checkAuthUser()
    if(isLoggedIn){
      form.reset()
      navigate("/")
    }else{
      return toast({
        variant:"destructive",
        title: "Sign up faild. Please try again!"
      })
    }
    

  };

  return (
    <>
      <Form {...form}>
        <div className="flex flex-col text-center mb-3">
          <p className="text-zinc-200 font-bold text-xl py-2">
            Create a new account
          </p>
          <p className="text-slate-400 text-xs ">
            To use bemgram, please enter your detail.
          </p>
        </div>
        <form
          className="w-[250px] sm:w-[370px] text-white flex flex-col gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Full Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="enter your fullname..."
                    className="bg-slate-800 border-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-600 font-normal" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="enter your email..."
                    className="bg-slate-800 border-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-600 font-normal" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your password"
                    className="bg-slate-800 border-0"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-600 font-normal" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="my-2">
                <div className="flex items-center">
                  <FormLabel className="w-1/2 text-slate-400">
                    User Name :
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="people will identify you"
                      className="bg-slate-800 border-0 py-0"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-xs text-end text-red-600 font-normal" />
              </FormItem>
            )}
          />
          <Button
            disabled={isSigningUp}
            className="bg-orange-800 font-bold hover:bg-orange-700 mt-4"
            type="submit"
          >
            {isUserLoading || isSigningUp || isSigningIn ? (
              <>
                <Loader2 className="w-7 h-7 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              <>Sing Up</>
            )}
          </Button>
          <p className="text-zinc-300 text-xs ml-1">
            Have an account?
            <Link to={"/sign-in"} className="text-purple-500 ml-1">
              Sign In
            </Link>
          </p>
        </form>
      </Form>
    </>
  );
};

export default SingUpPage;
