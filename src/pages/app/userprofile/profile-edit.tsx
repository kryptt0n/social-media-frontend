import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Image } from "react-bootstrap";

export function ProfileEdit() {
    return (
        <>
            <Form className="w-96">

                <Image className="mb-3" src="https://robohash.org/demouser" roundedCircle />

                <Form.FloatingLabel controlId="formEmail" label="Email address" className="mb-3" >
                    <Form.Control type="email" placeholder="Email address" value="demo@user.com" readOnly />
                </Form.FloatingLabel>

                <Form.FloatingLabel className="mb-3" controlId="formUsername" label="Username">
                    <Form.Control type="text" placeholder="Username" value="Demouser" />
                </Form.FloatingLabel>

                <Form.FloatingLabel className="mb-3" controlId="formDob" label="Date of birth">
                    <Form.Control type="date" placeholder="Date of birth" value="1993-09-15" />
                </Form.FloatingLabel>

                <div className="d-grid gap-1">
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                    <Button variant="warning" type="button">
                        Reset Password
                    </Button>
                </div>
            </Form>
        </>
    );
}