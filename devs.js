/**
 * Lógica para a página Devs Open to Work
 * Filtros dinâmicos e seleção múltipla de tags
 */

(function() {
    const DEVS_JSON_URL = 'https://comunidadejavaribeiraopreto.github.io/site/devs.json';
    let allDevs = [];
    let selectedTags = new Set(); // Armazena as tags selecionadas para filtro múltiplo

    async function init() {
        const devsGrid = document.getElementById('devs-grid');
        if (!devsGrid) return;

        try {
            const response = await fetch(DEVS_JSON_URL);
            if (!response.ok) throw new Error('Falha ao carregar JSON');
            
            const data = await response.json();
            allDevs = Array.isArray(data) ? data : (data.devs || []);
            
            if (!allDevs || allDevs.length === 0) {
                devsGrid.innerHTML = '<div class="no-devs"><h3>Nenhum desenvolvedor disponível no momento.</h3></div>';
                return;
            }

            // 1. Gerar botões de filtro dinamicamente
            renderFilterTags(allDevs);
            
            // 2. Renderizar lista inicial
            render(allDevs);
            
            // 3. Configurar busca
            setupSearch();

        } catch (error) {
            console.error('Erro no init:', error);
            devsGrid.innerHTML = `<div class="no-devs"><h3>Erro ao carregar dados.</h3><p>${error.message}</p></div>`;
        }
    }

    function renderFilterTags(devs) {
        const filterContainer = document.querySelector('.filter-tags');
        if (!filterContainer) return;

        // Extrair todas as tags únicas do JSON
        const tags = new Set();
        devs.forEach(dev => {
            if (dev.tags && Array.isArray(dev.tags)) {
                dev.tags.forEach(tag => tags.add(tag));
            }
        });

        // Ordenar tags alfabeticamente
        const sortedTags = Array.from(tags).sort((a, b) => a.localeCompare(b));

        // Limpar container e adicionar botão "Todas"
        filterContainer.innerHTML = '<button class="tag-filter active" data-tag="all">Todas</button>';

        // Adicionar botões para cada tag encontrada
        sortedTags.forEach(tag => {
            const btn = document.createElement('button');
            btn.className = 'tag-filter';
            btn.textContent = tag;
            btn.setAttribute('data-tag', tag);
            
            btn.addEventListener('click', () => {
                toggleTag(tag, btn);
            });
            
            filterContainer.appendChild(btn);
        });

        // Event listener para o botão "Todas"
        const allBtn = filterContainer.querySelector('[data-tag="all"]');
        allBtn.addEventListener('click', () => {
            selectedTags.clear();
            document.querySelectorAll('.tag-filter').forEach(b => b.classList.remove('active'));
            allBtn.classList.add('active');
            applyFilters();
        });
    }

    function toggleTag(tag, btn) {
        const allBtn = document.querySelector('.tag-filter[data-tag="all"]');
        
        if (selectedTags.has(tag)) {
            selectedTags.delete(tag);
            btn.classList.remove('active');
        } else {
            selectedTags.add(tag);
            btn.classList.add('active');
            if (allBtn) allBtn.classList.remove('active');
        }

        // Se nenhuma tag estiver selecionada, ativa o "Todas"
        if (selectedTags.size === 0 && allBtn) {
            allBtn.classList.add('active');
        }

        applyFilters();
    }

    function setupSearch() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', applyFilters);
        }
    }

    function applyFilters() {
        const searchInput = document.getElementById('search-input');
        const term = searchInput ? searchInput.value.toLowerCase() : '';

        const filtered = allDevs.filter(dev => {
            const name = (dev.nome || '').toLowerCase();
            const desc = (dev.descricao || '').toLowerCase();
            const devTags = (dev.tags || []).map(t => t.toLowerCase());
            
            // Filtro de busca (nome, descrição ou qualquer tag)
            const matchesSearch = name.includes(term) || 
                                 desc.includes(term) ||
                                 devTags.some(t => t.includes(term));
            
            // Filtro de tags múltiplas (deve conter TODAS as tags selecionadas)
            const matchesTags = selectedTags.size === 0 || 
                               Array.from(selectedTags).every(tag => 
                                   devTags.includes(tag.toLowerCase())
                               );
            
            return matchesSearch && matchesTags;
        });

        render(filtered);
    }

    function render(devs) {
        const devsGrid = document.getElementById('devs-grid');
        if (!devsGrid) return;

        if (devs.length === 0) {
            devsGrid.innerHTML = `
                <div class="no-devs">
                    <h3>Nenhum desenvolvedor encontrado</h3>
                    <p>Tente ajustar sua busca ou remover alguns filtros.</p>
                </div>
            `;
            return;
        }

        devsGrid.innerHTML = devs.map(dev => `
            <div class="dev-card">
                <div class="dev-header">
                    <img src="${dev.foto}" alt="${dev.nome}" class="dev-avatar" onerror="this.src='https://via.placeholder.com/150/0066ff/ffffff?text=${dev.nome.charAt(0)}'">
                    <div class="dev-info">
                        <h3>${dev.nome}</h3>
                        <div class="dev-tags">
                            ${(dev.tags || []).map(tag => `<span class="dev-tag">#${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
                <p class="dev-description">${dev.descricao || ''}</p>
                <div class="dev-actions">
                    <a href="${dev.linkedin || '#'}" target="_blank" rel="noopener" class="btn-linkedin">
                        <span class="btn-icon">🔗</span> Ver LinkedIn
                    </a>
                </div>
            </div>
        `).join('');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
