async function fetchPosts() {
    const res = await fetch('posts.json');
    return res.json();
}

async function loadPostList() {
    const container = document.getElementById('blog-container');
    const posts = await fetchPosts();
    container.innerHTML = '';
    posts.forEach(post => {
        const article = document.createElement('article');
        article.innerHTML = `
            <h2><a href="post.html?id=${post.id}">${post.title}</a></h2>
            <p><strong>${post.author}</strong> — ${post.date}</p>
            <p>${post.excerpt}</p>
        `;
        container.appendChild(article);
    });
}

async function loadSinglePost() {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');
    const container = document.getElementById('post-container');
    const posts = await fetchPosts();
    const post = posts.find(p => p.id === postId);

    if (!post) {
        container.innerHTML = '<p>Post not found.</p>';
        return;
    }

    container.innerHTML = `
        <article>
            <h2>${post.title}</h2>
            <p><strong>${post.author}</strong> — ${post.date}</p>
            ${post.content}
        </article>
    `;
}
