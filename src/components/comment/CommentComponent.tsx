import type { Comment } from "../../lib/definitions";
import { GrUser, GrTrash } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { deleteComment } from "../../lib/actions";

interface CommentItemProps {
    commentData: Comment,
    onCommentDeleted: () => void,
}

export default function CommentItem({ commentData, onCommentDeleted }: CommentItemProps) {
    const formattedDate = new Date(commentData.createdAt).toLocaleDateString();
    const navigate = useNavigate();

    const handleDeleteComment = async () => {
        try {
            await deleteComment(commentData.id);
            onCommentDeleted();
        } catch (error) {
            console.error('Error reloading comments:', error);
        }
    }

    return (
        <>
            <div
                className="comment-item bg-white shadow-sm rounded-md p-2 mb-1 border border-gray-200 flex items-start space-x-3"
            >


                {commentData.avatarUrl ? (
                    <img
                        src={commentData.avatarUrl.toString()}
                        alt={`${commentData.username}'s profile`}
                        className="w-8 h-8 rounded-full object-cover"
                        onClick={() => navigate(`/profile/${commentData.username}`)}
                    />
                ) : (
                    <div
                        className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center"
                        onClick={() => navigate(`/profile/${commentData.username}`)}
                    >
                        <GrUser className="text-4xl text-gray-600 overflow-hidden" />
                    </div>
                )}
                <div className="flex-1">
                    <div
                        className="flex justify-between items-center"
                        onClick={() => navigate(`/profile/${commentData.username}`)}
                    >
                        <h3 className="text-sm font-medium text-gray-800">{commentData.username}</h3>
                        <span className="text-xs text-gray-500">{formattedDate}</span>
                    </div>
                    <p className="text-gray-700 text-sm mt-1 break-words whitespace-normal" >{commentData.content}</p>
                </div>

                {commentData.username == sessionStorage.getItem('curUn') && (
                    <div
                        className="post-like-icon flex items-center space-x-1 cursor-pointer text-gray-500"
                        onClick={handleDeleteComment}
                    >
                        <span><GrTrash /></span>
                    </div>
                )}
            </div>
        </>
    );
}