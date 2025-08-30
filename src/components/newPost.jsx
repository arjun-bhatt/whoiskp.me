import React, { useState } from 'react';
import useStore from '../store';
import { useNavigate } from 'react-router';

const newPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [coverURL, setCoverURL ] = useState('');

  // eslint-disable-next-line max-len
  const defaultURL = 'https://www.google.com/imgres?q=kashmiri%20pandit&imgurl=https%3A%2F%2Fwww.aljazeera.com%2Fwp-content%2Fuploads%2F2019%2F08%2F7320aaa4a2be4c1a8c798b3315b49b1b_18.jpeg%3Fresize%3D1200%252C675&imgrefurl=https%3A%2F%2Fwww.aljazeera.com%2Fopinions%2F2019%2F8%2F10%2Fkashmiri-pandits-must-reimagine-the-idea-of-return-to-kashmir&docid=Rxgks0Xf6hfNYM&tbnid=c7wIKQx2EE9mrM&vet=12ahUKEwjqi-rhubOPAxXdk2oFHW7mLDoQM3oECBMQAA..i&w=1200&h=675&hcb=2&ved=2ahUKEwjqi-rhubOPAxXdk2oFHW7mLDoQM3oECBMQAA';
  const defaultAuthor = 'Anonymous KP';

  const addPost = useStore(state => state.postSlice.addPost);

  const navigate = useNavigate();

  const getDate = () => {
    return new Date();
  };

  const newPostParts = () => {
    return (
      {
        title: title,
        content: content,
        author: author ? author : defaultAuthor,
        coverURL: coverURL ? coverURL : defaultURL,
        date: getDate(),
        comments: [],

      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit hit, addPost =', addPost);
    await addPost(newPostParts());
    navigate('/');
    // setTitle('');
    // setContent('');
    // Optionally redirect or show a success message
  };

  return (
    <form className="newpost-form" onSubmit={handleSubmit}>
      <input
        className="newpost-title"
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input 
        className="newpost-author"
        type="text"
        placeholder={defaultAuthor}
        value={author}
        onChange={e => setAuthor(e.target.value)}
      />
      <input
        className="newpost-content"
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
      />
      <textarea 
        className="newpost-coverurl"
        placeholder={defaultURL}
        value={coverURL}
        onChange={e => setCoverURL(e.target.value)}
      />
      <button className="newpost-submit-btn" type="submit">Create Post</button>
    </form>
  );
};

export default newPost;
