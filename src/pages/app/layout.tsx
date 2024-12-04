import { Outlet } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { GrHome } from "react-icons/gr";
import { GrSearch } from "react-icons/gr";
import { GrNodes } from "react-icons/gr";
import { GrTooltip } from "react-icons/gr";
import { GrUser } from "react-icons/gr";

export default function Layout() {
    return (
        <>
            <div className="flex pt-10">
                <div className="w-[20%] min-w-[150px] ml-auto mr-1 h-screen text-xl border-r-2 border-gray-100">                 
                    <Nav defaultActiveKey="/home" className="flex-column gap-3">
                        <Nav.Link href="/home" className="flex items-center gap-2 h-12"><GrHome />Home</Nav.Link>
                        <Nav.Link href="/explore" className="flex items-center gap-2 h-12"><GrSearch />Explore</Nav.Link>
                        <Nav.Link href="/follower" className="flex items-center gap-2 h-12"><GrNodes />Follower</Nav.Link>
                        <Nav.Link href="/notification" className="flex items-center gap-2 h-12"><GrTooltip />Notification</Nav.Link>
                        <Nav.Link href="/profile" className="flex items-center gap-2 h-12"><GrUser />Profile</Nav.Link>
                    </Nav>
                </div>
                <div className="w-[40%] min-w-[300px] mr-auto ml-1 h-screen">
                    <Outlet />
                </div>
            </div>
        </>
    );
}