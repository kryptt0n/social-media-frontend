import { useEffect, useState } from "react";
import type { User } from "../../../lib/definitions";
import { Button, Image } from "react-bootstrap";
import { getFollowers } from "../../../lib/actions";

export default function Follower() {
    const [followerList, setFollowerList] = useState<User[]>([]);

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
                    <ul>
                        {followerList.map((follower) => (
                            <li>
                                <a href="">{follower.username}</a>
                                <Button variant="primary">Follow</Button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex justify-center">
                        <p className="text-xl text-grey-700 ">You don't have followers.</p>
                    </div>
                )}
            </div>
        </>
    );
}