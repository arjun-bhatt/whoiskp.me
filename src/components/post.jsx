import useStore from '../store';
import { useParams } from 'react-router';
import React from 'react';

function Post(props) {
    const { postID } = useParams();
    const post = useStore(({ postSlice }) => postSlice.all.find(p => p.id === postID));
    const isEditing = useStore({isEditing});
  
    if (!post) {
      return (<div>Post not found</div>);
    }

    if (isEditing) {
      return (
        <div>
          <input>
          title boo
          </input>
          <textarea>
            boo
          </textarea>
        </div>
      );
    }

    else {
  return (
      <div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </div>
    );
    }
  
    
  }
  
  export default Post;