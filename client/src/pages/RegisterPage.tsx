import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";


function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { isAuthenticated, registerError, register } = useAuth()
    const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; password?: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated])

    function validateForm() {
        const errors: { name?: string; email?: string; password?: string } = {};
        if (!name) {
            errors.name = 'Name field is required';
        } else if (name.length < 4) {
            errors.name = 'Name must be at least 4 characters'
        }
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

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            setIsLoading(true);
            await register({ name, email, password });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="flex flex-col gap-6 " >
            <Card>
                <CardHeader>
                    <CardTitle>Register new account</CardTitle>

                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">

                                <Label className="mb-2" htmlFor="name">Name</Label>
                                <Input onChange={(e) => setName(e.target.value)} value={name} name="name" id="name" type="text" placeholder="Name"></Input>
                                {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input onChange={(e) => setEmail(e.target.value)} value={email} name="email" id="email" type="email" placeholder="Email"></Input>
                                {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" id="password" type="password" name="password"></Input>
                                {formErrors.password && <p className="text-sm text-red-500">{formErrors.password}</p>}
                            </div>
                            <div className="flex flex-col gap-3">

                                <Button disabled={isLoading} variant='outline' className="w-full" type="submit" > {isLoading ? "Please wait…" : "Submit"}</Button>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <a href="/login" className="underline underline-offset-4">
                                Log in
                            </a>
                        </div>
                    </form>
                    {registerError && (
                        <Alert variant="destructive" className="m-4">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                {typeof registerError === "string"
                                    ? registerError
                                    : "data" in registerError && registerError.data
                                        ? (registerError.data as any).message || "Register failed"
                                        : "Register failed"}
                            </AlertDescription>
                        </Alert>
                    )}

                </CardContent>
            </Card>
        </div>
    )
}
export default RegisterPage;

