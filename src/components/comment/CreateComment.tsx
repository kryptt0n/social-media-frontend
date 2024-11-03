import { Card, Form, Button } from "react-bootstrap";

export default function CreateComment() {
    return (
        <>
            <Card>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control as="textarea" placeholder="Post your reply" rows={2} />
                </Form.Group>
                <div className="items-center flex justify-between px-6 pb-2">
                    <Button variant="primary" type="submit">
                        Reply
                    </Button>
                </div>
            </Card>
        </>
    );
}