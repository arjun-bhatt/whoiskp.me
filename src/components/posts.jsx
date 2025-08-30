import useStore from '../store';
import React, {useEffect} from 'react';


function Posts(props) {
	const allPosts = useStore(({ postSlice }) => postSlice.all);
	const fetchAllPosts = useStore(({ postSlice }) => postSlice.fetchAllPosts);

	useEffect( () => {
		fetchAllPosts();
	}, []);

    const renderPosts = () => {
        return allPosts.map( post => { return <div key={post.id}>{post.title}</div>;});
    };

	return (
		<div>
            {renderPosts() }
        </div>
        );
    }

export default Posts;
