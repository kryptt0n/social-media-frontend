import {useEffect, useState} from "react";
import {isFollowed, followUser, unfollowUser} from "../lib/actions";
import {FollowProp} from "../lib/propinterfaces";

interface FollowProps {
    currentUser: string,
    userToFollow: string,
    onFollowed: (userId: string) => void,
    onUnFollowed: (userId: string) => void,
}

export default function FollowComponent({currentUser, userToFollow, onUnFollowed, onFollowed}: FollowProps) {

    const [followed, setFollowed] = useState<boolean>(false);

    useEffect(() => {
        const getIsFollowed = async (): Promise<void> => {
            if (!currentUser) return;
            try {
                const response = await isFollowed(currentUser, userToFollow);
                setFollowed(response);
            } catch (error) {
                console.error('Errsor checking follow status', error);
            }
        };

        getIsFollowed();
    }, [currentUser, userToFollow]);


    const follow = async () =>{
        const followForm: FollowProp = {
            followerName: currentUser,
            followedName: userToFollow,
        }

        try{
            await followUser(followForm);
            setFollowed(true);
            onFollowed(userToFollow);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    const unFollow = async () => {
        const followForm: FollowProp = {
            followerName: currentUser,
            followedName: userToFollow,
        };

        try {
            await unfollowUser(followForm);
            setFollowed(false);
            onUnFollowed(userToFollow);
        } catch (error: any) {
            console.error('Unfollow failed:', error);
        }
    }


    return (
        <>
            <button
                type="button"
                className="bg-blue-700 font-semibold text-lg text-white disabled:bg-[#0d1124] rounded-full p-1"
                onClick={followed ? unFollow : follow}
            >
                {followed ? "Unfollow" : "Follow"}
            </button>
        </>
    )
}
