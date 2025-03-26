import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { GrGallery, GrClose } from "react-icons/gr";
import { PostProp } from "../../lib/propinterfaces";
import { createPost } from "../../lib/actions";
import { imageToArray } from "../../lib/utils";

interface CreatePostProps {
    onPostCreated: () => void;
}

export default function CreatePost({ onPostCreated }: CreatePostProps) {
    const [content, setContent] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [hasImage, setHasImage] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isFileValid, setIsFileValid] = useState<boolean>(true);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            const allowedExtensions = ["jpg", "jpeg", "png"];
            const fileExtension = file.name.split(".").pop()?.toLowerCase();
            if (!allowedExtensions.includes(fileExtension || "")) {
                setErrorMessage("Invalid file type. Please upload an image file (jpg, jpeg, png).");
                setIsFileValid(false);
                return;
            }


            try {
                const byteArray = await imageToArray(file);
                setImage(file);
                setPreviewUrl(URL.createObjectURL(file));
                setHasImage(true);
                setErrorMessage(null);
                setIsFileValid(true);
            } catch (error) {
                console.error('Error converting image to byte array:', error);
                setIsFileValid(false);
            }
        }
    };

    const handleDeleteImage = () => {
        setImage(null);
        setHasImage(false);
        setPreviewUrl(null);
        setErrorMessage(null);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData: PostProp = {
            post: new Blob([JSON.stringify({ content })], { type: "application/json" }),
            file: image,
        };

        try {
            await createPost(formData);
            console.log("Post created successfully!");

            setContent("");
            setImage(null);
            setPreviewUrl(null);
            setHasImage(false);
            setErrorMessage(null);

            onPostCreated();
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
                        />
                    </Form.Group>

                    {hasImage && (
                        <>
                            {previewUrl && (
                                <>
                                    <div className="mb-1 p-2 position-relative">
                                        <img src={previewUrl} alt="Preview" className="w-full h-auto rounded-lg" />
                                        <GrClose
                                            className="position-absolute top-4 end-4 cursor-pointer text-white bg-gray-700 rounded-full p-2 text-4xl"
                                            onClick={handleDeleteImage}
                                        />
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}


                    <div className="items-center flex justify-between px-6 pb-1">
                        <label className="cursor-pointer text-blue-400">
                            <GrGallery />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                        <Button
                            variant="primary"
                            type="submit"
                            className="rounded-full"
                            disabled={!content && !hasImage}
                        >
                            Post
                        </Button>
                    </div>
                </Form>
            </Card>
        </>
    );
}