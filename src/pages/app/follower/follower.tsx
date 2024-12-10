import { useEffect, useState } from "react";
import type { Profile } from "../../../lib/definitions";
import { Button, Image } from "react-bootstrap";
import { getFollowers } from "../../../lib/actions";
import { GrUser } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Follower() {
    const { username } = useParams<{ username: string }>();
    const navigate = useNavigate();
    const [followerList, setFollowerList] = useState<Profile[]>([]);

    useEffect(() => {
        const loadAllFollower = async () => {
            try {
                if (username) {
                    const allFollower = await getFollowers(username);
                    setFollowerList(allFollower);
                }
            } catch (error) {
                console.error(error);
            }
        }

        loadAllFollower();
    }, []);

    return (
        <>
            <h1 className="border-b-2 text-3xl items-center border-sky-600 mb-2 pb-2">{username}'s Followers</h1>
            <div className="space-y-1">
                {followerList.length > 0 ? (
                    followerList.map((follower) => (
                        <div
                            className="user-header flex items-center space-x-6 bg-slate-50 p-3 border-2 border-gray-400 rounded-md cursor-pointer"
                            onClick={() => navigate(`/profile/${follower.username}`)}
                        >
                            {follower.profilePicture ? (
                                <img
                                    src={"data:image/jpeg;base64," + follower.profilePicture}
                                    alt={`${follower.username}'s profile`}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-lg object-cover border-2 border-gray-200">
                                    <GrUser className="h-full w-full text-gray-600 overflow-hidden" />
                                </div>
                            )}
                            <div className="flex flex-col space-y-1">
                                <h1 className="text-2xl font-bold text-gray-800">{follower.username}</h1>
                                <p className="text-gray-600">{follower.bio}</p>
                            </div>
                        </div>
                    ))

                ) : (
                    <div className="flex justify-center">
                        <p className="text-xl text-grey-700 ">No followers.</p>
                    </div>
                )}
            </div>
        </>
    );
}