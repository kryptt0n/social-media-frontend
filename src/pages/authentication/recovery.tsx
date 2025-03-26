import { useState } from "react";
import { recoverUser } from "../../lib/actions";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

export default function RecoveryUser() {
    const [username, setUsername] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault

        const response = await recoverUser(username);

        if (response) {
            navigate("/home");
        }

    }

    return (
        <>
            <Form className="w-96" onSubmit={handleSubmit}>
                <Form.FloatingLabel controlId="formUsername" label="Confirm username" className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Confirm Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.FloatingLabel>
                <div className="d-grid">
                    <Button variant="primary" className="w-auto" type="submit">
                        Recover Account
                    </Button>
                </div>
            </Form>
        </>

    );
}