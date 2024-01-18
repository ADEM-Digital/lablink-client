import { useAuth0 } from "@auth0/auth0-react";
import { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DotLoaderSpinner from "../../components/spinners/DotLoader";

const Login = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();
  useEffect(() => {
    console.log("login", isAuthenticated);
    if (user) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Suspense fallback={<DotLoaderSpinner />}>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="mx-auto flex items-center justify-center gap-4">
            <img
              className="h-20 w-auto"
              src="/Lablink-logo.png"
              alt="LabLink"
            />
            <p className=" font-bold text-4xl text-cyan-600">LabLink</p>
          </div>

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
            <button
              onClick={() => loginWithRedirect()}
              className="font-semibold leading-6 text-cyan-600 hover:text-cyan-500"
            >
              Register for free
            </button>
          </p>
        </div>
      </div>
    </Suspense>
  );
};

export default Login;
