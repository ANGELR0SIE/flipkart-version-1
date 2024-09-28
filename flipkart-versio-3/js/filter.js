import { createRightSections } from "./phone-cards.js";
import { initializePagination } from "./pagination.js";

let originalData = [];
let filteredData = [];
let currentPage = 1;
const itemsPerPage = 5;

async function loadData() {
  try {
    const response = await fetch("phone-data.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    originalData = data.rightSections;
    filteredData = originalData;
    attachFilterListeners();
    updateDisplay(filteredData);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

const ramConditions = {
  "4 GB": (ram) => ram === 4,
  "3 GB": (ram) => ram === 3,
  "2 GB": (ram) => ram === 2,
  "1 GB and Below": (ram) => ram <= 1,
  "8 GB and Above": (ram) => ram >= 8,
  "6 GB": (ram) => ram === 6,
  "6 GB Above": (ram) => ram > 6,
};

function applyFilters(data) {
  const brandFilters = getSelectedBrands();
  const ramFilters = getSelectedRAM();
  const ratings = getSelectedRatings();

  return data.filter((item) => {
    const brandMatch = brandFilters.length
      ? brandFilters.includes(item.name.split(" ")[0].toUpperCase())
      : true;
    const ramMatch = ramFilters.length
      ? ramFilters.some((filter) => {
          if (item.RAM === "Not Specified") return false;

          const itemRAM = parseInt(item.RAM);
          return ramConditions[filter] ? ramConditions[filter](itemRAM) : false;
        })
      : true;
    const ratingMatch = ratings.length
      ? ratings.some((rating) => parseFloat(item.ratings) >= parseFloat(rating))
      : true;

    return brandMatch && ramMatch && ratingMatch;
  });
}

function getSelectedBrands() {
  const selected = [];
  document
    .querySelectorAll('.filter-section.brand input[type="checkbox"]:checked')
    .forEach((input) => {
      selected.push(input.value.toUpperCase());
    });
  return selected;
}

function getSelectedRatings() {
  const selected = [];
  document
    .querySelectorAll(
      '.filter-section.customer-ratings input[type="checkbox"]:checked'
    )
    .forEach((input) => {
      selected.push(input.value);
    });
  return selected;
}

function getSelectedRAM() {
  const selected = [];
  document
    .querySelectorAll('.filter-section.ram input[type="checkbox"]:checked')
    .forEach((input) => {
      selected.push(input.value);
    });
  return selected;
}

function updateDisplay(data) {
  const rightSection = document.querySelector(".right-sec");
  const paginationContainer = document.querySelector(".pagination");

  if (data.length === 0) {
    rightSection.innerHTML = "<div>No results found</div>";
    paginationContainer.style.display = "none";
    return;
  } else {
    paginationContainer.style.display = "block";
  }

  currentPage = 1;
  console.log(currentPage);

  const paginatedData = paginate(data);
  createRightSections(paginatedData);
  initializePagination(data, itemsPerPage);
}

function paginate(data) {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return data.slice(start, end);
}

export function attachFilterListeners() {
  document
    .querySelectorAll('.filter-section.brand input[type="checkbox"]')
    .forEach((input) => {
      input.addEventListener("change", filterItems);
    });

  document
    .querySelectorAll('.filter-section.customer-ratings input[type="checkbox"]')
    .forEach((input) => {
      input.addEventListener("change", filterItems);
    });

  document
    .querySelectorAll('.filter-section.ram input[type="checkbox"]')
    .forEach((input) => {
      input.addEventListener("change", filterItems);
    });

  document.querySelectorAll(".clear-all-btn").forEach((button) => {
    button.addEventListener("click", clearAllFilters);
  });
}

export function filterItems() {
  filteredData = applyFilters(originalData);
  updateDisplay(filteredData);
}

document.addEventListener("DOMContentLoaded", () => {
  loadData();
});
