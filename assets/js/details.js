
const productsContainer = document.querySelector(".products .row");

const paginationContainer = document.createElement("div"); 

paginationContainer.classList.add("pagination");

document.querySelector(".products .container").appendChild(paginationContainer);

const itemsPerPage = 4;

let currentPage = 1;

let productsData = [];


const getCategoriesProducts = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = urlParams.get('category');


    const { data } = await axios.get(`https://fakestoreapi.com/products/category/${categoryName}`);
    return data;
    
};


const displayProducts = async () => {
    productsContainer.innerHTML = `<p>Loading products...</p>`; 

    productsData = await getCategoriesProducts();
    
    renderProducts();
    setupPagination();
};


const renderProducts = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProducts = productsData.slice(start, end);

    productsContainer.innerHTML = paginatedProducts.map(product =>
        `
        <div class="product">
            <img src="${product.image}" alt="${product.title}"/>
            <h2>${product.title}</h2>
            <p>${product.description.substring(0, 100)}...</p>
            <p>$${product.price}</p>
        </div>
        `
    ).join('');
};


const setupPagination = () => {
    const totalPages = Math.ceil(productsData.length / itemsPerPage);
    paginationContainer.innerHTML = ""; 

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.innerText = i;
        pageButton.classList.add("page-btn");

        if (i === currentPage) {
            pageButton.classList.add("active");
        }

        pageButton.addEventListener("click", () => {
            currentPage = i;
            renderProducts();
            updateActivePage();
        });

        paginationContainer.appendChild(pageButton);
    }
};


const updateActivePage = () => {
    document.querySelectorAll(".page-btn").forEach(button => {
        button.classList.remove("active");
    });

    document.querySelectorAll(".page-btn")[currentPage - 1].classList.add("active");
};

document.addEventListener("DOMContentLoaded", displayProducts);
