import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export default function ResetInfo() {
    return (
        <>
            <Form className="w-96">
                <Form.FloatingLabel className="mb-3" controlId="formCode" label="Your email address">
                    <Form.Control type="email" placeholder="Your email address" />
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