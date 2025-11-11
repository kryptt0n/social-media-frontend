import { useEffect, useRef } from "react";
import { Post } from "../../lib/definitions";
import PostItem from "./PostComponent";

export interface ScrollablePostComponentProps {
  posts: Post[];
  hasMore: boolean;
  onScrollEnd: () => void;
  onPostDeleted: (postId: number) => void;
}

export default function ScrollablePostComponent({
  posts,
  hasMore,
  onScrollEnd,
  onPostDeleted,
}: ScrollablePostComponentProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore) return;

    let blocked = false;
    const obs = new IntersectionObserver(
       (entries) => {
        const e = entries[0];
        if (e.isIntersecting && !blocked && hasMore) {
          blocked = true;
          try {
             onScrollEnd(); 
          } finally {
            setTimeout(() => (blocked = false), 150);
          }
          console.log("Intersected!")
        }
      },
      { root: null, rootMargin: "0px 0px 400px 0px", threshold: 0.1 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [hasMore, onScrollEnd]);

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostItem
            key={post.postId}
            postData={post}
            onPostDeleted={onPostDeleted}
          />
        ))
      ) : (
        <div className="flex justify-center">
          <p className="text-xl text-gray-700">No results.</p>
        </div>
      )}

      {/* invisible bottom marker */}
      <div ref={sentinelRef} aria-hidden="true" />
    </>
  );
}
