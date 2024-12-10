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
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isFileValid, setIsFileValid] = useState<boolean>(true);

    const [postData, setPostData] = useState<PostProp>({
        "content": null,
        "image": null,
    });

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            const allowedExtensions = ["jpg", "jpeg", "png"];
            const maxFileSize = 50 * 1024;
            const fileExtension = file.name.split(".").pop()?.toLowerCase();
            if (!allowedExtensions.includes(fileExtension || "")) {
                setErrorMessage("Invalid file type. Please upload an image file (jpg, jpeg, png).");
                setIsFileValid(false); 
                return;
            }
            if (file.size > maxFileSize) {
                setErrorMessage("File size too large. Please upload a smaller file.");
                setIsFileValid(false);
                return;
            }

            try {
                const byteArray = await imageToArray(file);
                setImage(byteArray);
                setPreviewUrl(URL.createObjectURL(file));
                setErrorMessage(null);
                setIsFileValid(true);
            } catch (error) {
                console.error('Error converting image to byte array:', error);
                setIsFileValid(false);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (hasImage && (!isFileValid || !image)) {
            setErrorMessage("Please upload a valid image file before submitting.");
            return;
        }

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
            setErrorMessage(null);
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <>
            <Card>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-1" controlId="controlTextarea">
                        <Form.Control
                            as="textarea"
                            placeholder="What is happening?!"
                            rows={3}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {hasImage && (
                        <>
                            <Form.Group className="mb-1 px-5" controlId="controlFile">
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </Form.Group>
                            {previewUrl && (
                                <div className="mb-1 p-5">
                                    <img src={previewUrl} alt="Preview" className="img-fluid" />
                                </div>
                            )}
                        </>
                    )}

                    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}


                    <div className="items-center flex justify-between px-6 pb-1">
                        <GrGallery
                            className="cursor-pointer"
                            onClick={() => {
                                setHasImage(!hasImage);
                                if (hasImage) {
                                    setImage(null);
                                    setPreviewUrl(null);
                                    setErrorMessage(null);
                                }
                            }}
                        />
                        <Button variant="primary" type="submit" className="rounded-full">
                            Post
                        </Button>
                    </div>
                </Form>
            </Card>
        </>
    );
}