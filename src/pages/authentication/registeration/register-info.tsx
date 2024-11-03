import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export default function RegisterInfo() {
    return (
        <>
            <Form className="w-96">
                <Form.FloatingLabel controlId="formEmail" label="Email address" className="mb-3">
                    <Form.Control type="email" placeholder="Email address" />
                </Form.FloatingLabel>

                <Form.FloatingLabel className="mb-3" controlId="formUsername" label="Username">
                    <Form.Control type="text" placeholder="Username" />
                </Form.FloatingLabel>

                <Form.FloatingLabel className="mb-3" controlId="formPassword" label="Password">
                    <Form.Control type="password" placeholder="Password" />
                </Form.FloatingLabel>

                <Form.FloatingLabel className="mb-3" controlId="formDob" label="Date of birth">
                    <Form.Control type="date" placeholder="Date of birth" />
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