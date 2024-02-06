import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCommentDispatch, useCommentState } from "../../context/Comment/context";
import { fetchComment } from "../../context/Comment/action";

const Comments: React.FC = () => {
  const commentState = useCommentState();
  const { comments } = commentState;
  const commentDispatch = useCommentDispatch();
  const { blogID } = useParams();
  
  useEffect(() => {
    if(blogID){
      fetchComment(commentDispatch, blogID);
    }
  }, [commentDispatch, blogID]);

  return (
    <div>
      {comments
        ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((comment) => (
          <div key={comment.id} className="comment">
              <p>{comment.User && comment.User.firstName ? comment.User.firstName : "Unknown User"}</p>
            <span>  {comment.text}</span>
            <br />
          </div>
        ))}
    </div>
  );
  
};

export default Comments;
