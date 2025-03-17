const getCategories =  async()=> {

    const {data} = await axios.get("https://fakestoreapi.com/products/categories");
    
    return data;


}


const displayCategories = async  ()=> {

    const categoriesLoader = document.querySelector(".categories .row");

    categoriesLoader.innerHTML = `<p>Loading categories ..... </p>`;

    const categories = await getCategories();

    const result = categories.map(category =>
         ` 
        <div class = 'category' > 
          <h2>${category}</h2>
          <a href="./details.html?category=${category}" >details</a>
        </div> 
        `
        
    ).join( ' ' );


    categoriesLoader.innerHTML = result;
}


document.addEventListener("DOMContentLoaded", displayCategories);