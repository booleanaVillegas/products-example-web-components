class ProductComponent extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    // this is how you declare which props are you interested in
    static get observedAttributes() {
        return ['name', 'description', 'price', 'category', 'subcategory'];
    }

    attributeChangedCallback(propName, oldValue, newValue) {
        this[propName] = newValue;
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/src/components/productComponent/styles.css">
        <article class="product">
                <h3>${this.name}</h3>
                <h3>$ ${this.price}</h3>
                <p>${this.description}</p>
                <h4>${this.category}</h4>
                <h4>${this.subcategory}</h4>
            </article>`
    }

}

customElements.define('product-component', ProductComponent)
export default ProductComponent;