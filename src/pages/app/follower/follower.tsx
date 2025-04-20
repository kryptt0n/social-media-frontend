import { useEffect, useState } from "react";
import type { Profile } from "../../../lib/definitions";
import { getFollowers, followUser, unfollowUser } from "../../../lib/actions";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import UserItem from "../../../components/userItem";

export default function Follower() {
    const { username } = useParams<{ username: string }>();
    const navigate = useNavigate();
    const [followerList, setFollowerList] = useState<Profile[]>([]);

    const currentUser = sessionStorage.getItem("curUn");

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
        <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="border-b-2 text-3xl items-center border-sky-600 mb-2 pb-2">{username}'s Followers</h1>
            <div className="space-y-1">
                {followerList.length > 0 ? (
                    followerList.map((follower) => (
                        <UserItem currentUser={currentUser!} userData={follower}/>
                    ))

                ) : (
                    <div className="flex justify-center">
                        <p className="text-xl text-grey-700 ">No followers.</p>
                    </div>
                )}
            </div>
        </div>
    );
}