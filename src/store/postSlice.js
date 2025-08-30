export default function createPostSlice(set, get) {
  return {
    all: [],
    fetchAllPosts: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const posts = await response.json();
      set((draftState) => { draftState.postSlice.all = posts; }, false, 'postSlice/fetchAllPosts');
    },
    addPost: (newPost) => set((draftState) => { draftState.postSlice.all.push(newPost); }, false, 'postSlice/addPost'),
  };
}