import { Button } from "react-bootstrap";

export default function RegisterFinish() {
    return (
        <div className="w-96">
            <p className="text-center text-lg font-bold">Congratulations! You have registered!</p>
            <div className="d-grid">
                <Button variant="primary" type="button" href="/">
                    Login
                </Button>
            </div>
        </div>
    );
}