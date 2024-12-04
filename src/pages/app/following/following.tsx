import { useState, useEffect } from "react";
import type { User } from "../../../lib/definitions";
import { getFollowed } from "../../../lib/actions";
import { Button } from "react-bootstrap";

export default function Following() {
    const [followingList, setFollowingList] = useState<User[]>([]);

    useEffect(() => {
        const loadAllFollowing = async () => {
            try {
                const allFollowing = await getFollowed(localStorage.getItem("curUn"));
                setFollowingList(allFollowing);
            } catch (error) {
                console.error(error);
            }
        }

        loadAllFollowing();
    }, []);

    return (
        <>
            <div>
                {followingList.length > 0 ? (
                    <ul>
                        {followingList.map((following) => (
                            <li>
                                <a href="">{following.username}</a>
                                <Button variant="primary">Follow</Button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex justify-center">
                        <p className="text-xl text-grey-700 ">You are not following anyone.</p>
                    </div>
                )}
            </div>
        </>
    );
}