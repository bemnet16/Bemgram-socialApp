import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useUserContext } from "@/context/auth-context";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";

import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "incorrect email" }),
  password: z.string().min(8, { message: "Incorrect password" }),
});

const SignInPage = () => {
  const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount();
  const { checkAuthUser, isLoading: isUserLoading} = useUserContext()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const userAccount = await signInAccount(values);
    if (!userAccount) {
      return toast({
        variant: "destructive",
        title: "Invalid email or credential please try again",
      });
    }

    const isLoggedIn = await checkAuthUser()
    if(!isLoggedIn){
      return toast({
        variant:"destructive",
        title: "Sign In failed. Please try again!"
      })
    }else{
      form.reset()
      navigate("/")
    }

  };

  return (
    <div className="flex flex-col gap-1 text-center">
      <div className="flex flex-col text-center">
        <p className="text-zinc-200 font-bold text-xl py-2">
          Log in to your account
        </p>
        <p className="text-slate-400 text-xs ">
          Welcome back! please enter your detail.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 text-white w-[250px] sm:w-[370px]"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className=" text-start">
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input
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
              <FormItem className="text-start">
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="your password"
                    className="bg-slate-800 border-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-600 font-normal" />
              </FormItem>
            )}
          />
          <Button
            disabled={isSigningIn}
            type="submit"
            className="bg-orange-800 font-bold hover:bg-orange-700 mt-5"
          >
            {(isSigningIn || isUserLoading) ? (
              <span className="flex items-center">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </span>
            ) : (
              <>Log In</>
            )}
          </Button>
          <p className="text-zinc-300 text-xs text-start ml-1">
            Don't have an account?{" "}
            <Link to={"/sign-up"} className="text-purple-500 ml-1">
              Sign Up
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SignInPage;
