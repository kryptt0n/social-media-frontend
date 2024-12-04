import CreatePost from "../../../components/post/CreatePost";
import type { Post } from "../../../lib/definitions";
import { useEffect, useState } from "react";

export default function Home() {
    const [postList, setPostList] = useState<Post[] | null>(null);

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