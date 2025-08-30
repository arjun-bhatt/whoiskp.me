import { NavLink } from 'react-router';
import useStore from '../store';
import React, {useEffect} from 'react';


function Posts(props) {
	const allPosts = useStore(({ postSlice }) => postSlice.all);
	const fetchAllPosts = useStore(({ postSlice }) => postSlice.fetchAllPosts);

	useEffect( () => {
		fetchAllPosts();
	}, []);

    const renderPosts = () => {
        return allPosts.map( post => {
             return (
                <div className="post-list-item" key={post.id}>
                    <NavLink className="post-list-link" to={`posts/${post._id}`}>
                        <div className="post-list-title">{post.title}</div>
                    </NavLink>
                </div>
            );});
    };

    return (
        <div className="posts-list-container">
            {renderPosts() }
        </div>
    );
}

export default Posts;
