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
    const [commentDraftAuthor, setCommentDraftAuthor] = useState('Anonymous Commenter');
    const [commentDraft, setCommentDraft] = useState('my comment here');
    const [isEditing, startEditing] = useState(false);
    const [author, setAuthor] = useState(post.author);

    const prod = true;

    const navigate = useNavigate();
    
    const onDeleteClick = async () => {
      await deletePost(postID);
      navigate('/');
    };
  
    const renderButtons = () => {
      if (!prod) {
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
      ); }
    };

    const renderComments = () => {
      return (
        comments.map( comment => {
          return (
            <div key={comment._id}>
              {comment.body}
              {comment.author}
            </div>
          );}
        )
      );
    };

    const handleCommentSubmission = async () => {
      // console.log('submitting comment, we got comments', comments, 'commentDraft', commentDraft, 'and our new list', comments.concat(commentDraft));
      const newCommentsArray = comments.concat({body: commentDraft, author: commentDraftAuthor});
      console.log('newCommentsarray =', newCommentsArray);
      await updatePost({id: postID, comments: newCommentsArray});
      setComments(newCommentsArray);
    };

    if (!post) {
      return (<div className="post-not-found">Post not found</div>);
    }

    if (isEditing) {
      // so we can edit title, author, coverURL, and content
      return (
        <div className="post-edit-container">
          {renderButtons()}
          <input className="post-edit-title" value={title}
          onChange={e => setTitle(e.target.value)}/>
          <input className="post-edit-author" value={author}
          onChange={(e => setAuthor(e.target.value))}/>
          <input className="post-edit-cover" value={coverURL} 
          onChange={e => setCoverURL(e.target.value)}/>
          <textarea className="post-edit-content" value={content}
          onChange={e => setContent(e.target.value)}/>
        </div>
      );
    }

    else {
      return (
        <div className="post-container">
          {renderButtons()}
          <h1 className="post-title">{title}</h1>
          <img className="post-cover" src={coverURL} />
          <p className="post-content">{content}</p>
          <div className="post-comments">{renderComments()}</div>
          <div className="post-comment-form">
            <input className="comment-input" value={commentDraft} onChange={e => setCommentDraft(e.target.value)}/>
            <input className="comment-author-input" value={commentDraftAuthor} onChange={e => setCommentDraftAuthor(e.target.value)} />
            <button className="comment-submit-btn" onClick={handleCommentSubmission}> save comment</button>
          </div>
        </div>
      );
    }
  
    
  }
  
  export default Post;