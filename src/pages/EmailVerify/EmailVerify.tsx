import { InboxStackIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";

const EmailVerify = () => {
  const navigate = useNavigate();
  return (
    <main className="grid min-h-screen place-items-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center flex flex-col">
            <p className="text-base font-semibold text-indigo-400 mb-4">Email verification</p>
            <InboxStackIcon color="oklch(67.3% 0.182 276.935)" height='5em' />
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
                You have verified your email
            </h1>
            <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
                Redirecting to your dashboard...
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
                onClick={() => {
                    navigate("/");
                }}
                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
                Go Home
            </button>
            </div>
        </div>
    </main>
  )
}

export default EmailVerify