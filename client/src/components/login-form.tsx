import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});

  function validateForm() {
    const errors: { email?: string; password?: string } = {};
    if (!email) {
      errors.email = 'email field is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email format is invalid";
    }
    if (!password) {
      errors.password = 'password field is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setIsLoading(true);
      await login({ email, password });
    } catch {
      // error is handled by RTK Query, accessible as loginError
    } finally {
      setIsLoading(false);
    }
  };
  console.log(loginError);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {formErrors.email && (
                  <p className="text-sm text-red-300">{formErrors.email}</p>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" placeholder="password" type="password" value={password}
                  onChange={(e) => setPassword(e.target.value)} />
                {formErrors.password && (
                  <p className="text-sm text-red-300">{formErrors.password}</p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Logging in…" : "Submit"}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/register" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
          {loginError && (
            <Alert variant="destructive" className="m-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {typeof loginError === "string"
                  ? loginError
                  : 'data' in loginError
                    ? (loginError.data as any)?.message || "Login failed"
                    : "Login failed"}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
