import useStore from '../store';
import { useNavigate, useParams } from 'react-router';
import React from 'react';
import { useState } from 'react';

function Post(props) {
    const { postID } = useParams();
    const post = useStore(({ postSlice }) => postSlice.all.find(p => p._id === postID));
    const deletePost = useStore(state => state.postSlice.deletePost);
    const updatePost = useStore(state => state.postSlice.updatePost);

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [coverURL, setCoverURL] = useState(post.coverURL);
    const [comments, setComments] = useState(post.comments);
    const [commentDraft, setCommentDraft] = useState('my comment here');
    const [isEditing, startEditing] = useState(false);
    const [author, setAuthor] = useState(post.author);

    const navigate = useNavigate();
    
    const onDeleteClick = async () => {
      await deletePost(postID);
      navigate('/');
    };
  
    const renderButtons = () => {
      return(
        <div>
          <button onClick={onDeleteClick}>Delete Post</button>
          <button onClick={() => {
            if (isEditing) {
              updatePost({
                title: title,
                content: content,
                id: postID});
            }
            startEditing(!isEditing);}}>
              {isEditing ? 'Save Post' : 'Edit Post'}</button>
        </div>
      );
    };

    const renderComments = () => {
      return (
        comments.map( comment => {
          return (
            <div key={comment}>
              {comment}
            </div>
          );}
        )
      );
    };

    const handleCommentSubmission = async () => {
      console.log('submitting comment, we got comments', comments, 'commentDraft', commentDraft, 'and our new list', comments.concat(commentDraft));
      updatePost({id: postID, comments: comments.concat(commentDraft)});
      setComments(comments.concat(commentDraft));
    };

    if (!post) {
      return (<div>Post not found</div>);
    }

    if (isEditing) {
      // so we can edit title, author, coverURL, and content
      return (
        <div>
          {renderButtons()}
          <input value={title}
          onChange={e => setTitle(e.target.value)}/>
          <input value={author}
          onChange={(e => setAuthor(e.target.value))}/>
          <input value={coverURL} 
          onChange={e => setCoverURL(e.target.value)}/>
          <textarea value={content}
          onChange={e => setContent(e.target.value)}/>
        </div>
      );
    }

    else {
  return (
      <div>
        {renderButtons()}
        <h1>{title}</h1>
        <img src={coverURL} />
        <p>{content}</p>
        {renderComments()}
        
        <input value={commentDraft} onChange={e => setCommentDraft(e.target.value)}/>
        <button onClick={handleCommentSubmission}> save comment</button>
      </div>
    );
    }
  
    
  }
  
  export default Post;