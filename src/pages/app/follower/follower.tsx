import { useEffect, useState } from "react";
import type { Profile } from "../../../lib/definitions";
import { Button, Image } from "react-bootstrap";
import { getFollowers } from "../../../lib/actions";
import { GrUser } from "react-icons/gr";

export default function Follower() {
    const [followerList, setFollowerList] = useState<Profile[]>([]);

    useEffect(() => {
        const loadAllFollower = async () => {
            try {
                const allFollower = await getFollowers(localStorage.getItem("curUn"));
                setFollowerList(allFollower);
            } catch (error) {
                console.error(error);
            }
        }

        loadAllFollower();
    }, []);

    return (
        <>
            <div>
                {followerList.length > 0 ? (
                    followerList.map((follower) => (
                        <div className="user-header flex items-center space-x-6 bg-slate-50 p-6">
                            {follower.profilePicture ? (
                                <img
                                    src={"data:image/jpeg;base64," + follower.profilePicture}
                                    alt={`${follower.username}'s profile`}
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-lg object-cover border-2 border-gray-200">
                                    <GrUser className="h-full w-full text-gray-600 overflow-hidden" />
                                </div>
                            )}
                            <div className="flex flex-col space-y-2 w-full">
                                <div className="flex justify-between w-full">
                                    <h1 className="text-2xl font-bold text-gray-800">{follower.username}</h1>
                                    <button
                                        className="follow-button px-4 py-1 text-white bg-blue-500 rounded-full hover:bg-blue-600"
                                    >
                                        {follower.isFollowed ? "Unfollow" : "Follow"}
                                    </button>
                                </div>

                                <p className="text-gray-600">{follower.bio}</p>
                            </div>
                        </div>
                    ))

                ) : (
                    <div className="flex justify-center">
                        <p className="text-xl text-grey-700 ">You don't have followers.</p>
                    </div>
                )}
            </div>
        </>
    );
}