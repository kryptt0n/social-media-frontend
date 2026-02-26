import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { SetOauthUsernameProp, UserProp } from "../../../lib/propinterfaces";
import { createOauthUsername, register } from "../../../lib/actions";
import { useNavigate } from "react-router-dom";
import {useParams} from "react-router-dom";
import { useAuth } from "../../../lib/authContext";

export default function RegisterUsernameInfo() {
    const [username, setUsername] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
        const { code } = useParams<{code: string}>();
        const auth = useAuth();

        const navigate = useNavigate();

        useEffect(() => {
            if (!code) {
                navigate("/");
            }
        }, [code, navigate]);

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            console.log("REgistering!")

            if (!username || username.trim().length == 0) {
                setErrorMessage("Username cannot be blank");
                return;
            }

        try {
            if (!code) {
                navigate("/");
                return;
            }
            await createOauthUsername(username, code!);
            console.log("Registered successfully!");
            console.log(`With username: ${username}`);
            sessionStorage.setItem("curUn", username);

            navigate('/home');
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    }

    return (
        <>
            <Form className="w-96" onSubmit={handleSubmit}>
               
                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

                <Form.FloatingLabel className="mb-3" controlId="formUsername" label="Username">
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.FloatingLabel>

                <div className="d-grid">
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </div>
            
            </Form>
        </>
    );
}