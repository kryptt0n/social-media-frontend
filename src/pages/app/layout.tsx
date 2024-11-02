import { Outlet } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { Image } from "react-bootstrap";
import { GrHome } from "react-icons/gr";
import { GrSearch } from "react-icons/gr";
import { GrNodes } from "react-icons/gr";
import { GrTooltip } from "react-icons/gr";
import { GrUser } from "react-icons/gr";

export default function Layout() {
    return (
        <>
            <div className="w-[20%] min-w-[150px] ml-auto h-screen">
                <Nav defaultActiveKey="/home" className="flex-column">
                    <Nav.Link href="" className="flex items-center gap-2 h-12"><GrHome />Home</Nav.Link>
                    <Nav.Link eventKey="keyExplore" className="flex items-center gap-2 h-12"><GrSearch />Explore</Nav.Link>
                    <Nav.Link eventKey="keyFollower" className="flex items-center gap-2 h-12"><GrNodes />Follower</Nav.Link>
                    <Nav.Link eventKey="keyNotification" className="flex items-center gap-2 h-12"><GrTooltip />Notification</Nav.Link>
                    <Nav.Link eventKey="keyAccount" className="flex items-center gap-2 h-12"><GrUser />Profile</Nav.Link>
                </Nav>
            </div>
            <div className="w-[40%] min-w-[300px] mr-auto h-screen">
                <Outlet />
            </div>
        </>
    );
}