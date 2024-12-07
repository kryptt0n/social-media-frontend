import { useState, useEffect } from "react";
import type { User, Post, Profile } from "../../../lib/definitions";
import { getUser, getUserPosts, followUser, unfollowUser } from "../../../lib/actions";
import PostItem from "../../../components/post/PostComponent";
import { useParams } from "react-router-dom";
import { GrUser } from 'react-icons/gr';

export default function UserProfile() {
    const { username } = useParams<{ username: string }>();
    const [postList, setPostList] = useState<Post[]>([]);
    const [user, setUser] = useState<Profile>(
        {
            username: "",
            profilePicture: null,
            bio: "",
            isFollowed: false,
        }
    );

    useEffect(() => {
        const loadProfile = async () => {
            try {
                if (username) {
                    const profile = await getUser(username);
                    setUser(profile);
                }
            } catch (error) {
                console.error(error);
            }
        }

        const loadAllPosts = async () => {
            try {
                if (username) {
                    const allPosts = await getUserPosts(username);
                    setPostList(allPosts);
                }
            } catch (error) {
                console.error(error);
            }
        }

        loadProfile();
        loadAllPosts();
    }, [username]);

    const handleFollowClick = async () => {
        try {
            if (username) {
                if (user.isFollowed) {
                    await unfollowUser(username);
                    setUser(prevUser => ({ ...prevUser, isFollowed: false }));
                } else {
                    await followUser(username);
                    setUser(prevUser => ({ ...prevUser, isFollowed: true }));
                }
            }
        } catch (error) {
            console.error('Error following:', error);
        }
    };

    const handlePostDeleted = (postId: number) => {
        setPostList(prevPosts => prevPosts.filter(post => post.id !== postId));
    };

    return (
        <div className="user-profile-container max-w-4xl mx-auto p-4 space-y-6">
            <div className="user-header flex items-center space-x-6 bg-slate-50 p-6 border-b-4 border-teal-600">
                {user.profilePicture ? (
                    <img
                        src={"data:image/jpeg;base64," + user.profilePicture}
                        alt={`${user.username}'s profile`}
                        className="w-24 h-24 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-24 h-24 rounded-lg object-cover border-2 border-gray-200 flex items-center justify-center aspect-square">
                        <GrUser className="h-full w-full text-gray-600 p-1" />
                    </div>
                )}
                <div className="flex flex-col space-y-2 w-full">
                    <div className="flex justify-between w-full">
                        <h1 className="text-2xl font-bold text-gray-800">{user.username}</h1>
                        {(user.username !== sessionStorage.getItem("curUn")) && (
                            <button
                                className="follow-button px-4 py-1 text-white bg-blue-500 rounded-full hover:bg-blue-600"
                                onClick={handleFollowClick}
                            >
                                {user.isFollowed ? "Unfollow" : "Follow"}
                            </button>
                        )}

                    </div>

                    <p className="text-gray-600">{user.bio}</p>

                </div>
            </div>

            <div className="user-posts space-y-2">
                {postList.length > 0 ? (
                    postList.map((post) => <PostItem key={post.id} postData={post} allowDelete={true} onPostDeleted={handlePostDeleted} />)
                ) : (
                    <div className="no-posts text-center mt-10">
                        <p className="text-xl text-gray-700">This account doesn't have any posts.</p>
                    </div>
                )}
            </div>
        </div>
    );
}