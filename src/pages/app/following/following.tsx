import { useState, useEffect } from "react";
import type { Profile } from "../../../lib/definitions";
import { getFollowed } from "../../../lib/actions";
import { Button } from "react-bootstrap";
import { GrUser } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

export default function Following() {
    const navigate = useNavigate();
    const [followingList, setFollowingList] = useState<Profile[]>([]);

    useEffect(() => {
        const loadAllFollowing = async () => {
            try {
                const allFollowing = await getFollowed(sessionStorage.getItem("curUn"));
                setFollowingList(allFollowing);
            } catch (error) {
                console.error(error);
            }
        }

        loadAllFollowing();
    }, []);

    return (
        <>
            <div className="space-y-1">
                {followingList.length > 0 ? (
                    followingList.map((following) => (
                        <div
                            className="user-header flex items-center space-x-6 bg-slate-50 p-3 border-2 border-gray-400 rounded-3xl cursor-pointer"
                            onClick={() => navigate(`/profile/${following.username}`)}
                        >
                            {following.profilePicture ? (
                                <img
                                    src={"data:image/jpeg;base64," + following.profilePicture}
                                    alt={`${following.username}'s profile`}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-lg object-cover border-2 border-gray-200">
                                    <GrUser className="h-full w-full text-gray-600 overflow-hidden" />
                                </div>
                            )}
                            <div className="flex flex-col space-y-1">
                                <h1 className="text-2xl font-bold text-gray-800">{following.username}</h1>
                                <p className="text-gray-600">{following.bio}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex justify-center">
                        <p className="text-xl text-grey-700 ">You are not following anyone.</p>
                    </div>
                )}
            </div>
        </>
    );
}