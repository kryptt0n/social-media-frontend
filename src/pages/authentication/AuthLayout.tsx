import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="flex justify-center my-auto pt-10">
            <Outlet />
        </div>
    )
}