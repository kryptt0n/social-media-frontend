import { useState } from "react";
import type { Accounts } from "../../../lib/definitions";
import { Button, Image } from "react-bootstrap";

export default function Follower() {
    const [followerList, setFollowerList] = useState<Accounts[] | null>(null);

    return (
        <>
            <div>
                {followerList ? (
                    <ul>
                        {followerList.map((follower) => (
                            <li>
                                <Image src={follower.profile} roundedCircle />
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