import {Alert, Button} from "react-bootstrap";
import { Form } from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {FormEvent, useState} from "react";
import {resetPassword} from "../../../lib/actions";

export default function ResetNewPassword() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    const [password, setPassword] = useState<string>("");
    const [rePassword, setRePassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();


    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (password !== rePassword) {
            setError("Passwords don't match");
        } else {
            try {
                await resetPassword(token!, {newPassword: password});
                navigate("/reset-password/fin");
            } catch (e) {
                setError("Unable to reset password");
            }
        }
    }

    return (
        <>
            {token ?
                <Form className="w-96" onSubmit={handleSubmit}>
                    {error &&
                        <Alert variant="danger" className="text-center">
                            {error}
                        </Alert>
                    }
                    <Form.FloatingLabel className="mb-3" controlId="formCode" label="Enter new password">
                        <Form.Control type="password"
                                      placeholder="Enter new password"
                                      value={password}
                                      onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.FloatingLabel>

                    <Form.FloatingLabel className="mb-3" controlId="formCode" label="Re-enter new password">
                        <Form.Control type="password"
                                      placeholder="Re-enter new password"
                                      value={rePassword}
                                      onChange={(e) => setRePassword(e.target.value)}
                        />
                    </Form.FloatingLabel>

                    <div className="d-grid">
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
                :
                <Alert variant="danger" className="text-center">
                    Invalid token
                </Alert>
            }
        </>
    );
}