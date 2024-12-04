import type { Post } from '../../lib/definitions';
import { GrUser } from 'react-icons/gr';

interface PostItemProps {
  postData: Post;
}

export default function PostItem({ postData }: PostItemProps) {
  const { content, image, user, createdAt, likedByCurrentUser, totalLikes } = postData;

  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className="post-container p-4 rounded-md bg-slate-50 border-b-2 border-gray-100 hover:bg-gray-100">
      <div className="post-header flex items-center space-x-4 mb-4">
        {user.profilePicture ? (
          <div>
          </div>
          // <img
          //   src={URL.createObjectURL(user.profilePicture)}
          //   alt={`${user.username}'s profile`}
          //   className="w-10 h-10 rounded-full object-cover"
          // />
        ) : (
          <div className="w-10 h-10 rounded-lg object-cover border-2 border-gray-200">
            <GrUser className="text-4xl text-gray-600 overflow-hidden" />
          </div>
        )}
        <div className="flex-1">
          <h2 className="post-author font-semibold text-gray-800">{user.username}</h2>
          <p className="post-bio text-sm text-gray-500">{user.bio}</p>
        </div>
        <span className="post-date text-sm text-gray-400">{formattedDate}</span>
      </div>

      <p className="post-content text-gray-800 mb-4">{content}</p>
      {/* {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Post content"
          className="post-image w-full h-auto rounded-lg mb-4"
        />
      )} */}

      <div className="post-footer flex items-center justify-between mt-4">
        <div
          className={`post-like-icon flex items-center space-x-2 cursor-pointer ${likedByCurrentUser ? 'text-red-500' : 'text-gray-500'
            }`}
        >
          <span>❤️</span>
          <span className="post-like-count text-sm">{totalLikes} likes</span>
        </div>
        <button
          className={`post-follow-btn px-3 py-1 text-sm rounded-full ${user.isFollowed ? 'bg-gray-300 text-gray-700' : 'bg-blue-500 text-white'
            }`}
        >
          {user.isFollowed ? 'Following' : 'Follow'}
        </button>
      </div>
    </div>
  );
}


