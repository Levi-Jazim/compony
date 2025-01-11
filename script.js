// Load projects from localStorage
function loadProjects() {
    const projectContainer = document.getElementById('projectContainer');
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    
    // If there are no projects, show the empty state message
    if (!projects || projects.length === 0) {
        projectContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-folder-open"></i>
                <h3>No Projects Available</h3>
                <p>Check back later for new projects!</p>
            </div>
        `;
        return;
    }
    
    projectContainer.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card project-item';
        projectCard.setAttribute('data-category', project.type);
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <span class="project-type">${project.type === 'game' ? 'Game Development' : 'Web Development'}</span>
            </div>
        `;
        projectContainer.appendChild(projectCard);
    });
}

// Load projects when the page loads
document.addEventListener('DOMContentLoaded', loadProjects);

// Project Filtering and Search
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectSearch = document.getElementById('projectSearch');
    const projectItems = document.querySelectorAll('.project-item');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    let visibleItems = 6; // Number of items to show initially
    const increment = 3; // Number of additional items to load

    // Filter projects
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            let hasVisibleItems = false;
            
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || filter === category) {
                    item.style.display = '';
                    hasVisibleItems = true;
                } else {
                    item.style.display = 'none';
                }
            });

            // Show "No Projects" message if no items match the filter
            const projectContainer = document.getElementById('projectContainer');
            const emptyState = projectContainer.querySelector('.empty-state');
            
            if (!hasVisibleItems) {
                if (!emptyState) {
                    const noProjectsMessage = document.createElement('div');
                    noProjectsMessage.className = 'empty-state';
                    noProjectsMessage.innerHTML = `
                        <i class="fas fa-filter"></i>
                        <h3>No Projects Found</h3>
                        <p>No projects match the selected filter.</p>
                    `;
                    projectContainer.appendChild(noProjectsMessage);
                }
            } else if (emptyState) {
                emptyState.remove();
            }

            // Reset visible items count
            visibleItems = 6;
            updateVisibility();
        });
    });

    // Search projects
    if (projectSearch) {
        projectSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            let hasResults = false;
            
            projectItems.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const description = item.querySelector('p').textContent.toLowerCase();
                const tags = Array.from(item.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
                
                if (title.includes(searchTerm) || 
                    description.includes(searchTerm) || 
                    tags.some(tag => tag.includes(searchTerm))) {
                    item.style.display = '';
                    hasResults = true;
                } else {
                    item.style.display = 'none';
                }
            });

            // Show "No Projects" message if no items match the search
            const projectContainer = document.getElementById('projectContainer');
            const emptyState = projectContainer.querySelector('.empty-state');
            
            if (!hasResults) {
                if (!emptyState) {
                    const noResultsMessage = document.createElement('div');
                    noResultsMessage.className = 'empty-state';
                    noResultsMessage.innerHTML = `
                        <i class="fas fa-search"></i>
                        <h3>No Projects Found</h3>
                        <p>No projects match your search criteria.</p>
                    `;
                    projectContainer.appendChild(noResultsMessage);
                }
            } else if (emptyState) {
                emptyState.remove();
            }

            // Reset visible items count
            visibleItems = 6;
            updateVisibility();
        });
    }

    // Load more functionality
    function updateVisibility() {
        let count = 0;
        projectItems.forEach(item => {
            if (item.style.display !== 'none') {
                if (count < visibleItems) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
                count++;
            }
        });

        // Show/hide load more button
        if (loadMoreBtn) {
            if (count > visibleItems) {
                loadMoreBtn.style.display = '';
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            visibleItems += increment;
            updateVisibility();
        });
    }

    // Initial visibility update
    updateVisibility();
});
