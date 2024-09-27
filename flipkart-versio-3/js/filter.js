import { createRightSections } from "./pone-cards.js";
import { initializePagination } from "./pagination.js";
import { clearAllFilters } from "./clearAll.js";

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
    initializePagination(filteredData, itemsPerPage);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

function applyFilters(data) {
  const brandFilters = getSelectedBrands();
  const ramFilters = getSelectedRAM();
  const ratings = getSelectedRatings();

  return data.filter((item) => {
    const brandMatch = brandFilters.length
      ? brandFilters.includes(item.name.split(" ")[0].toUpperCase())
      : true;
    const ramMatch = ramFilters.length ? ramFilters.includes(item.RAM) : true;
    // const ratingMatch = ratings.length
    //   ? ratings.includes(`${item.ratings}★ & above`)
    //   : true;

    const ratingMatch = ratings.length
    ? ratings.some(rating => parseFloat(item.ratings) >= parseFloat(rating)) // Compare numbers
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
  if (data.length === 0) {
    const rightSection = document.querySelector(".right-sec");
    rightSection.innerHTML = "<div>No results found</div>";
    return;
  }

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
  currentPage = 1;
  updateDisplay(filteredData);
}

document.addEventListener("DOMContentLoaded", () => {
  loadData();
});
