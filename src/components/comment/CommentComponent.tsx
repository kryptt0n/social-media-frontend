import type { Comment } from "../../lib/definitions";

interface CommentItemProps {
    commentData: Comment;
}

export default function CommentItem({ commentData }: CommentItemProps) {
    const formattedDate = new Date(commentData.createdAt).toLocaleDateString();

    return (
        <>
            <div>
                <span>{commentData.content}</span>
                <span>{formattedDate}</span>
            </div>
        </>
    );
}