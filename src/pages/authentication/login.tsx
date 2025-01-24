import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../lib/actions";
import { setCookie } from 'typescript-cookie';

export default function Login() {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const [userData, setUserData] = useState(
        {
            "username": "",
            "password": "",
        },
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await login(userData);

            if (response) {
                const token = response;
                setCookie('token', token, { expires: 1 });
                sessionStorage.setItem("curUn", userData.username);
                navigate("/home");
            } else {
                setError("Incorrect credentials 2");
            }
        } catch (error: any) {
            console.error("Error during login:", error.message);
            setError("Incorrect credentials 3");
        }
    }

    return (
        <>

            <Form className="w-96" onSubmit={handleSubmit}>
                <div className="mb-10">
                    <h1 className="w-full text-center text-3xl ">Social Media</h1>
                    <p className="w-full text-center text-gray-600" >v 0.2</p>
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

                <p className="text-sm">Don't have an account? <a className="underline" href="/register/info">Register</a></p>
            </Form>
        </>
    );
}