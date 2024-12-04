import { useEffect, useState } from "react";
import type { Post } from "../../../lib/definitions";
import { Form, Button } from "react-bootstrap";
import { getAllPosts } from "../../../lib/actions";
import { useSearchParams } from "react-router-dom";
import PostItem from "../../../components/post/PostComponent";

export default function Explore() {
    const [postList, setPostList] = useState<Post[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const loadAllPosts = async () => {
            try {
                const allPosts = await getAllPosts();
                setPostList(allPosts);
            } catch (error) {
                console.error(error);
            }
        }

        loadAllPosts();

        if (searchParams.toString()) {
            setSearchParams({});
        }
    }, [searchParams, setSearchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const query = searchQuery.trim().toLowerCase();

        if (query) {
            const filteredPosts = postList.filter(post =>
                post.content?.toLowerCase().includes(query)
            );
            setPostList(filteredPosts);
        } else {
            getAllPosts().then(setPostList).catch(console.error);
        }
    };

    return (
        <>
            <div>
                <Form className="flex gap-2" onSubmit={handleSearch}>
                    <Form.Control
                        className="text-xl"
                        type="text"
                        placeholder="Search posts..."
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button variant="primary" type="submit">
                        Search
                    </Button>
                </Form>
            </div>
            <div className="mt-10">
                {postList.length > 0 ? (
                    postList.map((post) => (
                        <PostItem postData={post} />
                    ))
                ) : (
                    <div className="flex justify-center">
                        <p className="text-xl text-gray-700">No results.</p>
                    </div>
                )}
            </div>
        </>
    );
}