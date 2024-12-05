import { Outlet } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { GrHome, GrSearch, GrNodes, GrTooltip, GrUser, GrStatusGood } from "react-icons/gr";


export default function Layout() {
    return (
        <>
            <div className="flex h-screen sm:px-[15%]">
                <div className="w-[20%] h-full text-xl border-r-2 border-gray-100 fixed top-0 sm:left-[20%] overflow-hidden bg-white mt-10">
                    <Nav defaultActiveKey="/home" className="flex-column gap-3">
                        <Nav.Link href="/home" className="flex items-center gap-2 h-12 hover:bg-slate-200 rounded-lg"><GrHome />Home</Nav.Link>
                        <Nav.Link href="/explore" className="flex items-center gap-2 h-12 hover:bg-slate-200 rounded-lg"><GrSearch />Explore</Nav.Link>
                        <Nav.Link href="/follower" className="flex items-center gap-2 h-12 hover:bg-slate-200 rounded-lg"><GrNodes />Follower</Nav.Link>
                        <Nav.Link href="/following" className="flex items-center gap-2 h-12 hover:bg-slate-200 rounded-lg"><GrStatusGood />Following</Nav.Link>
                        {/* <Nav.Link href="/notification" className="flex items-center gap-2 h-12 hover:bg-slate-200 rounded-lg"><GrTooltip />Messages</Nav.Link> */}
                        <Nav.Link href={`/profile/${localStorage.getItem("curUn")}`} className="flex items-center gap-2 h-12 hover:bg-slate-200 rounded-lg"><GrUser />Profile</Nav.Link>
                    </Nav>
                </div>
                <div className="flex-1 sm:ml-[36%] ml-[20%] mt-10">
                    <Outlet />
                </div>
            </div>
        </>
    );
}