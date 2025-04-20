import { Outlet, useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { GrHome, GrUser, GrStatusGood, GrLogout } from "react-icons/gr";
import { removeCookie } from 'typescript-cookie';
import {useAuth} from "../../lib/authContext";

export default function AdminLayout() {
    const navigate = useNavigate();

    const auth = useAuth();

    const handleLogout = () => {
        auth.logout();
        navigate("/");
    };

    return (
        <>
            <div className="flex h-screen w-full">
                {/* Admin Sidebar - Wider */}
                <div className="w-[20%] sm:w-[18%] lg:w-[15%] h-full text-xl border-r-2 border-gray-100 fixed top-0 left-0 overflow-hidden bg-white pt-10">
                    <Nav defaultActiveKey="/admin/dashboard" className="flex-column gap-3">
                        <Nav.Link href="/admin/dashboard" className="flex items-center gap-2 h-12 hover:bg-slate-200 rounded-full px-4">
                            <GrHome />
                            <p className="sm:block hidden">Dashboard</p>
                        </Nav.Link>
                        <Nav.Link href="/admin/users" className="flex items-center gap-2 h-12 hover:bg-slate-200 rounded-full px-4">
                            <GrUser />
                            <p className="sm:block hidden">Users</p>
                        </Nav.Link>
                        <Nav.Link href="/admin/reported-posts" className="flex items-center gap-2 h-12 hover:bg-slate-200 rounded-full px-4">
                            <GrStatusGood />
                            <p className="sm:block hidden">Reported Posts</p>
                        </Nav.Link>
                        <Nav.Link
                            as="button"
                            className="flex items-center gap-2 h-12 hover:bg-red-100 text-red-600 rounded-full cursor-pointer px-4"
                            onClick={handleLogout}
                        >
                            <GrLogout />
                            <p className="sm:block hidden">Logout</p>
                        </Nav.Link>
                    </Nav>
                </div>

                {/* Admin Content - Takes More Space */}
                <div className="flex-1 ml-[20%] sm:ml-[18%] lg:ml-[15%] px-10 pt-10 min-w-96">
                    <Outlet /> {/* 🚀 This renders admin pages dynamically */}
                </div>
            </div>
        </>
    );
}
