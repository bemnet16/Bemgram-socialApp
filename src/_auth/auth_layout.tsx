import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <div className="flex">
          <section className="flex flex-1 justify-center items-center flex-col py-10 h-screen bg-slate-950">
            <div className="flex items-center justify-center text-orange-300 mb-3">
              <img src="/assets/images/logo.jpg" className="mr-4 w-10 h-10"/>
              <span className="text-2xl font-bold"> Bemgram</span>
            </div>
            <Outlet />
          </section>
          <img
            src="/assets/images/side-img.jpg"
            alt="side img"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          />
        </div>
      )}
    </>
  );
};

export default AuthLayout;
