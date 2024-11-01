import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export function RegisterCode() {
    return (
        <>
            <Form className="w-96">
                <p className="text-center text-lg font-bold">An email with code have been sent to your mailbox.</p>

                <Form.FloatingLabel className="mb-3" controlId="formCode" label="Verify Code">
                    <Form.Control type="text" />
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