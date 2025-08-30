import useStore from '../store';
import { useParams } from 'react-router';
import React from 'react';

function Post(props) {
    const { postID } = useParams();
    const post = useStore(({ postSlice }) => postSlice.all.find(p => p.id === postID));
  
    if (!post) {
      return (<div>Post not found</div>);
    }
  
    return (
      <div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </div>
    );
  }
  
  export default Post;