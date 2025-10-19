import {useState, useEffect} from "react";
import type {Post, Profile} from "../../../lib/definitions";
import {getUserPosts, followUser, unfollowUser, getUserProfile} from "../../../lib/actions";
import PostItem from "../../../components/post/PostComponent";
import {useParams} from "react-router-dom";
import {GrUser} from 'react-icons/gr';
import {useNavigate} from "react-router-dom";
import FollowComponent from "../../../components/follow";

export default function UserProfile() {
    const {username} = useParams<{ username: string }>();
    const [postList, setPostList] = useState<Post[]>([]);
    const navigate = useNavigate();
    const [profile, setProfile] = useState<Profile>({} as Profile);
    const [page, setPage] = useState(0);
    // const [totalPages, setTotalPages] = useState(0);

    const currentUser = sessionStorage.getItem("curUn");

    useEffect(() => {
        loadProfile();
        loadUserPosts(page);
    }, [username, page]);

    const loadProfile = async () => {
        try {
            if (username) {
                const profile = await getUserProfile(username);
                setProfile(profile);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const loadUserPosts = async (pageNumber: number) => {
        try {
            const response = await getUserPosts(username!, pageNumber);
            setPostList(response.posts);
        } catch (error) {
            console.error(error);
        }
    };

    const handlePostDeleted = (postId: number) => {
        setPostList(prevPosts => prevPosts.filter(post => post.postId !== postId));
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleFollow = () => {
        setProfile((prev) => (prev ? { ...prev, isFollowed: true, followersCount: prev.followerCount + 1 } : prev));
    };

    const handleUnfollow = () => {
        setProfile((prev) => (prev ? { ...prev, isFollowed: false, followersCount: prev.followerCount - 1 } : prev));
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center space-x-6 p-6 border-b-4 rounded-md border-sky-600 bg-stone-200">
                {profile.imageUrl ? (
                    <img
                        src={profile.imageUrl.toString()}
                        alt={`${profile.username}'s profile`}
                        className="w-24 h-24 rounded-full object-cover"
                    />
                ) : (
                    <div
                        className="w-24 h-24 rounded-lg object-cover border-2 border-gray-200 flex items-center justify-center aspect-square bg-slate-100">
                        <GrUser className="h-full w-full text-gray-600 p-1"/>
                    </div>
                )}

                <div className="flex flex-col space-y-2 w-full">
                    <div className="flex justify-between w-full">
                        <h1 className="text-2xl font-bold text-gray-800">{profile.username}</h1>
                        {(profile.username !== sessionStorage.getItem("curUn")) ? (
                            <FollowComponent currentUser={currentUser!} userToFollow={username!} onFollowed={handleFollow} onUnFollowed={handleUnfollow} />
                        ) : (
                            <a className="px-4 py-1 text-white bg-blue-500 rounded-full hover:bg-blue-600"
                               href={`/profile-edit`}>Edit profile</a>
                        )}

                    </div>

                    <p className="text-gray-600">{profile.bio}</p>

                    <div className="flex flex-row space-x-3">
                        <div onClick={() => navigate(`/following/${username}`)}
                             className="cursor-pointer hover:underline text-gray-700">{profile.followingCount} Following
                        </div>
                        <div onClick={() => navigate(`/follower/${username}`)}
                             className="cursor-pointer hover:underline text-gray-700">
                            {profile.followerCount} Followers
                        </div>
                    </div>
                </div>


            </div>

            <div className="user-posts space-y-2">
                {postList.length > 0 ? (
                    postList.map((post) => <PostItem key={post.postId} postData={post} allowDelete={true}
                                                     onPostDeleted={handlePostDeleted}/>)
                ) : (
                    <div className="no-posts text-center mt-10">
                        <p className="text-xl text-gray-700">This account doesn't have any posts.</p>
                    </div>
                )}
            </div>

            {
                //TODO: Add infinite scrolling
            }
            {/* {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    {Array.from({length: totalPages}, (_, idx) => (
                        <button
                            key={idx}
                            className={`px-3 py-1 rounded ${idx === page ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                            onClick={() => handlePageChange(idx)}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>
            )} */}
        </div>
    );
}