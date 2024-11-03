import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export function Login() {
    return (
        <>
            
            <Form className="w-96">
                <Form.FloatingLabel controlId="formEmail" label="Email address" className="mb-3">
                    <Form.Control type="email" placeholder="Email address" />
                </Form.FloatingLabel>

                <Form.FloatingLabel className="mb-3" controlId="formPassword" label="Password">
                    <Form.Control type="password" placeholder="Password" />
                </Form.FloatingLabel>

                <p className="text-red-500 text-sm text-right"><a href="/reset/info">Forgot password?</a></p>

                <div className="d-grid">
                    <Button variant="primary" className="w-auto" type="submit">
                        Submit
                    </Button>
                </div>

                <p className="text-sm">Don't have an account? <a className="underline" href="/register/info">Register</a></p>
            </Form>
        </>
    );
}