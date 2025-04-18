import type {Post} from '../../lib/definitions';
import {GrUser, GrLike, GrContact, GrTrash} from 'react-icons/gr';
import CreateComment from '../comment/CreateComment';
import CommentItem from '../comment/CommentComponent';
import {useCallback, useEffect, useState} from 'react';
import type {Comment} from '../../lib/definitions';
import {getCommentsForPost, createLike, deleteLike, getLikeCount, deletePost} from '../../lib/actions';
import {useNavigate} from 'react-router-dom';

interface PostItemProps {
    postData: Post;
    allowDelete: boolean;
    onPostDeleted: (postId: number) => void;
}

export default function PostItem({postData, allowDelete, onPostDeleted}: PostItemProps) {
    const navigate = useNavigate();
    const formattedDate = new Date(postData.createdAt).toLocaleDateString();
    const [commentList, setCommentList] = useState<Comment[]>([]);
    const [showComment, setShowComment] = useState<boolean>(false);
    const [isLiked, setIsLiked] = useState<boolean>(postData.likeByCurrentUser);
    const [totalLikes, setTotalLikes] = useState<number>(postData.likeCount);

    const handleCommentClick = async () => {
      try {
        if (showComment) {
          setShowComment(!showComment);
        } else {
          setShowComment(!showComment);
          const allComments = await getCommentsForPost(postData.postId);
          setCommentList(allComments);
        }
      } catch (error) {
        console.error('Error loading comments:', error);
      }
    };

    // const handleLikeClick = async () => {
    //   try {
    //     if (isLiked) {
    //       await deleteLike({ post: { id: postData.postId } });
    //       setIsLiked(false);
    //       setTotalLikes(totalLikes - 1);
    //     } else {
    //       await createLike({ post: { id: postData.id } });
    //       setIsLiked(true);
    //       setTotalLikes(totalLikes + 1);
    //     }
    //   } catch (error) {
    //     console.error('Error liking the post:', error);
    //   }
    // };

    const handleReloadComments = async () => {
      try {
        const updatedComments = await getCommentsForPost(postData.postId);
        setCommentList(updatedComments);
      } catch (error) {
        console.error('Error reloading comments:', error);
      }
    };

    const handleDeletePost = async () => {
        try {
            await deletePost(postData.postId);
            onPostDeleted(postData.postId);
        } catch (error) {
            console.error('Error deleting the post:', error);
        }
    };

    return (
        <div className="post-container px-3 py-2 rounded-xl bg-slate-50 border-b-2 border-gray-100 hover:bg-gray-100">
            <div
                className="post-header flex items-center space-x-3 mb-2 cursor-pointer"
                onClick={() => navigate(`/profile/${postData.username}`)}>
                {postData.avatarUrl ? (
                    <img
                        src={postData.avatarUrl.toString()}
                        alt={`${postData.username}'s profile`}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-lg object-cover border-2 border-gray-200">
                        <GrUser className="text-4xl text-gray-600 overflow-hidden"/>
                    </div>
                )}
                <div className="flex justify-between w-full">
                    <h2 className="post-author font-semibold text-gray-800">{postData.username}</h2>
                    <span className="post-date text-sm text-gray-400">{formattedDate}</span>
                </div>
            </div>

            <div className="post-content flex flex-col space-y-2 mb-2 pl-14">
                <p className="post-content text-gray-800 ">{postData.content}</p>
                {postData.imageUrl && (
                    <img
                        src={postData.imageUrl.toString()}
                        alt="Post content"
                        className="post-image w-full h-auto rounded-lg"
                    />
                )}
            </div>

            <div className="post-footer flex items-center justify-normal mt-4 pl-14 space-x-6">
                <div
                    className={`post-like-icon flex items-center space-x-1 cursor-pointer ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
                    // onClick={handleLikeClick}
                >
                    <span><GrLike/></span>
                    <span className="post-like-count text-sm">{totalLikes} likes</span>
                </div>

                <div
                    className="post-like-icon flex items-center space-x-1 cursor-pointer text-gray-500"
                    // onClick={handleCommentClick}
                >
                    <span><GrContact/></span>
                    <span className="post-like-count text-sm">comments</span>
                </div>

                {(postData.username == sessionStorage.getItem('curUn') && allowDelete) && (
                    <div
                        className="post-like-icon flex items-center space-x-1 cursor-pointer text-gray-500"
                        onClick={handleDeletePost}
                    >
                        <span><GrTrash/></span>
                        <span className="post-like-count text-sm">delete</span>
                    </div>
                )}
            </div>

            {showComment && (
                <div className='px-2 pt-1 border-t-2 border-gray-300 mt-2'>

                    <CreateComment
                        postId={postData.postId}
                        onCommentSubmitted={handleReloadComments}
                    />
                    {commentList.length > 0 && (
                        commentList.map((comment) => (
                            <CommentItem
                                key={comment.id}
                                commentData={comment}
                                onCommentDeleted={handleReloadComments}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}


