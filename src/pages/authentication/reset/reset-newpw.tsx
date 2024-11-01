import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export function ResetNewPassword() {
    return (
        <>
            <Form className="w-96">
                <Form.FloatingLabel className="mb-3" controlId="formCode" label="Enter new password">
                    <Form.Control type="password" placeholder="Enter new password" />
                </Form.FloatingLabel>

                <Form.FloatingLabel className="mb-3" controlId="formCode" label="Re-enter new password">
                    <Form.Control type="password" placeholder="Re-enter new password" />
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