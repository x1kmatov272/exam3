const productList = document.getElementById('product-list');
    const loader = document.getElementById('loader');
    const categorySelect = document.getElementById('category');
    const sortSelect = document.getElementById('sort');
    const searchInput = document.getElementById('search');
    let products = [];

    async function fetchProducts() {
      const res = await fetch('https://fakestoreapi.com/products');
      products = await res.json();
      renderProducts();
    }

    function renderProducts() {
      loader.style.display = 'none';
      productList.style.display = 'grid';

      let filtered = [...products];

      const selectedCategory = categorySelect.value;
      const searchQuery = searchInput.value.toLowerCase();
      const sortOrder = sortSelect.value;

      if (selectedCategory !== 'all') {
        filtered = filtered.filter(p => p.category === selectedCategory);
      }

      if (searchQuery) {
        filtered = filtered.filter(p => p.title.toLowerCase().includes(searchQuery));
      }

      filtered.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);

      productList.innerHTML = filtered.map(p => `
        <div class="product">
          <img src="${p.image}" alt="${p.title}">
          <h4>${p.title}</h4>
          <p>Kategoriya: ${p.category}</p>
          <p style="color:#2563eb;font-weight:bold">Narxi: $${p.price}</p>
        </div>
      `).join('');
    }

    categorySelect.addEventListener('change', renderProducts);
    sortSelect.addEventListener('change', renderProducts);
    searchInput.addEventListener('input', renderProducts);

    fetchProducts();
    const toggleButton = document.getElementById('dark-toggle');

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
    toggleButton.textContent = '☀️ Light Mode';
  } else {
    localStorage.setItem('theme', 'light');
    toggleButton.textContent = '🌙 Dark Mode';
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    toggleButton.textContent = '☀️ Light Mode';
  }
});
    