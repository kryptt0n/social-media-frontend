import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/authContext";
import { setCookie } from "typescript-cookie";
import GoogleButton from "react-google-button";
import {oauthSignIn} from "../../lib/actions";

export default function Login() {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const auth = useAuth();
    const [userData, setUserData] = useState(
        {
            "username": "",
            "password": "",
        },
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (userData.username == "admin") {
            const response = await auth.login(userData);
            if (response) {
                navigate("/admin/dashboard");
            } else {
                setError("Incorrect credentials");
            }
        } else {
            try {
                const response = await auth.login(userData);
    
                if (response.toString() === "locked") {
                    navigate("/recovery");
                }
    
                if (response) {
                    navigate("/home");
                } else {
                    setError("Incorrect credentials");
                }
                
            } catch (error: any) {
                console.log(`Here caught a error ${error}`)
                setError(error.message)
            }
        }
    };

    function handleGoogleLogin() {
        oauthSignIn("google");
    }

    return (
        <>

            <Form className="w-96" onSubmit={handleSubmit}>
                <div className="mb-10">
                    <h1 className="w-full text-center text-3xl ">Social Media</h1>
                    <p className="w-full text-center text-gray-600">v 0.3</p>
                </div>
                <Form.FloatingLabel controlId="formUsername" label="Username" className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUserData(
                            {
                                ...userData,
                                "username": e.target.value,
                            }
                        )}
                    />
                </Form.FloatingLabel>

                <Form.FloatingLabel className="mb-3" controlId="formPassword" label="Password">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setUserData(
                            {
                                ...userData,
                                "password": e.target.value,
                            }
                        )}
                    />
                </Form.FloatingLabel>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="d-grid">
                    <Button variant="primary" className="w-auto" type="submit">
                        Login
                    </Button>
                </div>

                <p className="text-sm">Don't have an account? <a className="underline"
                                                                 href="/register/info">Register</a></p>
                <a className="underline" href="/forgot-password">Forgot password</a>


                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>


                <div className="d-grid">
                    <Button
                        variant="light"
                        className="flex items-center justify-center w-auto border border-gray-300 shadow-sm py-2"
                        onClick={handleGoogleLogin}
                    >
                        <span className="mr-2 text-gray-700">Sign in with Google</span>


                        <img
                            src="https://www.gstatic.com/images/branding/product/1x/gsa_64dp.png"
                            alt="Google"
                            className="w-5 h-5"
                        />
                    </Button>
                </div>
            </Form>
        </>
    );
}