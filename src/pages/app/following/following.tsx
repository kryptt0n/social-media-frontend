import { useState, useEffect } from "react";
import type { Profile } from "../../../lib/definitions";
import { getFollowed, followUser, unfollowUser } from "../../../lib/actions";
import { Button } from "react-bootstrap";
import { GrUser } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Following() {
    const { username } = useParams<{ username: string }>();
    const navigate = useNavigate();
    const [followingList, setFollowingList] = useState<Profile[]>([]);

    useEffect(() => {
        const loadAllFollowing = async () => {
            try {
                if (username) {
                    const allFollowing = await getFollowed(username);
                    setFollowingList(allFollowing);
                }
            } catch (error) {
                console.error(error);
            }
        }

        loadAllFollowing();
    }, []);

    const handleFollowToggle = async (following: Profile) => {
        try {
            if (following.isFollowed) {
                await unfollowUser(following.username);
            } else {
                await followUser(following.username);
            }
            setFollowingList((prev) =>
                prev.map((user) =>
                    user.username === following.username
                        ? { ...user, isFollowed: !user.isFollowed }
                        : user
                )
            );
        } catch (error) {
            console.error("Error updating follow status:", error);
        }
    };

    return (
        <>
            <h1 className="border-b-2 text-3xl items-center border-sky-600 mb-2 pb-2">{username}'s Following</h1>
            <div className="space-y-1">
                {followingList.length > 0 ? (
                    followingList.map((following) => (
                        <div className="user-header flex items-center justify-between bg-slate-50 p-3 border-2 border-gray-400 rounded-md cursor-pointer hover:bg-slate-200"   >
                            <div
                                className="space-x-6 flex"
                                onClick={() => navigate(`/profile/${following.username}`)}
                            >
                                {following.imageUrl ? (
                                    <img
                                        src={following.imageUrl.toString()}
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
                            <div>
                                {(following.username !== sessionStorage.getItem("curUn")) && (
                                    <button
                                        className="follow-button px-4 py-1 text-white bg-blue-500 rounded-full hover:bg-blue-600"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleFollowToggle(following);
                                        }}
                                    >
                                        {following.isFollowed ? "Unfollow" : "Follow"}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex justify-center">
                        <p className="text-xl text-grey-700 ">Not following anyone.</p>
                    </div>
                )}
            </div>
        </>
    );
}