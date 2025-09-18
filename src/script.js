const root = document.querySelector(':root');
const sleep = ms => new Promise(r => setTimeout(r, ms));

styles = {
    '--topbar-height': 8,
    '--topbar-height-max': 16,
    '--topbar-height-min': 8,
    '--categories-height': 0 //8
}

Object.keys(styles).forEach((style) => {root.style.setProperty(style, styles[style]+'vh');});

document.addEventListener('DOMContentLoaded', () => {
    document.body.hidden = false
    grid = document.getElementById('product-grid')
    for (key in stock){
        grid.appendChild(productListing(key));
    }
})

document.addEventListener('scroll', adjustments)

document.addEventListener('resize', adjustments)

function adjustments(){
    adjustTopbarHeight(window.scrollY)
    adjustCategoriesShadowOpacity(window.scrollY)
}

function adjustTopbarHeight(px){
    resistance = 1
    root.style.setProperty('--topbar-height', String(Math.max(((window.innerHeight*styles['--topbar-height-max']/100) - px/resistance), window.innerHeight*styles['--topbar-height-min']/100)+"px"));
}

function adjustCategoriesShadowOpacity(fl){
    maxOpacity = 0.8
    root.style.setProperty('--categories-shadow-opacity', Math.min(fl/(window.innerHeight*styles['--categories-height']/100), maxOpacity))
}

function updateProductList(){
    productGrid = document.getElementById('product-grid');

}

function productListing(id){
    if (id in stock){
        prod = stock[id]
        product = document.createElement("div")
        product.id = id;
        product.className = 'product';
        imgClass = ""
        mrpStyle = ""
        if(prod.mrp == ""){
            mrpStyle = '"display: none;"'
        }
        if(prod.stock <= 0){
            stockText = "OUT OF STOCK"
            stockClass = "out-of-stock"
            imgClass = "hidden"
        }
        else if(prod.stock <= 2){
            stockText = "FEW IN STOCK"
            stockClass = "low-stock"
        }
        else {
            stockText = "IN STOCK"
            stockClass = "in-stock"
        }
        product.innerHTML =
        `<div class="product-image-container">
            <img src="/src/assets/${prod.image}" class="product-image ${imgClass}">
        </div>
        <div class="product-stock-container ${stockClass}">
            <span class="product-stock">${stockText}</span>
        </div>
        <div class="product-info-container">
            <div class="product-title">
                <span class="product-title-name">${prod.name}</span>
            </div>
            <div class="product-pricing">
                <span class="product-pricing-price">₹${prod.price}</span>
                <span class="product-pricing-mrp" style=${mrpStyle}>MRP <del>₹${prod.mrp}</del></span>
            </div>
        </div>`
        return product;
    }
}

adjustTopbarHeight(window.scrollY)
adjustCategoriesShadowOpacity(window.scrollY)
