// sort.js

function sortByRelevance() {
    // Logic to sort items by relevance
    flipkartData.sort((a, b) => b.relevance - a.relevance);
    updateRightSection(getCheckedFilters()); // Update right section after sorting
}

function sortByPopularity() {
    // Logic to sort items by popularity
    flipkartData.sort((a, b) => b.popularity - a.popularity);
    updateRightSection(getCheckedFilters());
}

function sortByPriceLowToHigh() {
    // Logic to sort items from low to high price
    flipkartData.sort((a, b) => a.price - b.price);
    updateRightSection(getCheckedFilters());
}

function sortByPriceHighToLow() {
    // Logic to sort items from high to low price
    flipkartData.sort((a, b) => b.price - a.price);
}

function sortByNewest() {
    // Logic to sort items by newest first
    flipkartData.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Event listeners for sorting options
document.querySelectorAll('.sort-option').forEach(option => {
    option.addEventListener('click', () => {
        switch (option.value) {
            case 'relevance':
                sortByRelevance();
                break;
            case 'popularity':
                sortByPopularity();
                break;
            case 'price-low-high':
                sortByPriceLowToHigh();
                break;
            case 'price-high-low':
                sortByPriceHighToLow();
                break;
            case 'newest':
                sortByNewest();
                break;
        }
    });
});
