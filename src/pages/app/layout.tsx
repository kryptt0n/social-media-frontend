import { Outlet } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Layout(){
    return (
        <>
        <div>
            <p>this is the layout</p>
            <Button variant="outline-primary">Primary</Button>{' '}
        </div>
            <div>
                <Outlet />
            </div>
        </>
    );
}