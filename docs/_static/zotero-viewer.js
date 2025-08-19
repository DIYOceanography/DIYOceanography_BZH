// Visualiseur de bibliothèque Zotero pour DIY Oceanography BZH
class ZoteroViewer {
    constructor() {
        this.groupId = '6090995';
        this.items = [];
        this.filteredItems = [];
        this.collections = [];
        this.itemCollections = new Map(); // Map item keys to collection keys
    }

    async init() {
        // Attendre que le DOM soit prêt
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }

    async start() {
        await this.loadCollections();
        await this.loadItems();
        this.setupEventListeners();
        this.populateFilters();
        this.displayItems();
    }

    async loadCollections() {
        try {
            const response = await fetch(
                `https://api.zotero.org/groups/${this.groupId}/collections?format=json`
            );
            
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            
            this.collections = await response.json();
            
            // Load collection items mapping
            for (const collection of this.collections) {
                const itemsResponse = await fetch(
                    `https://api.zotero.org/groups/${this.groupId}/collections/${collection.key}/items?format=keys`
                );
                
                if (itemsResponse.ok) {
                    const itemKeys = await itemsResponse.text();
                    const keys = itemKeys.split('\n').filter(key => key.trim());
                    
                    keys.forEach(key => {
                        if (!this.itemCollections.has(key)) {
                            this.itemCollections.set(key, []);
                        }
                        this.itemCollections.get(key).push(collection.key);
                    });
                }
            }
            
        } catch (error) {
            console.error('Error loading collections:', error);
        }
    }

    async loadItems() {
        try {
            let allItems = [];
            let start = 0;
            const limit = 100;
            
            while (true) {
                const response = await fetch(
                    `https://api.zotero.org/groups/${this.groupId}/items?start=${start}&limit=${limit}&format=json&include=data`
                );
                
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                
                const items = await response.json();
                
                if (items.length === 0) break;
                
                allItems = allItems.concat(items);
                start += limit;
            }

            this.items = allItems.filter(item => 
                item.data.itemType !== 'attachment' && 
                item.data.itemType !== 'note'
            );
            this.filteredItems = [...this.items];
            
            const loadingEl = document.getElementById('zotero-loading');
            const bibliographyEl = document.getElementById('zotero-bibliography');
            
            if (loadingEl) loadingEl.style.display = 'none';
            if (bibliographyEl) bibliographyEl.style.display = 'block';
            
        } catch (error) {
            console.error('Erreur lors du chargement:', error);
            
            const loadingEl = document.getElementById('zotero-loading');
            const errorEl = document.getElementById('zotero-error');
            
            if (loadingEl) loadingEl.style.display = 'none';
            if (errorEl) {
                errorEl.textContent = `Erreur lors du chargement de la bibliothèque: ${error.message}`;
                errorEl.style.display = 'block';
            }
        }
    }

    setupEventListeners() {
        const searchInput = document.getElementById('zotero-searchInput');
        const collectionFilter = document.getElementById('zotero-collectionFilter');
        const typeFilter = document.getElementById('zotero-typeFilter');
        const yearFilter = document.getElementById('zotero-yearFilter');
        const sortBy = document.getElementById('zotero-sortBy');
        const sortOrder = document.getElementById('zotero-sortOrder');

        if (searchInput) searchInput.addEventListener('input', () => this.applyFilters());
        if (collectionFilter) collectionFilter.addEventListener('change', () => this.applyFilters());
        if (typeFilter) typeFilter.addEventListener('change', () => this.applyFilters());
        if (yearFilter) yearFilter.addEventListener('change', () => this.applyFilters());
        if (sortBy) sortBy.addEventListener('change', () => this.applyFilters());
        if (sortOrder) sortOrder.addEventListener('change', () => this.applyFilters());
    }

