// Check if admin is logged in
function checkAuth() {
    if (!localStorage.getItem('adminLoggedIn')) {
        window.location.href = 'admin.html';
    }
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Tab functionality
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(`${button.dataset.tab}-content`).classList.add('active');
    });
});

// Load projects
function loadProjects() {
    const projectsList = document.getElementById('projectsList');
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    
    projectsList.innerHTML = '';
    
    if (projects.length === 0) {
        projectsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-folder-open"></i>
                <h3>No Projects Yet</h3>
                <p>Add your first project using the form above.</p>
            </div>
        `;
        return;
    }
    
    projects.forEach((project, index) => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.innerHTML = `
            <div>
                <h3>${project.title}</h3>
                <p>${project.type}</p>
            </div>
            <div class="project-actions">
                <button onclick="editProject(${index})" class="edit-btn">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button onclick="deleteProject(${index})" class="delete-btn">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        projectsList.appendChild(projectItem);
    });
}

// Add new project
document.getElementById('addProjectForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const project = {
        title: document.getElementById('projectTitle').value,
        description: document.getElementById('projectDescription').value,
        image: document.getElementById('projectImage').value,
        type: document.getElementById('projectType').value,
        date: new Date().toISOString()
    };
    
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));
    
    this.reset();
    loadProjects();
    showNotification('Project added successfully! ');
});

// Edit project
function editProject(index) {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const project = projects[index];
    
    document.getElementById('projectTitle').value = project.title;
    document.getElementById('projectDescription').value = project.description;
    document.getElementById('projectImage').value = project.image;
    document.getElementById('projectType').value = project.type;
    
    const form = document.getElementById('addProjectForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Project';
    
    form.onsubmit = function(e) {
        e.preventDefault();
        
        projects[index] = {
            ...project,
            title: document.getElementById('projectTitle').value,
            description: document.getElementById('projectDescription').value,
            image: document.getElementById('projectImage').value,
            type: document.getElementById('projectType').value,
            lastEdited: new Date().toISOString()
        };
        
        localStorage.setItem('projects', JSON.stringify(projects));
        
        this.reset();
        submitBtn.innerHTML = '<i class="fas fa-plus"></i> Add Project';
        form.onsubmit = null;
        
        loadProjects();
        showNotification('Project updated successfully! ');
    };
}

// Delete project
function deleteProject(index) {
    if (confirm('Are you sure you want to delete this project?')) {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        const deletedProject = projects[index];
        projects.splice(index, 1);
        localStorage.setItem('projects', JSON.stringify(projects));
        loadProjects();
        showNotification(`Project "${deletedProject.title}" has been deleted! `);
    }
}

// Load blog posts
function loadBlogPosts() {
    const blogsList = document.getElementById('blogsList');
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    
    blogsList.innerHTML = '';
    
    if (posts.length === 0) {
        blogsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-newspaper"></i>
                <h3>No Blog Posts Yet</h3>
                <p>Start writing your first blog post using the form above.</p>
            </div>
        `;
        return;
    }
    
    posts.forEach((post, index) => {
        const postItem = document.createElement('div');
        postItem.className = 'blog-item';
        postItem.innerHTML = `
            <div>
                <h3>${post.title}</h3>
                <p>${post.category} - ${new Date(post.date).toLocaleDateString()}</p>
            </div>
            <div class="blog-actions">
                <button onclick="editBlogPost(${index})" class="edit-btn">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button onclick="deleteBlogPost(${index})" class="delete-btn">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        blogsList.appendChild(postItem);
    });
}

// Add new blog post
document.getElementById('addBlogForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const post = {
        id: Date.now().toString(),
        title: document.getElementById('blogTitle').value,
        category: document.getElementById('blogCategory').value,
        image: document.getElementById('blogImage').value,
        content: document.getElementById('blogContent').value,
        date: new Date().toISOString()
    };
    
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    posts.push(post);
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    
    this.reset();
    loadBlogPosts();
    showNotification('Blog post published successfully! ');
});

// Delete blog post
function deleteBlogPost(index) {
    if (confirm('Are you sure you want to delete this blog post?')) {
        const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        const deletedPost = posts[index];
        posts.splice(index, 1);
        localStorage.setItem('blogPosts', JSON.stringify(posts));
        loadBlogPosts();
        showNotification(`Blog post "${deletedPost.title}" has been deleted! `);
    }
}

// Edit blog post
function editBlogPost(index) {
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const post = posts[index];
    
    document.getElementById('blogTitle').value = post.title;
    document.getElementById('blogCategory').value = post.category;
    document.getElementById('blogImage').value = post.image;
    document.getElementById('blogContent').value = post.content;
    
    const form = document.getElementById('addBlogForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Post';
    
    form.onsubmit = function(e) {
        e.preventDefault();
        
        posts[index] = {
            ...post,
            title: document.getElementById('blogTitle').value,
            category: document.getElementById('blogCategory').value,
            image: document.getElementById('blogImage').value,
            content: document.getElementById('blogContent').value,
            lastEdited: new Date().toISOString()
        };
        
        localStorage.setItem('blogPosts', JSON.stringify(posts));
        
        this.reset();
        submitBtn.innerHTML = '<i class="fas fa-plus"></i> Publish Post';
        form.onsubmit = null;
        
        loadBlogPosts();
        showNotification('Blog post updated successfully! ');
    };
}

// Load clients
function loadClients() {
    const clientsList = document.getElementById('clientsList');
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    
    clientsList.innerHTML = '';
    
    if (clients.length === 0) {
        clientsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-users"></i>
                <h3>No Clients Yet</h3>
                <p>Clients who sign in to your website will appear here.</p>
            </div>
        `;
        return;
    }
    
    clients.forEach((client, index) => {
        const clientItem = document.createElement('div');
        clientItem.className = 'client-item';
        clientItem.innerHTML = `
            <div class="client-info">
                <img src="${client.imageUrl}" alt="${client.name}" class="client-image">
                <div class="client-details">
                    <h3>${client.name}</h3>
                    <p>${client.email}</p>
                    <span class="client-date">Joined: ${new Date(client.signInDate).toLocaleDateString()}</span>
                </div>
            </div>
            <div class="client-actions">
                <button onclick="viewClientDetails(${index})" class="view-btn">
                    <i class="fas fa-eye"></i> View Details
                </button>
                <button onclick="removeClient(${index})" class="delete-btn">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        `;
        clientsList.appendChild(clientItem);
    });
}

// View client details
function viewClientDetails(index) {
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    const client = clients[index];
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Client Details</h2>
                <button onclick="this.closest('.modal').remove()" class="close-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="client-profile">
                    <img src="${client.imageUrl}" alt="${client.name}" class="client-image-large">
                    <div class="client-info">
                        <h3>${client.name}</h3>
                        <p>${client.email}</p>
                        <p>Member since: ${new Date(client.signInDate).toLocaleDateString()}</p>
                    </div>
                </div>
                <div class="client-activity">
                    <h4>Recent Activity</h4>
                    <p>Last login: ${new Date().toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Remove client
function removeClient(index) {
    if (confirm('Are you sure you want to remove this client?')) {
        const clients = JSON.parse(localStorage.getItem('clients')) || [];
        const removedClient = clients[index];
        clients.splice(index, 1);
        localStorage.setItem('clients', JSON.stringify(clients));
        loadClients();
        showNotification(`Client "${removedClient.name}" has been removed`);
    }
}

// Logout
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'admin.html';
    showNotification('Logged out successfully! ', 'info');
});

// Check auth and load content when page loads
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadProjects();
    loadBlogPosts();
    loadClients();
});
