import { useEffect, useState } from "react";
import type { Post } from "../../../lib/definitions";
import { Form, Button } from "react-bootstrap";
import { getAllPosts } from "../../../lib/actions";
import { useSearchParams } from "react-router-dom";
import PostItem from "../../../components/post/PostComponent";

export default function Explore() {
    const [postList, setPostList] = useState<Post[]>([]);
    const [filteredPostList, setFilteredPostList] = useState<Post[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const loadAllPosts = async () => {
            try {
                const allPosts = await getAllPosts();
                setPostList(allPosts);
                setFilteredPostList(allPosts);
            } catch (error) {
                console.error(error);
            }
        };

        loadAllPosts();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const query = searchQuery.trim().toLowerCase();

        if (query) {
            const filteredPosts = postList.filter(post =>
                post.content?.toLowerCase().includes(query)
            );
            setFilteredPostList(filteredPosts);
        } else {
            setFilteredPostList(postList);
        }
    };

    const handlePostDeleted = (postId: number) => {
        setPostList(prevPosts => prevPosts.filter(post => post.id !== postId));
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <Form className="flex gap-2" onSubmit={handleSearch}>
                    <Form.Control
                        className="text-xl"
                        type="text"
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button variant="primary" type="submit">
                        Search
                    </Button>
                </Form>
            </div>
            <div className="mt-4 space-y-2">
                {filteredPostList.length > 0 ? (
                    filteredPostList.map((post) => (
                        <PostItem key={post.id} postData={post} allowDelete={false} onPostDeleted={handlePostDeleted} />
                    ))
                ) : (
                    <div className="flex justify-center">
                        <p className="text-xl text-gray-700">No results.</p>
                    </div>
                )}
            </div>
        </div>
    );
}