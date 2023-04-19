class FiltersComponent extends HTMLElement {

    constructor() {
        super();
        this.category = ''
        this.subcategory = ''
    }

    static get observedAttributes() {
        return ['subcategories'];
    }   

    attributeChangedCallback(propName, oldValue, newValue) {
        this[propName] = newValue;
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <section id="categories">
            <div id="categories-buttons">
            <button type="button">All</button>
            <button type="button">Accessories</button>
            <button type="button">Apparel</button>
            <button type="button">Office</button>
            <button type="button">Drinkware</button>
            </div>
            <div id="categories-dropdowns">
            <select name="subcategory">
                <option>All</option>
            </select>
            </div>
        </section>`

        // console.log(this.subcategories)
        const subCategoryArray = this.subcategories? this.subcategories.split(','): []

        const dropdownSubCat = this.querySelector('select')

        subCategoryArray.forEach((subcat)=>{
            const newOption = document.createElement('option')
            newOption.textContent = subcat
            dropdownSubCat.append(newOption)
        })


        const categoryButtons = document.querySelectorAll('#categories button')
        categoryButtons.forEach(btn => btn.addEventListener('click', () => this.setCategory(btn)))
        dropdownSubCat.addEventListener('change', ()=> this.setSubcategory(dropdownSubCat))

    }

    filterEvent(){
        const filterEvent = new CustomEvent('filter', { detail : {
            category: this.category,
            subcategory: this.subcategory
        } })
        this.dispatchEvent(filterEvent)
    }

    setSubcategory(elem){
        //console.log(elem.value)
        this.subcategory = elem.value
        this.filterEvent()
    }

    setCategory(elem) {
        const category = elem.textContent.toLowerCase()
        // renderProducts(category)
        //console.log(category)
        this.category = category
       this.filterEvent()

    }

}

customElements.define('filters-component', FiltersComponent)
export default FiltersComponent;