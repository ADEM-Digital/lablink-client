import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  useEffect(() => {
    console.log(window.location.origin)
  }, [])
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <button
            onClick={() => loginWithRedirect()}
            type="button"
            className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
          >
            Sign in
          </button>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-cyan-600 hover:text-cyan-500"
            >
              Register for free
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
