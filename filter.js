const selectedBrands = [];
const selectedPriceRange = { min: null, max: null };
const selectedRatings = [];
let gstInvoiceAvailable = false;
let fassuredAvailable = false;
const selectedStorage = [];

// Handle brand selection
function handleBrandSelection(brand) {
    if (selectedBrands.includes(brand)) {
        selectedBrands.splice(selectedBrands.indexOf(brand), 1);
    } else {
        selectedBrands.push(brand);
    }
    console.log("Selected Brands:", selectedBrands);
    applyFilters();
}

// Handle price range selection
function handlePriceRangeSelection(min, max) {
    selectedPriceRange.min = min;
    selectedPriceRange.max = max;
    console.log("Selected Price Range:", selectedPriceRange);
    applyFilters();
}

// Handle rating selection
function handleRatingSelection(rating) {
    if (selectedRatings.includes(rating)) {
        selectedRatings.splice(selectedRatings.indexOf(rating), 1);
    } else {
        selectedRatings.push(rating);
    }
    console.log("Selected Ratings:", selectedRatings);
    applyFilters();
}

// Handle GST invoice toggle
function handleGSTInvoiceToggle() {
    gstInvoiceAvailable = !gstInvoiceAvailable;
    console.log("GST Invoice Available:", gstInvoiceAvailable);
    applyFilters();
}

// Handle Fassured toggle
function handleFassuredToggle() {
    fassuredAvailable = !fassuredAvailable;
    console.log("Fassured Available:", fassuredAvailable);
    applyFilters();
}

// Handle storage selection
function handleStorageSelection(storage) {
    if (selectedStorage.includes(storage)) {
        selectedStorage.splice(selectedStorage.indexOf(storage), 1);
    } else {
        selectedStorage.push(storage);
    }
    console.log("Selected Storage:", selectedStorage);
    applyFilters();
}

// Apply all filters
function applyFilters() {
    console.log("Filtering items...");
    const resultContainer = document.getElementsByClassName('right')[0]; // Assuming the right section has a class name 'right'
    const allItems = flipkartData.rightSections; // Accessing the data from the JSON file
    let filteredItems = allItems; // Start with all items

    // Filtering based on selected brands
    if (selectedBrands.length > 0) {
        filteredItems = filteredItems.filter(item => 
            selectedBrands.includes(item.name)
        );
        console.log("Filtered by Brands:", filteredItems);
    }

    // Filtering based on selected price range
    if (selectedPriceRange.min !== null && selectedPriceRange.max !== null) {
        filteredItems = filteredItems.filter(item => {
            const price = item.price; // Directly using price from JSON
            return price >= selectedPriceRange.min && price <= selectedPriceRange.max;
        });
        console.log("Filtered by Price Range:", filteredItems);
    }

    // Filtering based on selected ratings
    if (selectedRatings.length > 0) {
        filteredItems = filteredItems.filter(item => 
            selectedRatings.includes(Math.floor(item.ratings)) // Round down ratings
        );
        console.log("Filtered by Ratings:", filteredItems);
    }

    // Filtering based on GST Invoice availability
    if (gstInvoiceAvailable) {
        filteredItems = filteredItems.filter(item => 
            item.gstInvoiceAvailable === true // Assuming this data exists in the JSON
        );
        console.log("Filtered by GST Invoice:", filteredItems);
    }

    // Filtering based on Fassured availability
    if (fassuredAvailable) {
        filteredItems = filteredItems.filter(item => 
            item.fassured === true // Assuming this data exists in the JSON
        );
        console.log("Filtered by Fassured:", filteredItems);
    }

    // Filtering based on selected storage
    if (selectedStorage.length > 0) {
        filteredItems = filteredItems.filter(item => 
            selectedStorage.includes(item.storage)
        );
        console.log("Filtered by Storage:", filteredItems);
    }

    console.log("Final Filtered Items:", filteredItems);

    resultContainer.innerHTML = ''; // Clear previous results

    if (filteredItems.length === 0) {
        const noItemsDiv = document.createElement('div');
        noItemsDiv.innerText = "No items found";
        resultContainer.appendChild(noItemsDiv);
        console.log("No items found");
    } else {
        filteredItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item'; // Add any class you want for styling
            itemDiv.innerHTML = `<img src="${item.image}" alt="${item.name}">
                                 <h3>${item.name}</h3>
                                 <p>${item.color}</p>
                                 <p>Price: ₹${item.price}</p>`;
            resultContainer.appendChild(itemDiv);
            console.log("Added item to result:", item);
        });
    }
}
