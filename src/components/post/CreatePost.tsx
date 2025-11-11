import {useState} from "react";
import {Card, Form, Button} from "react-bootstrap";
import {GrGallery, GrClose} from "react-icons/gr";
import {PostProp} from "../../lib/propinterfaces";
import {createPost} from "../../lib/actions";
import {imageToArray} from "../../lib/utils";
import {useAuth} from "../../lib/authContext";
import imageEncoder from "../../lib/imageEncoder";

interface CreatePostProps {
    onPostCreated: () => void;
}

export default function CreatePost({onPostCreated}: CreatePostProps) {
    const [content, setContent] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [hasImage, setHasImage] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const MAX_FILE_SIZE_MB = 5;

    const currentUser = sessionStorage.getItem("curUn");

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const maxSizeBytes = MAX_FILE_SIZE_MB * 1024 * 1024;
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            if (file.size > maxSizeBytes) {
                setErrorMessage(`File is too large! Maximum size is ${MAX_FILE_SIZE_MB}MB.`);
                setImage(null);
                setHasImage(false);
                setPreviewUrl(null);
                return;
            }

            const allowedExtensions = ["jpg", "jpeg", "png"];
            const fileExtension = file.name.split(".").pop()?.toLowerCase();
            if (!allowedExtensions.includes(fileExtension || "")) {
                setErrorMessage("Invalid file type. Please upload an image file (jpg, jpeg, png).");
                return;
            }


            try {
                const byteArray = await imageToArray(file);
                setImage(file);
                setPreviewUrl(URL.createObjectURL(file));
                setHasImage(true);
                setErrorMessage(null);
            } catch (error) {
                console.error('Error converting image to byte array:', error);
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
            username: currentUser!,
            content: content,
            base64Image: image ? await imageEncoder(image) : "",
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
                                    <div className="mb-1 p-2 relative flex justify-center">
                                        <img src={previewUrl} 
                                        alt="Preview" 
                                        className="
                                            max-w-[300px]        
                                            max-h-[200px]        
                                            w-auto
                                            h-auto
                                            object-cover         
                                            rounded-lg
                                            self-center          
                                            cursor-pointer        
                                            shadow-sm"
                                        />
                                        <GrClose
                                            className="position-absolute top-4 end-4 cursor-pointer text-white bg-gray-700 rounded-full p-2 text-4xl"
                                            onClick={handleDeleteImage}/>
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}


                    <div className="items-center flex justify-between px-6 pb-1">
                        <label className="cursor-pointer text-blue-400">
                            <GrGallery/>
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