import './components/productComponent/productComponent.js'
import './components/filtersComponent/filtersComponent.js'
import { products } from './products.js'

// Creo referencias globales
const productsContainer = document.querySelector('#products-container')
const filterComponent = document.querySelector('filters-component')

filterComponent.addEventListener('filter', (e) => renderProducts(e))

// llamo metodos de inicio
renderProducts()
getProductSubcategory()

function getProductSubcategory() {
    const subcategories = []
    products.forEach((elem)=>{
        if(!subcategories.includes(elem.subcategory)){
            subcategories.push(elem.subcategory)
        }
    })
    // console.log(subcategories)

    filterComponent.setAttribute('subcategories', subcategories)
}

// creo todos los metodos generales de la app
function renderProducts(event) {

    console.log(event)

    const category = event? event.detail.category: null
    const subcategory = event? event.detail.subcategory: null

    let filteredProducts= []
    productsContainer.innerHTML = ''

    if (!category || category === 'all') {
        filteredProducts = products
    }else{
        filteredProducts = products.filter(prod => (prod.category === category && prod.subcategory === subcategory) )
    }

    filteredProducts.forEach(product => {
        const productElem = document.createElement('product-component')
        productElem.setAttribute('name', product.name);
        productElem.setAttribute('description', product.description)
        productElem.setAttribute('category', product.category)
        productElem.setAttribute('subcategory', product.subcategory)
        productElem.setAttribute('price', product.price)

        productsContainer.appendChild(productElem)
    });

}