    populateFilters() {
        // Collections
        const collectionFilter = document.getElementById('zotero-collectionFilter');
        if (collectionFilter && this.collections.length > 0) {
            this.collections
                .filter(collection => collection.data.name) // Only collections with names
                .sort((a, b) => a.data.name.localeCompare(b.data.name))
                .forEach(collection => {
                    const option = document.createElement('option');
                    option.value = collection.key;
                    option.textContent = collection.data.name;
                    collectionFilter.appendChild(option);
                });
        }

        // Types de documents
        const types = [...new Set(this.items.map(item => item.data.itemType))].sort();
        const typeFilter = document.getElementById('zotero-typeFilter');
        
        if (typeFilter) {
            types.forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = this.translateItemType(type);
                typeFilter.appendChild(option);
            });
        }

        // Années
        const years = [...new Set(this.items.map(item => {
            const date = item.data.date || item.data.dateAdded;
            const year = date ? new Date(date).getFullYear() : null;
            return year && !isNaN(year) ? year : null;
        }).filter(Boolean))].sort((a, b) => b - a);
        
        const yearFilter = document.getElementById('zotero-yearFilter');
        if (yearFilter) {
            years.forEach(year => {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                yearFilter.appendChild(option);
            });
        }
    }

    applyFilters() {
        const searchInput = document.getElementById('zotero-searchInput');
        const collectionFilter = document.getElementById('zotero-collectionFilter');
        const typeFilter = document.getElementById('zotero-typeFilter');
        const yearFilter = document.getElementById('zotero-yearFilter');
        const sortBy = document.getElementById('zotero-sortBy');
        const sortOrder = document.getElementById('zotero-sortOrder');

        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const collectionFilterValue = collectionFilter ? collectionFilter.value : '';
        const typeFilterValue = typeFilter ? typeFilter.value : '';
        const yearFilterValue = yearFilter ? yearFilter.value : '';
        const sortByValue = sortBy ? sortBy.value : 'title';
        const sortOrderValue = sortOrder ? sortOrder.value : 'asc';

        this.filteredItems = this.items.filter(item => {
            // Collection filter
            if (collectionFilterValue) {
                const itemCollections = this.itemCollections.get(item.key) || [];
                if (!itemCollections.includes(collectionFilterValue)) return false;
            }

            // Filtre de recherche
            if (searchTerm) {
                const searchableText = [
                    item.data.title || '',
                    (item.data.creators || []).map(c => `${c.firstName || ''} ${c.lastName || ''}`).join(' '),
                    item.data.abstractNote || '',
                    item.data.publicationTitle || '',
                    (item.data.tags || []).map(t => t.tag).join(' ')
                ].join(' ').toLowerCase();
                
                if (!searchableText.includes(searchTerm)) return false;
            }

            // Filtre de type
            if (typeFilterValue && item.data.itemType !== typeFilterValue) return false;

            // Filtre d'année
            if (yearFilterValue) {
                const date = item.data.date || item.data.dateAdded;
                const year = date ? new Date(date).getFullYear() : null;
                if (!year || year.toString() !== yearFilterValue) return false;
            }

            return true;
        });

        // Tri
        this.filteredItems.sort((a, b) => {
            let aValue, bValue;
            
            switch (sortByValue) {
                case 'title':
                    aValue = (a.data.title || '').toLowerCase();
                    bValue = (b.data.title || '').toLowerCase();
                    break;
                case 'date':
                    aValue = new Date(a.data.date || a.data.dateAdded || 0);
                    bValue = new Date(b.data.date || b.data.dateAdded || 0);
                    break;
                case 'creator':
                    aValue = a.data.creators && a.data.creators[0] ? 
                        `${a.data.creators[0].lastName || ''} ${a.data.creators[0].firstName || ''}`.toLowerCase() : '';
                    bValue = b.data.creators && b.data.creators[0] ? 
                        `${b.data.creators[0].lastName || ''} ${b.data.creators[0].firstName || ''}`.toLowerCase() : '';
                    break;
            }

            if (sortOrderValue === 'desc') {
                return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
            } else {
                return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
            }
        });

        this.displayItems();
        this.updateStats();
    }

    displayItems() {
        const container = document.getElementById('zotero-bibliography');
        if (!container) return;
        
        if (this.filteredItems.length === 0) {
            container.innerHTML = '<div class="zotero-no-results">Aucun résultat trouvé</div>';
            return;
        }

        container.innerHTML = this.filteredItems.map(item => this.renderItem(item)).join('');
    }

    renderItem(item) {
        const data = item.data;
        const title = data.title || 'Sans titre';
        const creators = this.formatCreators(data.creators || []);
        const details = this.formatDetails(data);
        const abstractNote = data.abstractNote || '';
        const tags = data.tags || [];
        const itemTypeLabel = this.translateItemType(data.itemType);
        
        return `
            <div class="zotero-reference">
                <div class="zotero-item-type-badge">${itemTypeLabel}</div>
                <div class="zotero-reference-title">${this.escapeHtml(title)}</div>
                ${creators ? `<div class="zotero-reference-authors">${this.escapeHtml(creators)}</div>` : ''}
                ${details ? `<div class="zotero-reference-details">${details}</div>` : ''}
                ${abstractNote ? `<div class="zotero-reference-abstract">${this.escapeHtml(abstractNote)}</div>` : ''}
                ${tags.length > 0 ? `<div class="zotero-tags">${tags.map(tag => `<span class="zotero-tag">${this.escapeHtml(tag.tag)}</span>`).join('')}</div>` : ''}
                <a href="https://www.zotero.org/groups/6090995/diy_oceanography_bzh/items/${item.key}" class="zotero-link" target="_blank">
                    Voir dans Zotero →
                </a>
            </div>
        `;
    }

    formatCreators(creators) {
        if (!creators.length) return '';
        
        return creators.map(creator => {
            if (creator.name) return creator.name;
            return `${creator.firstName || ''} ${creator.lastName || ''}`.trim();
        }).filter(name => name).join(', ');
    }

    formatDetails(data) {
        const parts = [];
        
        if (data.publicationTitle) parts.push(data.publicationTitle);
        if (data.volume) parts.push(`Vol. ${data.volume}`);
        if (data.issue) parts.push(`No. ${data.issue}`);
        if (data.pages) parts.push(`p. ${data.pages}`);
        if (data.date) {
            const year = new Date(data.date).getFullYear();
            if (!isNaN(year)) parts.push(`(${year})`);
        }
        if (data.publisher) parts.push(data.publisher);
        if (data.url) parts.push(`<a href="${data.url}" target="_blank">Lien</a>`);
        
        return parts.join(' · ');
    }

    translateItemType(type) {
        const translations = {
            'journalArticle': 'Article de journal',
            'book': 'Livre',
            'bookSection': 'Chapitre de livre',
            'thesis': 'Thèse',
            'conferencePaper': 'Communication',
            'webpage': 'Page web',
            'report': 'Rapport',
            'manuscript': 'Manuscrit',
            'patent': 'Brevet',
            'blogPost': 'Article de blog',
            'videoRecording': 'Enregistrement vidéo',
            'dataset': 'Jeu de données'
        };
        return translations[type] || type;
    }

    updateStats() {
        const total = this.items.length;
        const filtered = this.filteredItems.length;
        const statsEl = document.getElementById('zotero-stats');
        
        if (!statsEl) return;
        
        if (filtered === total) {
            statsEl.textContent = `${total} référence${total > 1 ? 's' : ''}`;
        } else {
            statsEl.textContent = `${filtered} référence${filtered > 1 ? 's' : ''} sur ${total}`;
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialisation automatique
const zoteroViewer = new ZoteroViewer();
zoteroViewer.init();