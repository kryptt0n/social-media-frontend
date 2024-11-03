import { CreatePost } from "../../../components/post/CreatePost";
import type { Posts } from "../../../lib/definitions";
import { useState } from "react";

export function Home() {
    const [postList, setPostList] = useState<Posts[] | null>(null);

    return (
        <>
            <CreatePost />
            {postList ? (
                <div>
                </div>
            ) : (
                <div className="flex justify-center mt-10">
                    <p className="text-xl text-grey-700 ">No visible posts. Follow some accounts.</p>
                </div>
            )}
        </>
    );
}