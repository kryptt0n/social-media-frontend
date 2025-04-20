import { useState, useEffect } from "react";
import type { Profile } from "../../../lib/definitions";
import { getFollowed, followUser, unfollowUser } from "../../../lib/actions";
import { Button } from "react-bootstrap";
import { GrUser } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import FollowComponent from "../../../components/follow";
import UserItem from "../../../components/userItem";

export default function Following() {
    const { username } = useParams<{ username: string }>();
    const navigate = useNavigate();
    const [followingList, setFollowingList] = useState<Profile[]>([]);
    const currentUser = sessionStorage.getItem("curUn");

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

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="border-b-2 text-3xl items-center border-sky-600 mb-2 pb-2">{username}'s Following</h1>
            <div className="space-y-1">
                {followingList.length > 0 ? (
                    followingList.map((following) => (
                        <UserItem currentUser={currentUser!} userData={following}/>
                    ))
                ) : (
                    <div className="flex justify-center">
                        <p className="text-xl text-grey-700 ">Not following anyone.</p>
                    </div>
                )}
            </div>
        </div>
    );
}