import { Button } from "react-bootstrap";

export default function ResetFinish(){
    return (
        <div className="w-96">
        <p className="text-center text-lg font-bold">Your password has been reset!</p>
        <div className="d-grid">
            <Button variant="primary" type="button" href="/">
                Login
            </Button>
        </div>
    </div>
    );
}