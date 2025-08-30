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

                <div key={post.id}>
                    <NavLink to={`posts/${post._id}`}>
                    <div>{post.title}</div>
                    </NavLink>
                </div>
            );});
    };

	return (
		<div>
            {renderPosts() }
        </div>
        );
    }

export default Posts;
