import { useEffect, useState } from "react";
import type { Post } from "../../../lib/definitions";
import { Form, Button } from "react-bootstrap";
import { searchPosts } from "../../../lib/actions";
import PostItem from "../../../components/post/PostComponent";

export default function Explore() {
    const [postList, setPostList] = useState<Post[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    // const [totalPages, setTotalPages] = useState(0);

    const fetchPosts = async (keyword = "", pageNumber = 0) => {
        try {
            const result = await searchPosts(keyword, pageNumber);
            setPostList(result.posts);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPosts(searchQuery, page);
    }, [page]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setPage(0);
        fetchPosts(searchQuery, 0);
    };

    const handlePostDeleted = (postId: number) => {
        setPostList(prevPosts => prevPosts.filter(post => post.postId !== postId));
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
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
                {postList.length > 0 ? (
                    postList.map((post) => (
                        <PostItem key={post.postId} postData={post} allowDelete={true} onPostDeleted={handlePostDeleted} />
                    ))
                ) : (
                    <div className="flex justify-center">
                        <p className="text-xl text-gray-700">No results.</p>
                    </div>
                )}
            </div>
            {
                //TODO: Add infinite scrolling
            }
            {/* {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    {Array.from({ length: totalPages }, (_, idx) => (
                        <Button
                            key={idx}
                            variant={idx === page ? "primary" : "outline-primary"}
                            onClick={() => handlePageChange(idx)}
                        >
                            {idx + 1}
                        </Button>
                    ))}
                </div>
            )} */}
        </div>
    );
}