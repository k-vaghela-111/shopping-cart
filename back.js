document.addEventListener('DOMContentLoaded', () => {
    
    const products = [
        { id: 1, name: "Product 1", price: 29.99 },
        { id: 2, name: "Product 2", price: 59.99 },
        { id: 3, name: "Product 3", price: 19.99 },
        { id: 4, name: "Product 4", price: 19.99 },
        { id: 5, name: "Product 5", price: 19.99 },
    ];

    let cart = [];
     
    const product_list = document.getElementById('product-list');
    const cart_item = document.getElementById('cart-item');
    const empty_cartmsg = document.getElementById('empty-cart');
    const cart_total = document.getElementById('cart-total');
    const total_price = document.getElementById('total-price');
    const checkout = document.getElementById('checkout');

    products.forEach((product) => {
        const product_div = document.createElement('div');
        product_div.classList.add("product");

        product_div.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add To Cart</button>
        `
        product_list.appendChild(product_div);
    })
    
    document.addEventListener('click', (e) => {
    if (e.target.tagName === "BUTTON") {
        const product_id = parseInt(e.target.getAttribute("data-id"));

        if (e.target.textContent === "Add To Cart") {
            const product = products.find(p => p.id === product_id);
            Addtocart(product);
            render();
        }

        if (e.target.classList.contains("delete-btn")) {
            removeFromCart(product_id);
            render();
        }
    }
   });


    function Addtocart(product)
    {
        cart.push(product);
    }

    function render()
    {
    cart_item.innerHTML = ""; // Clear previous items
    let totalPrice = 0;

    if (cart.length > 0) {
        empty_cartmsg.classList.add("hide");
        cart_total.classList.remove("hide");

        cart.forEach((item) => {
            totalPrice += item.price;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <button class="delete-btn" data-id="${item.id}">Remove</button>
            `;

            cart_item.appendChild(cartItem);
        });

        total_price.textContent = `$${totalPrice.toFixed(2)}`;
    }
    else
    {
        empty_cartmsg.classList.remove("hide");
        cart_total.classList.add("hide");
        total_price.textContent=`$0`
        };
    };

    checkout.addEventListener('click', () => {
        cart.length = 0;
        alert("checkout successfully.");
        render();
    })

     function removeFromCart(id) {
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
        cart.splice(index, 1); // Removes only one item with that ID
    }
}



})