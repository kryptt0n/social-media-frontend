import { Outlet } from "react-router-dom";
import { Button } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function Layout() {
    return (
        <>
            <div>
                <p>This is navbar</p>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    );
}