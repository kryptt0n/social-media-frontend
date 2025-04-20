import {useState} from "react";
import {Profile} from "../lib/definitions";
import {useNavigate} from "react-router-dom";
import {GrUser} from "react-icons/gr";
import FollowComponent from "./follow";

interface UserItemProps {
    userData: Profile;
    currentUser: string,
}

export default function UserItem({userData, currentUser}: UserItemProps) {
    const [isFollowed, setIsFollowed] = useState<boolean>(false);
    const [followersCount, setFollowersCount] = useState<number>(userData.followerCount);
    const navigate = useNavigate();

    const handleFollowToggle = () => {
        setIsFollowed(!isFollowed);
        setFollowersCount(isFollowed ? followersCount - 1 : followersCount + 1);
    };

    return (
        <div className="user-header flex items-center justify-between bg-slate-50 p-3 border-2 border-gray-400 rounded-md cursor-pointer" >
            <div
                className="space-x-6 flex"
                onClick={() => navigate(`/profile/${userData.username}`)}
            >
                {userData.imageUrl ? (
                    <img
                        src={userData.imageUrl}
                        alt={`${userData.username}'s profile`}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-lg object-cover border-2 border-gray-200">
                        <GrUser className="h-full w-full text-gray-600 overflow-hidden" />
                    </div>
                )}
                <div className="flex flex-col space-y-1">
                    <h1 className="text-2xl font-bold text-gray-800">{userData.username}</h1>
                    <p className="text-gray-600">{userData.bio}</p>
                </div>
            </div>
            <div>
                <FollowComponent currentUser={currentUser} userToFollow={userData.username} onUnFollowed={handleFollowToggle} onFollowed={handleFollowToggle}/>
            </div>
        </div>
    );
}
