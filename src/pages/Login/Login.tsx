import { AuthLayout } from "@/components/catalyst/auth-layout";
import { Button } from "@/components/catalyst/button";
import { Checkbox, CheckboxField } from "@/components/catalyst/checkbox";
import { ErrorMessage, Field, Label } from "@/components/catalyst/fieldset";
import { Heading } from "@/components/catalyst/heading";
import { Input } from "@/components/catalyst/input";
import { Strong, Text, TextLink } from "@/components/catalyst/text";
import type { UserLoginPayload } from "@/types/auth";
import { AxiosError } from "axios";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router";
import { Badge } from "@/components/catalyst/badge";

type LoginFieldErrors = {
  username: {
    isError: boolean;
    message: string;
  };
  password: {
    isError: boolean;
    message: string;
  };
}

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginPayload, setLoginPayload] = useState<UserLoginPayload>({
    username: '',
    password: '',
  });
  const [loginFieldErrors, setLoginFieldErrors] = useState<LoginFieldErrors>({
    username: {
      isError: false,
      message: ''
    },
    password: {
      isError: false,
      message: ''
    }
  });
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getErrorMessage = () => {
    if (error && error instanceof AxiosError) {
      return (
        error.response?.data?.message ||
        error.message ||
        "Failed to login"
      );
    }
    return "Failed to login";
  };

  const handleLogin = async () => {
    if(loginPayload.username.length === 0 || loginPayload.password.length === 0) {
      setLoginFieldErrors({
        username: {
          isError: loginPayload.username.length === 0,
          message: loginPayload.username.length === 0 ? "Email field is required to login" : ''
        },
        password: {
          isError: loginPayload.password.length === 0,
          message: loginPayload.password.length === 0 ? "Password field is required to login" : ''
        }
      });
    } else {
      try {
        setIsLoading(true);
        setError(null);
        await login(loginPayload);
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } catch (err) {
        setError(err as AxiosError);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <section className="h-full w-screen bg-slate-950">
        <AuthLayout>
          <form action="#" method="POST" className="grid w-full max-w-sm grid-cols-1 gap-8">
            <img
              alt="StackPedia icon"
              src="/stack.svg"
              className="mx-auto h-10 w-auto"
            />
            <Heading>Sign in to your account</Heading>
            <Field>
              <Label>Username / Email</Label>
              <Input
                type="email"
                name="email"
                invalid={loginFieldErrors.username.isError}
                value={loginPayload.username}
                onChange={(e) => {
                  setLoginPayload({...loginPayload, username: e.target.value });
                  if (loginFieldErrors.username.isError) {
                    setLoginFieldErrors({...loginFieldErrors, username: { isError: false, message: '' }});
                  }
                }}
              />
              {loginFieldErrors.username.message && <ErrorMessage>{loginFieldErrors.username.message}</ErrorMessage>}
            </Field>
            <Field>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                invalid={loginFieldErrors.password.isError}
                value={loginPayload.password}
                onChange={(e) => {
                  setLoginPayload({...loginPayload, password: e.target.value });
                  if (loginFieldErrors.password.isError) {
                    setLoginFieldErrors({...loginFieldErrors, password: { isError: false, message: '' }});
                  }
                }}
              />
              {loginFieldErrors.password.message && <ErrorMessage>{loginFieldErrors.password.message}</ErrorMessage>}
            </Field>
            { error && (
              <Badge color="red" className="h-12 px-4">{getErrorMessage()}</Badge> 
            )}
            <div className="flex items-center justify-between">
              <CheckboxField>
                <Checkbox name="remember" />
                <Label>Remember me</Label>
              </CheckboxField>
              <Text>
                <TextLink href="#">
                  <Strong>Forgot password?</Strong>
                </TextLink>
              </Text>
            </div>
            <Button type='button' className="w-full" color="indigo" onClick={handleLogin} disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            <div>
                <div className="flex items-center gap-x-6">
                  <div className="w-full flex-1 border-t border-white/10" />
                  <p className="text-sm/6 font-medium text-nowrap text-white">Or continue with</p>
                  <div className="w-full flex-1 border-t border-white/10" />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <a
                    href="#"
                    className="flex w-full items-center justify-center gap-3 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 focus-visible:inset-ring-transparent"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                      <path
                        d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                        fill="#EA4335"
                      />
                      <path
                        d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                        fill="#34A853"
                      />
                    </svg>
                    <span className="text-sm/6 font-semibold">Google</span>
                  </a>

                  <a
                    href="#"
                    className="flex w-full items-center justify-center gap-3 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 focus-visible:inset-ring-transparent"
                  >
                    <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="size-5 fill-white">
                      <path
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm/6 font-semibold">GitHub</span>
                  </a>
                </div>
              </div>
            <Text>
              Don’t have an account?{' '}
              <TextLink href="/signup">
                <Strong>Sign up</Strong>
              </TextLink>
            </Text>
          </form>
        </AuthLayout>
      </section>
    </>
  );
};

export default Login;