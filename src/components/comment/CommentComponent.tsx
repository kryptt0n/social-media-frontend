interface CommentProps {
    post_id: number,
    text: string,
    user_id: number,
    create_time: string,
}

export default function Comment({post_id, text, user_id, create_time}: CommentProps){
    return (
        <>
            <div>
                <span>{text}</span>
                <span>{create_time}</span>
                <span>{user_id}</span>
            </div>
        </>
    );
}