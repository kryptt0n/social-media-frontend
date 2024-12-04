import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { GrGallery } from "react-icons/gr";
import { PostProp } from "../../lib/propinterfaces";
import { createPost } from "../../lib/actions";
import { imageToArray } from "../../lib/utils";

export default function CreatePost() {
    const [content, setContent] = useState<string>("");
    const [image, setImage] = useState<Uint8Array | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [hasImage, setHasImage] = useState<boolean>(false);
    const [postData, setPostData] = useState<PostProp>({
        "content": null,
        "image": null,
    });

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            try {
                const byteArray = await imageToArray(file);
        
                setImage(byteArray);
        
                setPreviewUrl(URL.createObjectURL(file));
              } catch (error) {
                console.error('Error converting image to byte array:', error);
              }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            ...postData,
            "content": content,
            "image": image ? Array.from(image as Uint8Array) : null,
        };

        try {
            await createPost(payload);
            console.log("Post created successfully!");

            setContent("");
            setImage(null);
            setPreviewUrl(null);
            setHasImage(false);
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <>
            <Card>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="controlTextarea">
                        <Form.Control
                            as="textarea"
                            placeholder="What is happening?!"
                            rows={4}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Form.Group>

                    {hasImage && (
                        <>
                            <Form.Group className="mb-3" controlId="controlFile">
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </Form.Group>
                            {previewUrl && (
                                <div className="mb-3">
                                    <img src={previewUrl} alt="Preview" className="img-fluid" />
                                </div>
                            )}
                        </>
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