import { useState, useEffect } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { AuthMethod, type Profile } from "../../../lib/definitions";
import { deactivateUser, deleteUser, getUserProfile, oauthLink, recoverUser, retrieveAuthMethods, updateUser } from "../../../lib/actions";
import { GrUser } from "react-icons/gr";
// import { redirect } from "react-router-dom";
import { useAuth } from "../../../lib/authContext";
import {UpdateProp} from "../../../lib/propinterfaces";
import imageEncoder from "../../../lib/imageEncoder";
import {useNavigate} from "react-router-dom";

export default function ProfileEdit() {
    const [profile, setProfile] = useState<Profile>({} as Profile);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const currentUser = sessionStorage.getItem("curUn");
    const [authMethods, setAuthMethods] = useState<AuthMethod[]>([])
    const [authMethodsLoading, setAuthMethodsLoading] = useState<boolean>(true);


    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isFileValid, setIsFileValid] = useState<boolean>(true);

    const navigate = useNavigate();

    const reloadPage = () => {
        window.location.reload();
    };

    const auth = useAuth();

    useEffect(() => {
        const fetchProfile = async () => {
            if (currentUser) {
                const response = await getUserProfile(currentUser!);
                setProfile(response);
            }
        }

        const fetchAuthMethods = async() => {
            try {
                const authMethodsFetched = await retrieveAuthMethods();
                setAuthMethods(authMethodsFetched);
                console.log("Fetched auth methods:", authMethodsFetched);
            } catch (error) {
                console.error("Failed to fetch auth methods:", error);
            } finally {
                setAuthMethodsLoading(false);
            }

        }

        fetchProfile();
        fetchAuthMethods();
    }, []);

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

        const formData: UpdateProp = {
            base64Image: image ? await imageEncoder(image) : "",
            bio: profile.bio,
        };

        try {
            await updateUser(currentUser!, formData);
            reloadPage();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // const handleTogglePublic = async () => {
    //     if (profile.isPublic) {
    //         await setPrivate();
    //     } else {
    //         await setPublic();
    //     }
    //     reloadPage();
    // }

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account? You will lose all your data. This action cannot be undone.");
        if (confirmDelete) {
            await deleteUser(currentUser!);
            sessionStorage.clear();
            navigate("/");
        }
    }

    const renderAuthMethodAction = (method: AuthMethod) => {
        if (method.type === "PASSWORD") {
            if (method.enabled) {
                return (
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => navigate("/forgot-password")}
                    >
                        Change Password
                    </Button>
                );
            }

            if (method.canAdd) {
                return (
                    <Button variant="primary" size="sm" onClick={handleAddPassword}>
                        Set Password
                    </Button>
                );
            }
        }

        if (method.type === "OAUTH" && method.provider === "google-oauth2") {
            if (method.enabled) {
                return (
                    <Badge bg="success" pill>
                        Linked
                    </Badge>
                );
            }

            if (method.canAdd) {
                return (
                    <Button variant="outline-dark" size="sm" onClick={handleLinkGoogle}>
                        Link Google
                    </Button>
                );
            }
        }

        return null;
    };

    const renderAuthMethodLabel = (method: AuthMethod) => {
        if (method.type === "PASSWORD") return "Password";
        if (method.type === "OAUTH" && method.provider === "google-oauth2") return "Google";
        return method.provider || method.type;
    };

    const renderAuthMethodStatus = (method: AuthMethod) => {
        return method.enabled ? "Enabled" : "Not enabled";
    };

    const handleAddPassword = () => {
        navigate("/set-password");
    };

    const handleLinkGoogle = () => {
        oauthLink("google");
    };


    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Form className="w-96 mx-auto p-4 bg-white"
                onSubmit={handleSubmit}
            >
                <label className="w-full flex justify-center mb-3">
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt={`${profile.username}'s profile`}
                            className="w-24 h-24 rounded-full object-cover mx-auto"
                        />
                    ) : profile.imageUrl ? (
                        <img
                            src={profile.imageUrl}
                            alt={`${profile.username}'s profile`}
                            className="w-24 h-24 rounded-full object-cover mx-auto"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full border-2 border-gray-200 flex items-center justify-center bg-slate-100 mx-auto">
                            <GrUser className="h-12 w-12 text-gray-600" />
                        </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />

                </label>
                {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

                <Form.FloatingLabel className="mb-3" controlId="formUsername" label="Username">
                    <Form.Control type="text" placeholder="Username" required disabled value={profile.username} />
                </Form.FloatingLabel>

                <Form.FloatingLabel className="mb-3" controlId="formBio" label="Bio">
                    <Form.Control
                        type="text"
                        placeholder="Bio"
                        value={profile.bio}
                        onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                    />
                </Form.FloatingLabel>

                <Card className="mb-4">
                    <Card.Body>
                        <Card.Title className="text-lg mb-3">Sign-in Methods</Card.Title>

                        {authMethodsLoading ? (
                            <p className="text-sm text-gray-500 mb-0">Loading sign-in methods...</p>
                        ) : authMethods.length === 0 ? (
                            <p className="text-sm text-gray-500 mb-0">No sign-in methods found.</p>
                        ) : (
                            <div className="space-y-3">
                                {authMethods.map((method, index) => (
                                    <div
                                        key={`${method.type}-${method.provider ?? "local"}-${index}`}
                                        className="flex items-center justify-between border rounded p-3"
                                    >
                                        <div>
                                            <div className="font-medium">
                                                {renderAuthMethodLabel(method)}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {renderAuthMethodStatus(method)}
                                            </div>
                                        </div>

                                        <div>
                                            {renderAuthMethodAction(method)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card.Body>
                </Card>

                <div className="flex flex-col space-y-2 mt-4">
                    <Button variant="primary" type="submit">Update</Button>
                    {/*<Button variant="secondary" type="button" onClick={handleTogglePublic}>*/}
                    {/*    {profile.isPublic ? "Switch to Private" : "Switch to Public"}*/}
                    {/*</Button>*/}
                    {/*<Button variant="warning" type="button" onClick={handleToggleActive}>*/}
                    {/*    {profile.isActive ? "Lock Account" : "Recover Account"}*/}
                    {/*</Button>*/}
                    <Button variant="danger" type="button" onClick={handleDelete}>
                        Delete Account
                    </Button>
                </div>
            </Form>
        </div>
    );
}