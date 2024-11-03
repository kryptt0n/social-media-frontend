import { useState } from "react";
import type { Followers } from "../../../lib/definitions";

export function Follower() {
    const [followerList, setFollowerList] = useState<Followers[] | null>(null);

    return (
        <>
            <div>
                {followerList ? (
                    <div>
                        
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <p className="text-xl text-grey-700 ">You don't have followers.</p>
                    </div>
                )}
            </div>
        </>
    );
}