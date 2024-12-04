import { Card, Form, Button } from "react-bootstrap";
import { createComment } from "../../lib/actions";
import { useState } from "react";
import { CommentProp } from "../../lib/propinterfaces";

interface CreateCommentProp {
    postId: number,
}

export default function CreateComment({ postId }: CreateCommentProp) {
    const [content, setContent] = useState<string>("");
    const [commentData, setCommentData] = useState<CommentProp>({
        "content": null,
        "post": {
            "id": postId,
        },
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            ...commentData,
            "content": content,
        };

        try {
            await createComment(payload);
            console.log("Comment created successfully!");

            setContent("");
        } catch (error) {
            console.error("Error creating post:", error);
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="comment">
                    <Form.Control
                        as="textarea"
                        placeholder="Post your reply"
                        rows={2}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Form.Group>
                <div className="items-center flex justify-between px-6 pb-2">
                    <Button variant="primary" type="submit">
                        Reply
                    </Button>
                </div>
            </Form>
        </>
    );
}