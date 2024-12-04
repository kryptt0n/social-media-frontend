import { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { UserProp } from "../../../lib/propinterfaces";
import { imageToArray } from "../../../lib/utils";
import { register } from "../../../lib/actions";
import { GrUser } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

export default function RegisterInfo() {
    const [image, setImage] = useState<Uint8Array | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [bio, setBio] = useState<string | null>(null);
    const navigate = useNavigate(); 

    const [userData, setUserData] = useState<UserProp>({
        "username": null,
        "password": null,
        "profilePicture": null,
        "bio": null,
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
            ...userData,
            "username": username,
            "password": password,
            "profilePicture": image ? Array.from(image as Uint8Array) : null,
            "bio": bio,
        }

        try {
            await register(payload);
            console.log("Registered successfully!");

            navigate('/register/fin'); 
        } catch (error) {
            console.error("Error creating post:", error);
        }
    }
    return (
        <>
            <Form className="w-96" onSubmit={handleSubmit}>
                <div className="w-full flex justify-center">
                    {previewUrl ? (
                        <div className="mb-3 w-32 h-32 rounded-full overflow-hidden flex justify-center items-center">
                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div className="mb-3 w-32 h-32 rounded-full bg-gray-200 flex justify-center items-center">
                            <GrUser className="text-4xl text-gray-600" />
                        </div>
                    )}
                </div>


                <Form.Group className="mb-3" controlId="controlFile">
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </Form.Group>


                <Form.FloatingLabel className="mb-3" controlId="formUsername" label="Username">
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.FloatingLabel>

                <Form.FloatingLabel className="mb-3" controlId="formPassword" label="Password">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
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
            </Form>
        </>
    );
}