const ROOT_URL = 'https://express-babel-starter-0v5p.onrender.com/api';

import axios from 'axios';

export default function createPostSlice(set, get) {
  return {
    isEditing: false,
    edit: () => set(({postSlice: draftState}) => {draftState.isEditing = !draftState.isEditing;}),
    all: [],

    current: {},
    fetchPost: async (id) => {
      const response = await axios.get(`${ROOT_URL}/posts/${id}`);
      console.log(response);
    // GET
    // takes the ID of the post to fetch from router params
    },

    updatePost: async (post) => {
    // PUT
    // takes in updated data (could include the ID of the post to update in the post object or add a separate parameter
    const ID = post.id;
    const response = await axios.put(`${ROOT_URL}/posts/${ID}`, post);
    if (response.status === 200) {
      const updatedPost = response.data;
      set((draftState) => {
        // Update the post in the 'all' array
        const idx = draftState.postSlice.all.findIndex(p => p.id === ID);
      if (idx !== -1) {
        draftState.postSlice.all[idx] = updatedPost;
      }
      // Optionally update 'current'
      draftState.postSlice.current = updatedPost;
      }, false, 'postSlice/updatePost');
    } else {
    // handle error if needed
    console.error('Failed to update post:', response);
    }    // if response good, update state, else return error

    },
    
    deletePost: async (id) => {
      const response = axios.delete(`${ROOT_URL}/posts/${id}`);
      console.log('jsut called delete, respone = ', response);
      set((draftState) => {draftState.postSlice.all.filter(l => l.id != id);});
    // DELETE
    // takes id of the post to delete
    },
    fetchAllPosts: async () => {
          // GET
    // would need pagination but for now we'll just get them all
      const response = await axios.get(`${ROOT_URL}/posts`);
      console.log('response from server after fetchallposts =', response);
      // const posts = await response.json();
      set((draftState) => { draftState.postSlice.all = response.data; }, false, 'postSlice/fetchAllPosts');
    },
    addPost: (newPost) => set((draftState) => { draftState.postSlice.all.push(newPost); }, false, 'postSlice/addPost'),
  };
}