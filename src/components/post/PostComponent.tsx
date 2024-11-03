import './PostStyle.css';

interface PostProps {
  author: string;
  datePosted: string;
  content: string;
  imageUrl?: string;
  likes: number;
}

export default function Post({ author, datePosted, content, imageUrl, likes }: PostProps) {
  return (
    <div className="post-container">
      <div className="post-header">
        <span className="post-author">{author}</span>
        <span className="post-date">{datePosted}</span>
      </div>

      <p className="post-content">{content}</p>

      {imageUrl && <img src={imageUrl} alt="Post content" className="post-image" />}

      <div className="post-footer">
        <span className="post-like-icon">❤️</span>
        <span className="post-like-count">{likes}</span>
      </div>
    </div>
  );
}
