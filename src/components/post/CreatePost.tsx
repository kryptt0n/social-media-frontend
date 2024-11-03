import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { GrGallery } from "react-icons/gr";


export function CreatePost() {
    const [hasImage, setHasImage] = useState<boolean>(false);

    return (
        <>
            <Card>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control as="textarea" placeholder="What is happening?!" rows={4} />
                    </Form.Group>

                    {hasImage && (
                        <Form.Group className="mb-3" controlId="formFile">
                            <Form.Control type="file" accept="image/*" />
                        </Form.Group>
                    )}

                    <div className="items-center flex justify-between px-6 pb-2">
                        <GrGallery onClick={() => setHasImage(!hasImage)} />
                        <Button variant="primary" type="submit">
                            Post
                        </Button>
                    </div>
                </Form>
            </Card>
        </>
    );
}