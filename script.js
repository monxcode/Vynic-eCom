     

        // DOM Elements
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const wishlistIcon = document.querySelector('.wishlist-icon');
        const cartIcon = document.querySelector('.cart-icon');
        const wishlistCount = document.querySelector('.wishlist-count');
        const cartCount = document.querySelector('.cart-count');
        const searchInput = document.getElementById('search-input');
        const categoryFilter = document.getElementById('category-filter');
        const priceFilter = document.getElementById('price-filter');
        const productsContainer = document.getElementById('products-container');
        const scrollToTopBtn = document.querySelector('.scroll-to-top');

        // Modal Elements
        const modals = document.querySelectorAll('.modal');
        const closeModalBtns = document.querySelectorAll('.close-modal');
        const wishlistModal = document.querySelector('.wishlist-modal');
        const cartModal = document.querySelector('.cart-modal');
        const productModal = document.querySelector('.product-modal');
        const checkoutModal = document.querySelector('.checkout-modal');
        const paymentModal = document.querySelector('.payment-modal');
        const successModal = document.querySelector('.success-modal');

        // Buttons
        const checkoutBtn = document.querySelector('.checkout-btn');
        const backToCartBtn = document.querySelector('.back-to-cart');
        const proceedToPaymentBtn = document.querySelector('.proceed-to-payment');
        const confirmOrderBtn = document.querySelector('.confirm-order');
        const continueShoppingBtn = document.querySelector('.continue-shopping');

        // Data Storage
        let wishlist = [];
        let cart = [];
        let products = [];

        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            initializeApp();
        });

        function initializeApp() {
            // Generate sample products
            generateProducts();

            // Set up event listeners
            setupEventListeners();

            // Update cart and wishlist counts
            updateCartCount();
            updateWishlistCount();
        }

        function generateProducts() {
            // In a real implementation, this would come from an API or database
            // For demo purposes, we'll generate product data
            products = [
                { id: 1, name: "Classic Denim Jacket", price: 1499, category: "men", rating: 4.5, description: "A timeless denim jacket perfect for casual outings. Made from premium quality denim with a comfortable fit." },
                { id: 2, name: "Floral Summer Dress", price: 1099, category: "women", rating: 4, description: "Beautiful floral print summer dress with a flowy silhouette. Perfect for warm weather and special occasions." },
                { id: 3, name: "Baggy Jeans", price: 1599, category: "men", rating: 5, description: "Comfortable slim-fit jeans in versatile colors. Ideal for both casual and semi-formal occasions." },
                { id: 4, name: "Casual T-Shirt", price: 799, category: "women", rating: 4.5, description: "Soft and comfortable casual t-shirt available in multiple colors. Perfect for everyday wear." },
                { id: 5, name: "Kids Printed T-Shirt", price: 899, category: "kids", rating: 4, description: "Fun printed t-shirt for kids, made from child-friendly materials that are soft and durable." },
                { id: 6, name: "Premium Leather Jacket", price: 3499, category: "men", rating: 4.5, description: "High-quality leather jacket with a modern cut. Offers both style and durability for years to come." },
                { id: 7, name: "Elegant Evening Gown", price: 2999, category: "women", rating: 5, description: "Stunning evening gown with elegant details. Perfect for formal events and special occasions." },
                { id: 8, name: "Kids Denim Jacket", price: 999, category: "kids", rating: 4, description: "Mini version of our classic denim jacket, designed specifically for kids with comfort in mind." },
                { id: 9, name: "Chealsa Boot's", price: 1999, category: "men", rating: 4, description: "Crafted for elegance and durability, these Chelsea Boots complete every modern outfit in style." }
            ];

            // Add more products to reach 25
            for (let i = 10; i <= 25; i++) {
                const categories = ["men", "women", "kids"];
                const category = categories[Math.floor(Math.random() * categories.length)];
                const price = Math.floor(Math.random() * 4000) + 500;
                const rating = Math.floor(Math.random() * 3) + 3; // 3-5 stars

                products.push({
                    id: i,
                    name: `Product ${i}`,
                    price: price,
                    category: category,
                    rating: rating,
                    description: `Description for product ${i}. This is a high-quality clothing item from 𝚅𝚢𝚗𝚒𝚌.`
                });
            }
        }

        function setupEventListeners() {
            // Hamburger menu toggle
            hamburger.addEventListener('click', function() {
                navLinks.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', function() {
                    navLinks.classList.remove('active');
                });
            });

            // Modal open/close functionality
            wishlistIcon.addEventListener('click', function() {
                openModal(wishlistModal);
                updateWishlistDisplay();
            });

            cartIcon.addEventListener('click', function() {
                openModal(cartModal);
                updateCartDisplay();
            });

            closeModalBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    closeAllModals();
                });
            });

            // Close modal when clicking outside
            modals.forEach(modal => {
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        closeAllModals();
                    }
                });
            });

            // Product actions
            document.addEventListener('click', function(e) {
                // Add to cart button
                if (e.target.classList.contains('add-to-cart') || e.target.parentElement.classList.contains('add-to-cart')) {
                    const productCard = e.target.closest('.product-card');
                    const productId = Array.from(productsContainer.children).indexOf(productCard) + 1;
                    addToCart(productId);

                    // Animate the product image flying to cart
                    if (productCard) {
                        animateProductToCart(productCard);
                    }
                }

                // Wishlist button
                if (e.target.classList.contains('wishlist-btn') || e.target.parentElement.classList.contains('wishlist-btn')) {
                    const productCard = e.target.closest('.product-card');
                    const productId = Array.from(productsContainer.children).indexOf(productCard) + 1;
                    toggleWishlist(productId);

                    // Update button appearance
                    const wishlistBtn = e.target.classList.contains('wishlist-btn') ? e.target : e.target.parentElement;
                    wishlistBtn.classList.toggle('active');
                    wishlistBtn.querySelector('i').classList.toggle('far');
                    wishlistBtn.querySelector('i').classList.toggle('fas');

                    // Pulse animation
                    wishlistBtn.classList.add('pulse');
                    setTimeout(() => {
                        wishlistBtn.classList.remove('pulse');
                    }, 500);
                }

                // View product button
                if (e.target.classList.contains('view-btn') || e.target.parentElement.classList.contains('view-btn')) {
                    const productCard = e.target.closest('.product-card');
                    const productId = Array.from(productsContainer.children).indexOf(productCard) + 1;
                    openProductModal(productId);
                }
            });

            // Search and filter functionality
            searchInput.addEventListener('input', filterProducts);
            categoryFilter.addEventListener('change', filterProducts);
            priceFilter.addEventListener('change', filterProducts);

            // Checkout flow
            checkoutBtn.addEventListener('click', function() {
                if (cart.length > 0) {
                    closeAllModals();
                    openModal(checkoutModal);
                }
            });

            backToCartBtn.addEventListener('click', function() {
                closeAllModals();
                openModal(cartModal);
            });

            proceedToPaymentBtn.addEventListener('click', function() {
                // Validate form
                const form = document.querySelector('.checkout-form');
                const inputs = form.querySelectorAll('input[required]');
                let isValid = true;

                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.style.borderColor = 'red';
                    } else {
                        input.style.borderColor = '';
                    }
                });

                if (isValid) {
                    closeAllModals();
                    openModal(paymentModal);
                } else {
                    alert('Please fill in all required fields.');
                }
            });

            // Payment method selection
            document.querySelectorAll('.payment-option').forEach(option => {
                option.addEventListener('click', function() {
                    document.querySelectorAll('.payment-option').forEach(opt => {
                        opt.classList.remove('active');
                    });
                    this.classList.add('active');
                });
            });

            confirmOrderBtn.addEventListener('click', function() {
                closeAllModals();

                // Generate random order ID
                const orderId = Math.floor(Math.random() * 100000);
                document.getElementById('order-id').textContent = orderId;

                // Update order summary
                updateOrderSummary();

                // Show success modal
                openModal(successModal);

                // Clear cart
                cart = [];
                updateCartCount();

                // Confetti effect (simplified)
                createConfetti();
            });

            continueShoppingBtn.addEventListener('click', function() {
                closeAllModals();
                window.location.href = '#shop';
            });

            // Scroll to top button
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    scrollToTopBtn.classList.add('active');
                } else {
                    scrollToTopBtn.classList.remove('active');
                }
            });

            scrollToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            // Contact form submission
            document.getElementById('contact-form').addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            });
        }

        function filterProducts() {
            const searchTerm = searchInput.value.toLowerCase();
            const categoryValue = categoryFilter.value;
            const priceValue = priceFilter.value;

            const productCards = document.querySelectorAll('.product-card');

            productCards.forEach(card => {
                const name = card.querySelector('.product-name').textContent.toLowerCase();
                const category = card.getAttribute('data-category');
                const price = parseInt(card.getAttribute('data-price'));

                let matchesSearch = name.includes(searchTerm);
                let matchesCategory = categoryValue === 'all' || category === categoryValue;
                let matchesPrice = true;

                if (priceValue !== 'all') {
                    const [min, max] = priceValue.split('-').map(val => {
                        if (val.endsWith('+')) {
                            return parseInt(val) || 0;
                        }
                        return parseInt(val) || 0;
                    });

                    if (priceValue.endsWith('+')) {
                        matchesPrice = price >= min;
                    } else {
                        matchesPrice = price >= min && price <= max;
                    }
                }

                if (matchesSearch && matchesCategory && matchesPrice) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;

            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    image: document.querySelector(`.product-card:nth-child(${productId}) .product-image img`).src
                });
            }

            updateCartCount();
            updateCartDisplay();

            // Bounce animation for cart icon
            cartIcon.classList.add('bounce');
            setTimeout(() => {
                cartIcon.classList.remove('bounce');
            }, 600);
        }

        function toggleWishlist(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;

            const existingIndex = wishlist.findIndex(item => item.id === productId);

            if (existingIndex !== -1) {
                wishlist.splice(existingIndex, 1);
            } else {
                wishlist.push({
                    id: productId,
                    name: product.name,
                    price: product.price,
                    image: document.querySelector(`.product-card:nth-child(${productId}) .product-image img`).src
                });
            }

            updateWishlistCount();
            updateWishlistDisplay();

            // Bounce animation for wishlist icon
            wishlistIcon.classList.add('bounce');
            setTimeout(() => {
                wishlistIcon.classList.remove('bounce');
            }, 600);
        }

        function updateCartCount() {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
        }

        function updateWishlistCount() {
            wishlistCount.textContent = wishlist.length;
        }

        function updateCartDisplay() {
            const cartItems = document.querySelector('.cart-items');
            const totalPriceElement = document.querySelector('.total-price');

            if (cart.length === 0) {
                cartItems.innerHTML = '<p class="text-center">Your cart is empty</p>';
                totalPriceElement.textContent = '₹0';
                return;
            }

            let totalPrice = 0;
            cartItems.innerHTML = '';

            cart.forEach(item => {
                totalPrice += item.price * item.quantity;

                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">₹${item.price}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                            <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                            <button class="quantity-btn increase" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <div class="cart-item-remove" data-id="${item.id}">
                        <i class="fas fa-times"></i>
                    </div>
                `;

                cartItems.appendChild(cartItem);
            });

            // Add event listeners for quantity buttons and remove buttons
            document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    decreaseQuantity(id);
                });
            });

            document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    increaseQuantity(id);
                });
            });

            document.querySelectorAll('.cart-item-remove').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    removeFromCart(id);
                });
            });

            totalPriceElement.textContent = `₹${totalPrice}`;
        }

        function updateWishlistDisplay() {
            const wishlistItems = document.querySelector('.wishlist-items');

            if (wishlist.length === 0) {
                wishlistItems.innerHTML = '<p class="text-center">Your wishlist is empty</p>';
                return;
            }

            wishlistItems.innerHTML = '';

            wishlist.forEach(item => {
                const wishlistItem = document.createElement('div');
                wishlistItem.className = 'wishlist-item';
                wishlistItem.innerHTML = `
                    <div class="wishlist-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="wishlist-item-details">
                        <div class="wishlist-item-name">${item.name}</div>
                        <div class="wishlist-item-price">₹${item.price}</div>
                    </div>
                    <div class="wishlist-item-actions">
                        <button class="btn add-to-cart-from-wishlist" data-id="${item.id}">Add to Cart</button>
                        <button class="btn btn-outline remove-from-wishlist" data-id="${item.id}">Remove</button>
                    </div>
                `;

                wishlistItems.appendChild(wishlistItem);
            });

            // Add event listeners for wishlist action buttons
            document.querySelectorAll('.add-to-cart-from-wishlist').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    addToCart(id);

                    // Animate the product image flying to cart
                    const productCard = document.querySelector(`.product-card:nth-child(${id})`);
                    if (productCard) {
                        animateProductToCart(productCard);
                    }
                });
            });

            document.querySelectorAll('.remove-from-wishlist').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    toggleWishlist(id);
                });
            });
        }

        function openProductModal(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;

            const modal = document.querySelector('.product-modal');
            const imageContainer = modal.querySelector('.product-view-image');
            const name = modal.querySelector('.product-view-details h2');
            const rating = modal.querySelector('.product-view-rating');
            const price = modal.querySelector('.product-view-price');
            const description = modal.querySelector('.product-view-description p');
            const addToCartBtn = modal.querySelector('.add-to-cart');
            const wishlistBtn = modal.querySelector('.wishlist-btn');

            // Update modal content with product details
            name.textContent = product.name;
            price.textContent = `₹${product.price}`;
            description.textContent = product.description;

            // Update product image
            const productImage = document.querySelector(`.product-card:nth-child(${productId}) .product-image img`).src;
            imageContainer.innerHTML = `<img src="${productImage}" alt="${product.name}">`;

            // Update rating stars
            rating.innerHTML = '';
            const fullStars = Math.floor(product.rating);
            const hasHalfStar = product.rating % 1 !== 0;

            for (let i = 0; i < fullStars; i++) {
                rating.innerHTML += '<i class="fas fa-star"></i>';
            }

            if (hasHalfStar) {
                rating.innerHTML += '<i class="fas fa-star-half-alt"></i>';
            }

            const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
            for (let i = 0; i < emptyStars; i++) {
                rating.innerHTML += '<i class="far fa-star"></i>';
            }

            rating.innerHTML += ` <span>(${Math.floor(Math.random() * 50) + 10} Reviews)</span>`;

            // Update buttons
            addToCartBtn.onclick = function() {
                addToCart(productId);
                animateProductToCart(document.querySelector(`.product-card:nth-child(${productId})`));
            };

            // Check if product is in wishlist
            const inWishlist = wishlist.some(item => item.id === productId);
            if (inWishlist) {
                wishlistBtn.innerHTML = '<i class="fas fa-heart"></i> Remove from Wishlist';
                wishlistBtn.classList.add('active');
            } else {
                wishlistBtn.innerHTML = '<i class="far fa-heart"></i> Add to Wishlist';
                wishlistBtn.classList.remove('active');
            }

            wishlistBtn.onclick = function() {
                toggleWishlist(productId);

                if (wishlist.some(item => item.id === productId)) {
                    this.innerHTML = '<i class="fas fa-heart"></i> Remove from Wishlist';
                    this.classList.add('active');
                } else {
                    this.innerHTML = '<i class="far fa-heart"></i> Add to Wishlist';
                    this.classList.remove('active');
                }

                // Pulse animation
                this.classList.add('pulse');
                setTimeout(() => {
                    this.classList.remove('pulse');
                }, 500);
            };

            openModal(modal);
        }

        function updateOrderSummary() {
            const orderItems = document.querySelector('.order-items');
            const orderTotalPrice = document.querySelector('.order-total-price');

            let total = 0;
            orderItems.innerHTML = '';

            cart.forEach(item => {
                total += item.price * item.quantity;

                const orderItem = document.createElement('div');
                orderItem.className = 'order-item';
                orderItem.innerHTML = `
                    <span>${item.name} x ${item.quantity}</span>
                    <span>₹${item.price * item.quantity}</span>
                `;

                orderItems.appendChild(orderItem);
            });

            orderTotalPrice.textContent = `₹${total}`;
        }

        function decreaseQuantity(productId) {
            const item = cart.find(item => item.id === productId);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                updateCartCount();
                updateCartDisplay();
            }
        }

        function increaseQuantity(productId) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity += 1;
                updateCartCount();
                updateCartDisplay();
            }
        }

        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCartCount();
            updateCartDisplay();
        }

        function animateProductToCart(productCard) {
            const productImage = productCard.querySelector('.product-image');
            const rect = productImage.getBoundingClientRect();
            const cartRect = cartIcon.getBoundingClientRect();

            // Create flying element
            const flyingElement = document.createElement('div');
            flyingElement.className = 'fly-to-cart';
            flyingElement.style.width = `${rect.width}px`;
            flyingElement.style.height = `${rect.height}px`;
            flyingElement.style.background = '#e9ecef';
            flyingElement.style.borderRadius = '8px';
            flyingElement.style.position = 'fixed';
            flyingElement.style.left = `${rect.left}px`;
            flyingElement.style.top = `${rect.top}px`;
            flyingElement.style.zIndex = '1001';
            flyingElement.style.pointerEvents = 'none';

            // Add product image to flying element
            const img = productCard.querySelector('.product-image img').cloneNode(true);
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            flyingElement.appendChild(img);

            document.body.appendChild(flyingElement);

            // Calculate animation values
            const flyX = cartRect.left - rect.left + cartRect.width / 2;
            const flyY = cartRect.top - rect.top + cartRect.height / 2;

            flyingElement.style.setProperty('--fly-x', `${flyX}px`);
            flyingElement.style.setProperty('--fly-y', `${flyY}px`);

            // Remove element after animation completes
            setTimeout(() => {
                document.body.removeChild(flyingElement);
            }, 800);
        }

        function createConfetti() {
            // Simplified confetti effect
            const confettiContainer = document.createElement('div');
            confettiContainer.style.position = 'fixed';
            confettiContainer.style.top = '0';
            confettiContainer.style.left = '0';
            confettiContainer.style.width = '100%';
            confettiContainer.style.height = '100%';
            confettiContainer.style.pointerEvents = 'none';
            confettiContainer.style.zIndex = '2001';

            document.body.appendChild(confettiContainer);

            // Create confetti pieces
            const colors = ['#ff4d6d', '#7b2cbf', '#38b000', '#ffc107', '#17a2b8'];

            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.style.position = 'absolute';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = '50%';
                confetti.style.top = '-10px';
                confetti.style.left = `${Math.random() * 100}%`;
                confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;

                confettiContainer.appendChild(confetti);
            }

            // Remove confetti after animation
            setTimeout(() => {
                document.body.removeChild(confettiContainer);
            }, 5000);

            // Add confetti animation to CSS
            if (!document.querySelector('#confetti-animation')) {
                const style = document.createElement('style');
                style.id = 'confetti-animation';
                style.textContent = `
                    @keyframes confettiFall {
                        0% {
                            transform: translateY(0) rotate(0deg);
                            opacity: 1;
                        }
                        100% {
                            transform: translateY(100vh) rotate(360deg);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        }

        function openModal(modal) {
            closeAllModals();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeAllModals() {
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = 'auto';
        }