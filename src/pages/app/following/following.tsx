import { useState, useEffect } from "react";
import type { Profile } from "../../../lib/definitions";
import { getFollowed } from "../../../lib/actions";
import { Button } from "react-bootstrap";
import { GrUser } from "react-icons/gr";

export default function Following() {
    const [followingList, setFollowingList] = useState<Profile[]>([]);

    useEffect(() => {
        const loadAllFollowing = async () => {
            try {
                const allFollowing = await getFollowed(localStorage.getItem("curUn"));
                setFollowingList(allFollowing);
            } catch (error) {
                console.error(error);
            }
        }

        loadAllFollowing();
    }, []);

    return (
        <>
            <div>
                {followingList.length > 0 ? (
                    followingList.map((following) => (
                        <div className="user-header flex items-center space-x-6 bg-slate-50 p-6">
                            {following.profilePicture ? (
                                <img
                                    src={"data:image/jpeg;base64," + following.profilePicture}
                                    alt={`${following.username}'s profile`}
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-lg object-cover border-2 border-gray-200">
                                    <GrUser className="h-full w-full text-gray-600 overflow-hidden" />
                                </div>
                            )}
                            <div className="flex flex-col space-y-2 w-full">
                                <div className="flex justify-between w-full">
                                    <h1 className="text-2xl font-bold text-gray-800">{following.username}</h1>
                                    <button
                                        className="follow-button px-4 py-1 text-white bg-blue-500 rounded-full hover:bg-blue-600"
                                    >
                                        {following.isFollowed ? "Unfollow" : "Follow"}
                                    </button>
                                </div>

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