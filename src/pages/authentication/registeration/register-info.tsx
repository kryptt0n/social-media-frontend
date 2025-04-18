import { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { UserProp } from "../../../lib/propinterfaces";
import { register } from "../../../lib/actions";
import { GrUser } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import imageEncoder from "../../../lib/imageEncoder";
import { User } from "../../../lib/definitions";

export default function RegisterInfo() {
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [bio, setBio] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isFileValid, setIsFileValid] = useState<boolean>(true);
    const [email, setEmail] = useState<string | null>(null);

    const navigate = useNavigate();

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
                setImage(file);
                setPreviewUrl(URL.createObjectURL(file));
                setErrorMessage(null);
                setIsFileValid(true);
            } catch (error) {
                console.error('Error converting image to byte array:', error);
                setErrorMessage("Failed to process the image. Please try again.");
                setIsFileValid(false);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isFileValid) {
            setErrorMessage("Please upload a valid profile.");
            return;
        }

        const formData: UserProp = {
            username: username || "",
            password: password || "",
            email: email || "",
            bio: bio || "",
            base64Image: image ? await imageEncoder(image) : "",
            isPublic: true,
        };

        try {
            await register(formData);
            console.log("Registered successfully!");

            navigate('/register/fin');
        } catch (error) {
            console.error("Error creating post:", error);
        }
    }

    return (
        <>
            <Form className="w-96" onSubmit={handleSubmit}>
                <label className="w-full flex justify-center">
                    {previewUrl ? (
                        <div className="mb-3 w-32 h-32 rounded-full overflow-hidden flex justify-center items-center border-gray-200 border-2">
                            <img src={previewUrl} alt="Profile Preview" className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div className="mb-3 w-32 h-32 rounded-full bg-gray-200 flex justify-center items-center">
                            <GrUser className="text-4xl text-gray-600" />
                        </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>

                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

                <Form.FloatingLabel className="mb-3" controlId="formUsername" label="Username">
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.FloatingLabel>

                <Form.FloatingLabel className="mb-3" controlId="formEmail" label="Email">
                    <Form.Control
                        type="text"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.FloatingLabel>

                <Form.FloatingLabel className="mb-3" controlId="formPassword" label="Password">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.FloatingLabel>

                <Form.FloatingLabel className="mb-3" controlId="formBio" label="Bio">
                    <Form.Control
                        type="text"
                        placeholder="Bio"
                        onChange={(e) => setBio(e.target.value)}
                    />
                </Form.FloatingLabel>

                <div className="d-grid">
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </div>

                <p className="text-sm">Already have an account? <a className="underline" href="/">Login</a></p>

            </Form>
        </>
    );
}