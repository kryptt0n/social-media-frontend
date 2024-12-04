import type { Post } from '../../lib/definitions';
import { GrUser } from 'react-icons/gr';
import CreateComment from '../comment/CreateComment';
import CommentItem from '../comment/CommentComponent';
import { useState } from 'react';
import type { Comment } from '../../lib/definitions';
import { getCommentsForPost, createLike, deleteLike } from '../../lib/actions';

interface PostItemProps {
  postData: Post;
}

export default function PostItem({ postData }: PostItemProps) {
  const formattedDate = new Date(postData.createdAt).toLocaleDateString();
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [showComment, setShowComment] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(postData.likedByCurrentUser);

  const handleCommentClick = async () => {
    try {
      if (showComment) {
        setShowComment(!showComment);
      } else {
        setShowComment(!showComment);
        const allComments = await getCommentsForPost(postData.id);
        setCommentList(allComments);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const handleLikeClick = async () => {
    try {
      if (isLiked) {
        await deleteLike({ post: { id: postData.id } });
      } else {
        await createLike({ post: { id: postData.id } });
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  return (
    <div className="post-container p-4 rounded-md bg-slate-50 border-b-2 border-gray-100 hover:bg-gray-100">
      <div className="post-header flex items-center space-x-3 mb-2">
        {postData.user.profilePicture ? (
          <img
            src={"data:image/jpeg;base64," + postData.user.profilePicture}
            alt={`${postData.user.username}'s profile`}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-lg object-cover border-2 border-gray-200">
            <GrUser className="text-4xl text-gray-600 overflow-hidden" />
          </div>
        )}
        <div className="flex space-x-4">
          <h2 className="post-author font-semibold text-gray-800">{postData.user.username}</h2>
          <span className="post-date text-sm text-gray-400">{formattedDate}</span>
        </div>
      </div>

      <div className="post-content flex flex-col space-y-2 mb-2 pl-14">
        <p className="post-content text-gray-800 ">{postData.content}</p>
        {postData.image && (
          <img
            src={"data:image/jpeg;base64," + postData.image}
            alt="Post content"
            className="post-image w-full h-auto rounded-lg"
          />
        )}
      </div>

      <div className="post-footer flex items-center justify-normal mt-4 pl-14 space-x-6">
        <div
          className={`post-like-icon flex items-center space-x-1 cursor-pointer ${isLiked ? 'text-red-500' : 'text-gray-500'
            }`}
          onClick={handleLikeClick}
        >
          <span>❤️</span>
          <span className="post-like-count text-sm">{postData.totalLikes} likes</span>
        </div>

        <div
          className="post-like-icon flex items-center space-x-1 cursor-pointer text-gray-500"
          onClick={handleCommentClick}
        >
          <span>📄</span>
          <span className="post-like-count text-sm">comments</span>
        </div>
      </div>

      {showComment && (
        <div>
          {commentList.length > 0 && (
            commentList.map((comment) => (
              <CommentItem commentData={comment} />
            ))
          )}
          <CreateComment postId={postData.id} />
        </div>
      )}

    </div>
  );
}


