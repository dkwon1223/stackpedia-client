import { LockClosedIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Loader from "@/components/custom/Loader/Loader";
import { useAuth } from "@hooks/useAuth";

const Oauth2Redirect = () => {
  const navigate = useNavigate();
  const { handleOAuthCallback, user } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      handleOAuthCallback();
    } catch (err) {
      console.error('OAuth2 callback error:', err);
      setError('Failed to complete authentication. Please try again.');
    }
  }, [handleOAuthCallback]);

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 3000); 

      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  return (
    <main className="grid min-h-screen place-items-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center flex flex-col items-center">
            {error ? (
              <>
                <p className="text-base font-semibold text-red-400 mb-4">Authentication Failed</p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
                  Error
                </h1>
                <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
                  {error}
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <button
                      onClick={() => navigate("/login")}
                      className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                      Try Again
                  </button>
                </div>
              </>
            ) : user ? (
              <>
                <p className="text-base font-semibold text-green-400 mb-4">Success!</p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
                  Welcome, {user.username}!
                </h1>
                <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
                  Redirecting you to your dashboard...
                </p>
              </>
            ) : (
              <>
                <p className="text-base font-semibold text-indigo-400 mb-4">Authenticating</p>
                <LockClosedIcon color="oklch(67.3% 0.182 276.935)" height='2em' />
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
                    Google / Github
                </h1>
                <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
                    Please wait - setting up your account information...
                </p>
                <Loader />
              </>
            )}
        </div>
    </main>
  );
};

export default Oauth2Redirect;