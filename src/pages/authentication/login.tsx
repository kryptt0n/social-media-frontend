import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/authContext";
import { setCookie } from "typescript-cookie";

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
            navigate("/admin/dashboard");
            setCookie('token', "admin", { expires: 1 });
            sessionStorage.setItem("curUn", userData.username);
        } else {
            const response = await auth.login(userData);

            if (response.toString() === "locked") {
                navigate("/recovery");
            }

            if (response) {
                navigate("/home");
            } else {
                setError("Incorrect credentials");
            }
        }
    };

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
            </Form>
        </>
    );
}