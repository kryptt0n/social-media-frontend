import {useState, useEffect, useRef} from "react";
import type {Post, Profile, ScrollablePostResponse} from "../../../lib/definitions";
import {getUserPosts, followUser, unfollowUser, getUserProfile} from "../../../lib/actions";
import PostItem from "../../../components/post/PostComponent";
import {useParams} from "react-router-dom";
import {GrUser} from 'react-icons/gr';
import {useNavigate} from "react-router-dom";
import FollowComponent from "../../../components/follow";
import ScrollablePostComponent from "../../../components/post/ScrollablePostComponent";

export default function UserProfile() {
    const {username} = useParams<{ username: string }>();
    const [posts, setPostList] = useState<Post[]>([]);
    const navigate = useNavigate();
    const [profile, setProfile] = useState<Profile>({} as Profile);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cursor, setCursor] = useState<string | null>(null);
    const firstLoadDone = useRef(false);

    const currentUser = sessionStorage.getItem("curUn");

    useEffect(() => {
        loadProfile();
        fetchPosts(null, true);
    }, [username]);

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

    const mergeAppend = (prev: Post[], next: Post[]) => {
        const seen = new Set(prev.map(p => p.postId));
        const merged = [...prev];
        for (const p of next) if (!seen.has(p.postId)) merged.push(p);
        return merged;
    };

    const fetchPosts = async (cur: string | null, replace = false) => {
        try {
            setLoading(true);
            const result: ScrollablePostResponse = await getUserPosts(username!, cur);
            if (replace) {
                setPostList(result.posts ?? []);
            } else {
                setPostList(prev => mergeAppend(prev, result.posts ?? []));
            }

            setCursor(result.cursor ?? null);
            setHasMore(result.hasMore === true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handlePostDeleted = (postId: number) => {
        setPostList(prevPosts => prevPosts.filter(post => post.postId !== postId));
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
                <ScrollablePostComponent
                    posts={posts}
                    hasMore={hasMore}
                    onScrollEnd={() => {
                        if (!loading && hasMore) fetchPosts(cursor, false);
                    }}
                    onPostDeleted={handlePostDeleted}
                />
            </div>

        </div>
    );
}