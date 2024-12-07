import { Outlet } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { GrHome, GrSearch, GrNodes, GrUser, GrStatusGood, GrLogout } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

export default function Layout() {
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        document.cookie = "session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        navigate("/");
    };

    return (
        <>
            <div className="flex h-screen sm:px-[20%]">
                <div className="w-[15%] h-full text-xl border-r-2 border-gray-100 fixed top-0 sm:left-[20%] overflow-hidden bg-white pt-10">
                    <Nav defaultActiveKey="/home" className="flex-column gap-3">
                        <Nav.Link href="/home" className="flex items-center gap-2 h-12 hover:bg-slate-200 rounded-full"><GrHome />Home</Nav.Link>
                        <Nav.Link href="/explore" className="flex items-center gap-2 h-12 hover:bg-slate-200 rounded-full"><GrSearch />Explore</Nav.Link>
                        <Nav.Link href="/follower" className="flex items-center gap-2 h-12 hover:bg-slate-200 rounded-full"><GrNodes />Follower</Nav.Link>
                        <Nav.Link href="/following" className="flex items-center gap-2 h-12 hover:bg-slate-200 rounded-full"><GrStatusGood />Following</Nav.Link>
                        {/* <Nav.Link href="/notification" className="flex items-center gap-2 h-12 hover:bg-slate-200 rounded-lg"><GrTooltip />Messages</Nav.Link> */}
                        <Nav.Link href={`/profile/${sessionStorage.getItem("curUn")}`} className="flex items-center gap-2 h-12 hover:bg-slate-200 rounded-full"><GrUser />Profile</Nav.Link>
                        <Nav.Link
                            as="button"
                            className="flex items-center gap-2 h-12 hover:bg-red-100 text-red-600 rounded-full cursor-pointer"
                            onClick={handleLogout}
                        >
                            <GrLogout />Logout
                        </Nav.Link>
                    </Nav>
                </div>
                <div className="flex-1 sm:ml-[36%] ml-[20%] mr-[20%] pt-10 min-w-96">
                    <Outlet />
                </div>
            </div>
        </>
    );
}