import { Outlet } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { GrHome, GrSearch, GrNodes, GrUser, GrStatusGood, GrLogout } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { removeCookie } from 'typescript-cookie';

export default function Layout() {
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.clear();
        removeCookie('token');
        navigate("/");
    };

    const links = [
        {
            href: "/home",
            text: "Home",
            icon: <GrHome />,
        },
        {
            href: "/explore",
            text: "Explore",
            icon: <GrSearch />,
        },
        {
            href: `/follower/${sessionStorage.getItem("curUn")}`,
            text: "Follower",
            icon: <GrNodes />,
        },
        {
            href: `/following/${sessionStorage.getItem("curUn")}`,
            text: "Following",
            icon: <GrStatusGood />,
        },
        {
            href: `/profile/${sessionStorage.getItem("curUn")}`,
            text: "Profile",
            icon: <GrUser />,
        },
    ]

    return (
        <>
            <div className="flex h-screen w-full">
                <div className="flex-column space-y-5 w-[17.5%] h-screen text-xl border-r-2 border-gray-100 fixed top-0 overflow-hidden bg-[#e2e9ee] pt-10 px-1" >
                    <Nav defaultActiveKey="/home" className="flex-column gap-3">

                        {links.map(({ href, text, icon }) => (
                            <Nav.Link key={href} href={href} className="flex items-center gap-2 h-12 hover:bg-blue-500 hover:text-white rounded-full py-2 justify-center md:justify-normal px-4 text-2xl md:text-lg lg:text-2xl overflow-hidden transition-all duration-300 ">
                                {icon} <span className="md:block hidden overflow-hidden">{text}</span>
                            </Nav.Link>
                        ))}

                        <Nav.Link
                            as="button"
                            className="flex items-center gap-2 h-12 hover:bg-blue-500 hover:text-white rounded-full py-2 justify-center md:justify-normal px-4 text-2xl md:text-lg lg:text-2xl overflow-hidden transition-all duration-300 text-red-400" onClick={handleLogout}
                        >
                            <GrLogout /><p className="md:block hidden overflow-hidden">Logout</p>
                        </Nav.Link>
                    </Nav>
                </div>
                <div className="flex-1 transition-all duration-300 ml-[17.5%] px-4 pt-10">
                    <Outlet />
                </div>
            </div >
        </>
    );
}