// pagination.js

const itemsPerPage = 10;
let currentPage = 1;

function paginateItems(filteredItems) {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    displayPage(currentPage, filteredItems);

    // Create pagination controls
    const paginationControls = document.querySelector('.pagination-controls');
    paginationControls.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.addEventListener('click', () => {
            currentPage = i;
            displayPage(currentPage, filteredItems);
        });
        paginationControls.appendChild(button);
    }
}

function displayPage(page, items) {
    const rightSection = document.querySelector('.right-sec-main');
    rightSection.innerHTML = ''; // Clear previous items

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = items.slice(startIndex, endIndex);

    itemsToDisplay.forEach(item => {
        rightSection.innerHTML += `<div class="item">${item.name}</div>`; // Modify this to your item structure
    });

    if (itemsToDisplay.length === 0) {
        rightSection.innerHTML = '<div class="no-items">No items found.</div>';
    }
}

// Call paginateItems with the filtered items after applying filters
// Example: paginateItems(filteredItems);
