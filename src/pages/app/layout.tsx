import { Outlet } from "react-router-dom";

export default function Layout(){
    return (
        <>
        <div>
            <p>this is the layout</p>
        </div>
            <div>
                <Outlet />
            </div>
        </>
    );
}