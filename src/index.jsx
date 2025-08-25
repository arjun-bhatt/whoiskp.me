import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router';
import { useParams } from 'react-router';
import './store';
import Counter from './components/counter.jsx';
import Controls from './components/controls.jsx';


const About = (props) => {
  return <div> All there is to know about me </div>;
};
const Welcome = (props) => {
  return (
    <div>
      <div>
        <Counter />
        <Controls />
      </div>
    <p>Welcome</p>
    </div>
  );
};

const Test = (props) => {
  const { id } = useParams();
  return <div> ID: {id} </div>;
};

const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/test/id1">test id1</NavLink></li>
        <li><NavLink to="/test/id2">test id2</NavLink></li>
      </ul>
    </nav>
  );
};

const App = (props) => {
  return (
    <BrowserRouter>
      <div>
        <Nav />
            <Routes>
                <Route path="/" element={<Welcome/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/test/:id" element={<Test/>} />
                <Route path="*" element={<FallBack />} />

			</Routes>
      </div>
    </BrowserRouter>
  );
};

// Fetch posts as before
export async function fetchPosts() {
    const res = await fetch('posts.json');
    return res.json();
}

// Returns an array of JSX articles for the post list
export async function getPostListJSX() {
    const posts = await fetchPosts();
    return posts.map(post => (
        <article key={post.id}>
            <h2>
                <a href={`post.html?id=${post.id}`}>{post.title}</a>
            </h2>
            <p><strong>{post.author}</strong> — {post.date}</p>
            <p>{post.excerpt}</p>
        </article>
    ));
}

// Returns JSX for a single post (or not found message)
export async function getSinglePostJSX(postId) {
    const posts = await fetchPosts();
    const post = posts.find(p => p.id === postId);

    if (!post) {
        return <p>Post not found.</p>;
    }

    return (
        <>
            <a className="back-button" href="index.html">&larr; Back to Home</a>
            <article>
                <h2>{post.title}</h2>
                <p><strong>{post.author}</strong> — {post.date}</p>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
        </>
    );
}


const root = createRoot(document.getElementById('main'));
root.render(<App />);
