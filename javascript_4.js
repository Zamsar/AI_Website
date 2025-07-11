document.addEventListener('DOMContentLoaded', () => {
    const blogPostsContainer = document.getElementById('blog-posts-container');
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');

    async function fetchBlogPosts() {
        try {
            loadingMessage.style.display = 'block';
            errorMessage.style.display = 'none'; // Hide error if it was previously shown

            const response = await fetch('posts.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const posts = await response.json();
            displayBlogPosts(posts);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            loadingMessage.style.display = 'none';
            errorMessage.style.display = 'block';
            blogPostsContainer.innerHTML = ''; // Clear any partial content
        } finally {
            loadingMessage.style.display = 'none';
        }
    }

    function displayBlogPosts(posts) {
        if (posts.length === 0) {
            blogPostsContainer.innerHTML = '<p class="error-text">No blog posts found.</p>';
            return;
        }

        blogPostsContainer.innerHTML = ''; // Clear previous content
        posts.forEach(post => {
            const postCard = document.createElement('article');
            postCard.classList.add('blog-post-card');
            postCard.innerHTML = `
                <img src="${post.image}" alt="${post.title}">
                <div class="blog-post-content">
                    <h3>${post.title}</h3>
                    <div class="blog-post-meta">
                        <span><i class="far fa-calendar-alt"></i> ${post.date}</span>
                        <span><i class="fas fa-tag"></i> ${post.category}</span>
                    </div>
                    <p class="blog-post-excerpt">${post.excerpt}</p>
                    <a href="#" class="read-more-btn">Read More</a>
                </div>
            `;
            // Note: For a true "read more" functionality on a static site,
            // you'd typically navigate to a post-specific page (e.g., post.html?id=post.id)
            // and have another script on that page load the full content.
            // For this example, the "Read More" button is illustrative.
            blogPostsContainer.appendChild(postCard);
        });
    }

    fetchBlogPosts();
});