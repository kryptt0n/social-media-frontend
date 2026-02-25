import { Alert, Button, Form } from "react-bootstrap";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setPassword } from "../../lib/actions";

export default function SetPassword() {
    const [password, setPasswordInput] = useState<string>("");
    const [rePassword, setRePassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        if (!password.trim()) {
            setError("Password is required");
            return;
        }

        if (password !== rePassword) {
            setError("Passwords don't match");
            return;
        }

        try {
            await setPassword(password);
            navigate("/profile-edit");
        } catch (e) {
            setError("Unable to set password");
        }
    }

    return (
        <Form className="w-96" onSubmit={handleSubmit}>
            {error && (
                <Alert variant="danger" className="text-center">
                    {error}
                </Alert>
            )}

            <Form.FloatingLabel
                className="mb-3"
                controlId="formNewPassword"
                label="Enter new password"
            >
                <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPasswordInput(e.target.value)}
                />
            </Form.FloatingLabel>

            <Form.FloatingLabel
                className="mb-3"
                controlId="formRepeatPassword"
                label="Re-enter new password"
            >
                <Form.Control
                    type="password"
                    placeholder="Re-enter new password"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                />
            </Form.FloatingLabel>

            <div className="d-grid">
                <Button variant="primary" type="submit">
                    Set Password
                </Button>
            </div>
        </Form>
    );
}