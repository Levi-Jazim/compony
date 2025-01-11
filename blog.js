// Load blog posts from localStorage
function loadBlogPosts(category = 'all') {
    const blogContainer = document.getElementById('blogContainer');
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const searchQuery = document.getElementById('searchBlog').value.toLowerCase();
    
    blogContainer.innerHTML = '';
    
    const filteredPosts = posts.filter(post => {
        const matchesCategory = category === 'all' || post.category === category;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery) || 
                            post.content.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });

    filteredPosts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'blog-post';
        
        const date = new Date(post.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        postElement.innerHTML = `
            <div class="post-image">
                <img src="${post.image}" alt="${post.title}">
                <span class="post-category">${post.category}</span>
            </div>
            <div class="post-content">
                <h2>${post.title}</h2>
                <div class="post-meta">
                    <span><i class="far fa-calendar"></i> ${formattedDate}</span>
                </div>
                <p>${post.content.substring(0, 150)}...</p>
                <button class="read-more" onclick="showFullPost('${post.id}')">Read More</button>
            </div>
        `;
        blogContainer.appendChild(postElement);
    });
}

// Filter posts by category
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        loadBlogPosts(this.dataset.category);
    });
});

// Search functionality
document.getElementById('searchBlog').addEventListener('input', function() {
    const activeCategory = document.querySelector('.category-btn.active').dataset.category;
    loadBlogPosts(activeCategory);
});

// Show full post
function showFullPost(postId) {
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const post = posts.find(p => p.id === postId);
    
    if (!post) return;

    const modal = document.createElement('div');
    modal.className = 'post-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${post.image}" alt="${post.title}">
            <h2>${post.title}</h2>
            <div class="post-meta">
                <span><i class="far fa-calendar"></i> ${new Date(post.date).toLocaleDateString()}</span>
                <span class="post-category">${post.category}</span>
            </div>
            <div class="full-content">${post.content}</div>
        </div>
    `;

    document.body.appendChild(modal);
    
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Load posts when page loads
document.addEventListener('DOMContentLoaded', () => loadBlogPosts());
