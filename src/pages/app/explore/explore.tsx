import { useEffect, useRef, useState } from "react";
import type { Post, ScrollablePostResponse } from "../../../lib/definitions";
import { Form, Button } from "react-bootstrap";
import { searchPosts } from "../../../lib/actions";
import ScrollablePostComponent from "../../../components/post/ScrollablePostComponent";

export default function Explore() {
    const [posts, setPostList] = useState<Post[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [cursor, setCursor] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);
    const firstLoadDone = useRef(false);


    const mergeAppend = (prev: Post[], next: Post[]) => {
        const seen = new Set(prev.map(p => p.postId));
        const merged = [...prev];
        for (const p of next) if (!seen.has(p.postId)) merged.push(p);
        return merged;
    };

    const fetchPosts = async (keyword: string, cur: string | null, replace = false) => {
            try {
                setLoading(true);
                const result: ScrollablePostResponse = await searchPosts(keyword, cur);
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

  useEffect(() => {
    if (firstLoadDone.current) return;
    firstLoadDone.current = true;
    fetchPosts("", null, true);
  }, []);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setCursor(null);
        setHasMore(true);
        await fetchPosts(searchQuery, null, true);
    };

    const handlePostDeleted = (postId: number) => {
        setPostList(prevPosts => prevPosts.filter(post => post.postId !== postId));
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
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? "Searching…" : "Search"}
                    </Button>
                </Form>
            </div>
            <div className="mt-4 space-y-2">
                <ScrollablePostComponent
                    posts={posts}
                    hasMore={hasMore}
                    onScrollEnd={() => {
                        if (!loading && hasMore) fetchPosts(searchQuery, cursor, false);
                    }}
                    onPostDeleted={handlePostDeleted}
                />
            </div>
        </div>
    );
}