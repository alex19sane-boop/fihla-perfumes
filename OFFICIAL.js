document.addEventListener("DOMContentLoaded", () => {

    // Get cart from localStorage or create empty cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartDisplay = document.getElementById("cart-count");
    const buttons = document.querySelectorAll(".addToCart");

    // 🔢 Update cart icon count
    function updateCartCount() {
        let totalQty = 0;

        cart.forEach(item => {
            totalQty += item.quantity;
        });

        cartDisplay.textContent = totalQty;
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // 🛒 Add to cart function
    function addToCart(product) {
        // Check if product already exists
        let existing = cart.find(item => item.name === product.name);

        if (existing) {
            existing.quantity += 1; // increase quantity
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        updateCartCount();
    }

    // 🎯 Button click events
    buttons.forEach(button => {
        button.addEventListener("click", () => {

            const productElement = button.closest(".product");

            const name = productElement.querySelector("h3").textContent;
            const price = productElement.querySelector(".prices").dataset.price;
            const image = productElement.querySelector("img").src;

            const product = {
                name: name,
                price: price,
                image: image
            };

            addToCart(product);

            // 🔥 small animation
            cartDisplay.classList.add("pop");
            setTimeout(() => {
                cartDisplay.classList.remove("pop");
            }, 200);
        });
    });

    // Load cart on page start
    updateCartCount();
});