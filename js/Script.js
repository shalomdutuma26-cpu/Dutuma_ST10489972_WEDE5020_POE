/* ==========================================
   WILDFLOWER & WAX
   WEDE5020 POE PART 3
   JAVASCRIPT FUNCTIONALITY (FINAL POLISHED VERSION)
========================================== */

document.addEventListener("DOMContentLoaded", function () {
    console.log("Wildflower & Wax Script Loaded Successfully.");

    // ==========================================
    // 1. CART & ADD TO CART FUNCTIONALITY
    // ==========================================
    updateCartCount();

    // Make addToCart globally accessible
    window.addToCart = function(productName, price, buttonElement) {
        let cart = JSON.parse(localStorage.getItem("wildflower_cart")) || [];
        
        let existingItem = cart.find(item => item.name === productName);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name: productName, price: price, quantity: 1 });
        }

        localStorage.setItem("wildflower_cart", JSON.stringify(cart));
        updateCartCount();

        if (buttonElement) {
            const originalText = buttonElement.textContent;
            buttonElement.textContent = "Added to Cart!";
            buttonElement.style.backgroundColor = "#222222"; 
            
            setTimeout(() => {
                buttonElement.textContent = originalText;
                buttonElement.style.backgroundColor = "#d89292";
            }, 1500);
        } else {
            alert("Item successfully added to your cart!");
        }
    };

    function updateCartCount() {
        const cartCountElements = document.querySelectorAll(".cart-count");
        let cart = JSON.parse(localStorage.getItem("wildflower_cart")) || [];
        let totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        
        cartCountElements.forEach(el => {
            el.textContent = totalCount;
        });
    }

    const proceedCheckoutBtn = document.getElementById("proceedCheckoutBtn");
    if (proceedCheckoutBtn) {
        proceedCheckoutBtn.addEventListener("click", function (event) {
            event.preventDefault();
            window.location.href = "checkout.html";
        });
    }

    // ==========================================
    // 2. UNIVERSAL SEARCH TOGGLE (Works across all pages)
    // ==========================================
    const searchToggle = document.getElementById("searchToggle");
    const searchPanel = document.getElementById("searchPanel");

    if (searchToggle) {
        searchToggle.addEventListener("click", function (e) {
            e.preventDefault();
            
            // 1. If the page has the built-in search panel (Home & Products), toggle it
            if (searchPanel) {
                const isHidden = searchPanel.hasAttribute("hidden");
                if (isHidden) {
                    searchPanel.removeAttribute("hidden");
                    searchToggle.setAttribute("aria-expanded", "true");
                    const inputField = searchPanel.querySelector("input[type='search'], input[type='text']");
                    if (inputField) inputField.focus();
                } else {
                    searchPanel.setAttribute("hidden", "");
                    searchToggle.setAttribute("aria-expanded", "false");
                }
                return;
            }

            // 2. For pages without #searchPanel (About, Contact, Enquiry, Cart), use a clean popup
            let existingBar = document.getElementById("dynamicSearchBar");
            if (existingBar) {
                existingBar.remove();
                return;
            }

            const searchBar = document.createElement("div");
            searchBar.id = "dynamicSearchBar";
            searchBar.style.cssText = "position: absolute; top: 70px; right: 20px; background: #fff; padding: 12px; border: 1px solid #ccc; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 1000;";
            
            searchBar.innerHTML = `
                <div style="display: flex; gap: 5px;">
                    <input type="text" id="siteSearchInput" placeholder="Search candles..." style="padding: 6px 10px; border: 1px solid #ccc; border-radius: 4px; width: 160px; font-size: 0.9rem; color: #333;">
                    <button type="button" id="siteSearchBtn" style="padding: 6px 12px; background: #d89292; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">Search</button>
                </div>
            `;
            
            document.body.appendChild(searchBar);

            const inputField = document.getElementById("siteSearchInput");
            const searchBtn = document.getElementById("siteSearchBtn");

            inputField.focus();

            function executeSearch() {
                const query = inputField.value.trim();
                if (query.length > 0) {
                    window.location.href = `products.html?search=${encodeURIComponent(query)}`;
                } else {
                    alert("Please enter a search term.");
                }
            }

            searchBtn.addEventListener("click", executeSearch);
            inputField.addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                    executeSearch();
                }
            });
        });
    }

    // Auto-check URL parameters for search queries on page load (e.g., products.html?search=blu)
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("search");
    
    if (searchQuery) {
        const productSearchInput = document.getElementById("productSearch");
        if (productSearchInput) {
            productSearchInput.value = searchQuery;
        }

        const productCards = document.querySelectorAll(".product-card");
        const queryLower = searchQuery.toLowerCase();
        
        let foundAny = false;
        productCards.forEach(card => {
            const name = (card.getAttribute("data-name") || "").toLowerCase();
            const text = card.textContent.toLowerCase();
            
            if (name.includes(queryLower) || text.includes(queryLower)) {
                card.style.display = "flex";
                foundAny = true;
            } else {
                card.style.display = "none";
            }
        });

        if (!foundAny) {
            alert(`No products found matching "${searchQuery}".`);
        }
    }

    // ==========================================
    // 3. FAQ ACCORDION FUNCTIONALITY
    // ==========================================
    const faqButtons = document.querySelectorAll(".faq-question");
    faqButtons.forEach(button => {
        button.addEventListener("click", function () {
            const expanded = this.getAttribute("aria-expanded") === "true";
            
            faqButtons.forEach(btn => {
                btn.setAttribute("aria-expanded", "false");
                const ans = document.getElementById(btn.getAttribute("aria-controls"));
                if (ans) ans.setAttribute("hidden", "");
            });

            if (!expanded) {
                this.setAttribute("aria-expanded", "true");
                const answer = document.getElementById(this.getAttribute("aria-controls"));
                if (answer) answer.removeAttribute("hidden");
            }
        });
    });

    // ==========================================
    // 4. LIVE CATALOG FILTERING (Products Page)
    // ==========================================
    const productSearchInput = document.getElementById("productSearch");
    const scentFilter = document.getElementById("scentFilter");
    const waxFilter = document.getElementById("waxFilter");
    const productCards = document.querySelectorAll(".product-card");

    function filterProducts() {
        const searchTerm = productSearchInput ? productSearchInput.value.toLowerCase() : "";
        const selectedScent = scentFilter ? scentFilter.value : "all";
        const selectedWax = waxFilter ? waxFilter.value : "all";

        productCards.forEach(card => {
            const name = card.getAttribute("data-name") || "";
            const scent = card.getAttribute("data-scent") || "";
            const wax = card.getAttribute("data-wax") || "";

            const matchesSearch = name.includes(searchTerm);
            const matchesScent = (selectedScent === "all" || scent === selectedScent);
            const matchesWax = (selectedWax === "all" || wax === selectedWax);

            if (matchesSearch && matchesScent && matchesWax) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    }

    if (productSearchInput) productSearchInput.addEventListener("input", filterProducts);
    if (scentFilter) scentFilter.addEventListener("change", filterProducts);
    if (waxFilter) waxFilter.addEventListener("change", filterProducts);

    // ==========================================
    // 5. ENQUIRY FORM VALIDATION
    // ==========================================
    const enquiryForm = document.getElementById("enquiryForm");
    if (enquiryForm) {
        enquiryForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const candleSelect = document.getElementById("candle");
            const quantityInput = document.getElementById("quantity");
            const messageInput = document.getElementById("message");

            let isValid = true;

            if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
                document.getElementById("nameError").textContent = "Please enter a valid full name (at least 3 characters).";
                isValid = false;
            } else {
                document.getElementById("nameError").textContent = "";
            }

            if (!emailInput.value.trim() || !emailInput.checkValidity()) {
                document.getElementById("emailError").textContent = "Please enter a valid email address.";
                isValid = false;
            } else {
                document.getElementById("emailError").textContent = "";
            }

            if (!candleSelect.value) {
                document.getElementById("candleError").textContent = "Please choose a candle option.";
                isValid = false;
            } else {
                document.getElementById("candleError").textContent = "";
            }

            const qty = Number(quantityInput.value);
            if (!quantityInput.value || qty < 1 || qty > 50) {
                document.getElementById("quantityError").textContent = "Quantity must be between 1 and 50.";
                isValid = false;
            } else {
                document.getElementById("quantityError").textContent = "";
            }

            if (!messageInput.value.trim()) {
                document.getElementById("messageError").textContent = "Please enter your message.";
                isValid = false;
            } else {
                document.getElementById("messageError").textContent = "";
            }

            if (isValid) {
                window.location.href = "message-success.html";
            }
        });
    }

    // ==========================================
    // 6. CONTACT FORM VALIDATION
    // ==========================================
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        const nameInput = document.getElementById("contactName");
        const emailInput = document.getElementById("contactEmail");
        const typeSelect = document.getElementById("messageType");
        const messageInput = document.getElementById("contactMessage");

        const nameError = document.getElementById("contactNameError");
        const emailError = document.getElementById("contactEmailError");
        const typeError = document.getElementById("messageTypeError");
        const messageError = document.getElementById("contactMessageError");

        const emailResponseBox = document.getElementById("emailResponseBox");
        const emailResponseText = document.getElementById("emailResponseText");

        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let isValid = true;

            if (!nameInput.value.trim()) {
                nameError.textContent = "Name is required";
                isValid = false;
            } else {
                nameError.textContent = "";
            }

            if (!emailInput.value.trim() || !emailInput.checkValidity()) {
                emailError.textContent = "Enter a valid email address";
                isValid = false;
            } else {
                emailError.textContent = "";
            }

            if (!typeSelect.value) {
                typeError.textContent = "Please select a message type";
                isValid = false;
            } else {
                typeError.textContent = "";
            }

            const msgVal = messageInput.value.trim();
            if (!msgVal || msgVal.length < 10) {
                messageError.textContent = "Message must be at least 10 characters long";
                isValid = false;
            } else {
                messageError.textContent = "";
            }

            if (isValid) {
                const recipient = "hello@wildflowerandwax.co.za";
                const subject = encodeURIComponent(`[${typeSelect.value}] Message from ${nameInput.value.trim()}`);
                const body = encodeURIComponent(`Name: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${msgVal}`);
                const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;

                emailResponseText.innerHTML = `
                    <p style="margin-bottom: 12px; color: #444;">Validation passed! Your message has been compiled into an email.</p>
                    <a href="${mailtoLink}" class="submit-btn" style="display: block; text-align: center; text-decoration: none; background-color: #d89292; color: #fff; padding: 12px 20px; border-radius: 4px; font-weight: 600;">Click Here to Open Email Client & Send</a>
                `;
                emailResponseBox.classList.remove("hidden");
                contactForm.reset();
            } else {
                emailResponseBox.classList.add("hidden");
            }
        });
    }

    // ==========================================
    // 7. CHECKOUT FORM VALIDATION
    // ==========================================
    const checkoutTotalItems = document.getElementById("checkoutTotalItems");
    if (checkoutTotalItems) {
        const cartCount = localStorage.getItem("wildflower_cart") ? JSON.parse(localStorage.getItem("wildflower_cart")).length : "2";
        checkoutTotalItems.textContent = `${cartCount} Hand-Poured Candle(s)`;
    }

    const billingForm = document.getElementById("billingForm");
    if (billingForm) {
        billingForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const cardName = document.getElementById("cardName");
            const cardNumber = document.getElementById("cardNumber");
            const expiryDate = document.getElementById("expiryDate");
            const cvv = document.getElementById("cvv");
            const shippingAddress = document.getElementById("shippingAddress");

            const cardNameError = document.getElementById("cardNameError");
            const cardNumberError = document.getElementById("cardNumberError");
            const expiryError = document.getElementById("expiryError");
            const cvvError = document.getElementById("cvvError");
            const addressError = document.getElementById("addressError");

            let isValid = true;

            if (!cardName || !cardName.value.trim()) {
                if (cardNameError) cardNameError.textContent = "Please enter the cardholder name.";
                isValid = false;
            } else if (cardNameError) { cardNameError.textContent = ""; }

            const numVal = cardNumber ? cardNumber.value.trim() : "";
            if (!numVal || numVal.length !== 16 || isNaN(numVal)) {
                if (cardNumberError) cardNumberError.textContent = "Please enter a valid 16-digit card number.";
                isValid = false;
            } else if (cardNumberError) { cardNumberError.textContent = ""; }

            const expVal = expiryDate ? expiryDate.value.trim() : "";
            if (!expVal || !expVal.includes("/")) {
                if (expiryError) expiryError.textContent = "Enter expiry as MM/YY.";
                isValid = false;
            } else if (expiryError) { expiryError.textContent = ""; }

            const cvvVal = cvv ? cvv.value.trim() : "";
            if (!cvvVal || cvvVal.length !== 3 || isNaN(cvvVal)) {
                if (cvvError) cvvError.textContent = "Enter 3-digit CVV.";
                isValid = false;
            } else if (cvvError) { cvvError.textContent = ""; }

            if (!shippingAddress || !shippingAddress.value.trim()) {
                if (addressError) addressError.textContent = "Please enter your delivery shipping address.";
                isValid = false;
            } else if (addressError) { addressError.textContent = ""; }

            if (isValid) {
                window.location.href = "message-success.html";
            }
        });
    }
});

// ==========================================
    // LIGHTBOX GALLERY FUNCTIONALITY
    // ==========================================
    window.openLightbox = function(imageSrc) {
        const modal = document.getElementById("lightboxModal");
        const modalImg = document.getElementById("lightboxImg");
        if (modal && modalImg) {
            modal.style.display = "flex";
            modalImg.src = imageSrc;
        }
    };

    const closeBtn = document.getElementById("closeLightbox");
    const lightboxModal = document.getElementById("lightboxModal");

    if (closeBtn && lightboxModal) {
        closeBtn.addEventListener("click", function() {
            lightboxModal.style.display = "none";
        });

        // Also close when clicking anywhere outside the image background
        lightboxModal.addEventListener("click", function(e) {
            if (e.target === lightboxModal) {
                lightboxModal.style.display = "none";
            }
        });
    }