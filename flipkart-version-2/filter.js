// filter.js

// Function to apply filters
function applyFilters() {
    const checkedFilters = getCheckedFilters();
    updateRightSection(checkedFilters);
}

// Function to get checked filters
function getCheckedFilters() {
    const filters = {
        brand: [],
        rating: [],
        price: [],
        // Add more filters as needed
    };

    // Example for brands
    document.querySelectorAll('.brand-filter input:checked').forEach(checkbox => {
        filters.brand.push(checkbox.value);
    });

    // Example for ratings
    document.querySelectorAll('.rating-filter input:checked').forEach(checkbox => {
        filters.rating.push(checkbox.value);
    });

    // Example for price range
    const priceRange = document.querySelector('.price-filter select').value;
    if (priceRange) {
        filters.price.push(priceRange);
    }

    return filters;
}

// Function to update the right section based on selected filters
function updateRightSection(checkedFilters) {
    const rightSection = document.querySelector('.right-sec-main');
    rightSection.innerHTML = ''; // Clear previous items

    // Logic to filter and display items based on checkedFilters
    // Use your flipkartData or similar data structure to filter items

    const filteredItems = flipkartData.filter(item => {
        // Apply filtering logic based on checkedFilters
        // Example: Check if item brand is in checkedFilters.brand
    });

    // Render filtered items in right section
    filteredItems.forEach(item => {
        rightSection.innerHTML += `<div class="item">${item.name}</div>`; // Modify this to your item structure
    });

    if (filteredItems.length === 0) {
        rightSection.innerHTML = '<div class="no-items">No items found.</div>';
    }
}

// Modified 'Clear All' function
function clearAllFilters(section) {
    const checkboxes = document.querySelectorAll(`.${section} input[type="checkbox"]`);
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    // Call the update function to reflect changes in the right section
    updateRightSection(getCheckedFilters());
}

// Event listeners for filter changes
document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
});

document.querySelector('.clear-all-button').addEventListener('click', () => {
    clearAllFilters('brand-filter'); // Replace with your section class
    clearAllFilters('rating-filter');
    clearAllFilters('price-filter');
    // Add other filters as necessary
});
