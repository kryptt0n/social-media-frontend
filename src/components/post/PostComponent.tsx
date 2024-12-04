import type { Post } from '../../lib/definitions';

export default function Post(postData: Post) {
  const { content, image, user, createdAt, likedByCurrentUser, totalLikes } = postData;

  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className="post-container shadow-lg rounded-lg p-4 bg-white">
      <div className="post-header flex items-center space-x-4 mb-4">
        <img
          src={URL.createObjectURL(user.profilePicture)}
          alt={`${user.username}'s profile`}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <h2 className="post-author font-semibold text-gray-800">{user.username}</h2>
          <p className="post-bio text-sm text-gray-500">{user.bio}</p>
        </div>
        <span className="post-date text-sm text-gray-400">{formattedDate}</span>
      </div>

      <p className="post-content text-gray-800 mb-4">{content}</p>
      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Post content"
          className="post-image w-full h-auto rounded-lg mb-4"
        />
      )}

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


