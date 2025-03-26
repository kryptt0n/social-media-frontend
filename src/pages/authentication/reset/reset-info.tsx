import {Alert, Button} from "react-bootstrap";
import { Form } from "react-bootstrap";
import {sendForgotPassword} from "../../../lib/actions";
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function ResetInfo() {

    const[message, setMessage] = useState<string>("");
    const[email, setEmail] = useState<string>("");
    const navigate = useNavigate();


    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(email);


        try {
            await sendForgotPassword({email: email})
            setMessage("Link has been sent");
            setTimeout(() => navigate("/"), 3000);
        } catch (error) {
            setMessage("User with this email was not found");
        }
    }

    return (
        <>

            <Form className="w-96" onSubmit={handleSubmit}>
                {message && (
                    <Alert variant="info" className="text-center">
                        {message}
                    </Alert>
                )}
                <Form.FloatingLabel className="mb-3" controlId="formCode" label="Your email address">
                    <Form.Control type="email"
                                  placeholder="Your email address"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.FloatingLabel>

                <div className="d-grid">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </>
    );
}