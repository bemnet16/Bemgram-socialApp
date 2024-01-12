import { Route, Routes } from "react-router-dom";

import SignInPage from "./_auth/forms/signIn_page";
import SingUpPage from "./_auth/forms/singUp_page";
import AuthLayout from "./_auth/auth_layout";

import { AllUsers_page, CreatePost_page, EditPost_page, Explore_page, Home_page, LikedPost_page, PostDetails_page, Profile_page, Saved_page, UpdateProfile_page } from "./_root/pages/page_imports";
import RootLayout from "./_root/root_layout";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <main className="bg-black text-white">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SingUpPage />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route index element={<Home_page />} />
          <Route path="/explore" element={<Explore_page />} />
          <Route path="/saved" element={<Saved_page />} />
          <Route path="/all-users" element={<AllUsers_page />} />
          <Route path="/create-post" element={<CreatePost_page />} />
          <Route path="/update-post/:id" element={<EditPost_page />} />
          <Route path="/posts/:id" element={<PostDetails_page />} />
          <Route path="/profile/:id/*" element={<Profile_page />} />
          <Route path="/update-profile/:id" element={<UpdateProfile_page />} />
          <Route path="/liked-post" element={<LikedPost_page />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
}

export default App;
