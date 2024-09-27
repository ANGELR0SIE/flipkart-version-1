// // // import { filterItems } from "./filter.js";
// // // export function clearAllFilters() {
// // //   document.querySelectorAll(".filter-checkbox").forEach((checkbox) => {
// // //     console.log(checkbox.checked);
// // //   });
// // //   filterItems();
// // // }

// // // function handleRemoveAllButton() {
// // //   const correspondingSection = this.dataset.section;
// // //   document
// // //     .querySelectorAll(`input[name="${correspondingSection}"]:checked`)
// // //     .forEach((checkbox) => {
// // //       checkbox.checked = false;
// // //       console.log(12);
// // //     });
// // //   clearAllFilters();
// // // }

// // // document.querySelectorAll(".remove-all-btn").forEach((button) => {
// // //   button.addEventListener("click", handleRemoveAllButton);
// // // });

// // import { filterItems } from "./filter.js";

// // export function clearAllFilters() {
// //   console.log("clear all function is logged")
// //   document.querySelectorAll(".filter-checkbox").forEach((checkbox) => {
// //     checkbox.checked = false;
// //   });

// //   filterItems();
// // }

// // function handleRemoveAllButton() {
// //   const correspondingSection = this.dataset.section;
// //   document
// //     .querySelectorAll(`input[name="${correspondingSection}"]:checked`)
// //     .forEach((checkbox) => {
// //       checkbox.checked = false;
// //     });

// //   clearAllFilters();
// // }

// // document.querySelectorAll(".remove-all-btn").forEach((button) => {
// //   button.addEventListener("click", handleRemoveAllButton);
// // });










// import { filterItems } from "./filter.js";

// export function clearAllFilters() {
//   console.log("clearAllFilters called"); // To check if this function is triggered

//   const allCheckboxes = document.querySelectorAll(".filter-checkbox");
//   if (allCheckboxes.length === 0) {
//     console.log("No checkboxes found with class '.filter-checkbox'");
//   } else {
//     console.log(`${allCheckboxes.length} checkboxes found`);
//   }

//   allCheckboxes.forEach((checkbox) => {
//     console.log(`Checkbox '${checkbox.name}' before unchecking:`, checkbox.checked);
//     checkbox.checked = false;
//     console.log(`Checkbox '${checkbox.name}' after unchecking:`, checkbox.checked);
//   });

//   console.log("Calling filterItems after clearing all checkboxes");
//   filterItems();
// }

// function handleRemoveAllButton() {
//   console.log("handleRemoveAllButton called"); // To check if the click event works

//   const correspondingSection = this.dataset.section;
//   console.log("Corresponding section:", correspondingSection);

//   const sectionCheckboxes = document.querySelectorAll(`input[name="${correspondingSection}"]:checked`);
//   if (sectionCheckboxes.length === 0) {
//     console.log(`No checkboxes found for section '${correspondingSection}'`);
//   } else {
//     console.log(`${sectionCheckboxes.length} checkboxes found for section '${correspondingSection}'`);
//   }

//   sectionCheckboxes.forEach((checkbox) => {
//     console.log(`Checkbox in section '${correspondingSection}' before unchecking:`, checkbox.checked);
//     checkbox.checked = false;
//     console.log(`Checkbox in section '${correspondingSection}' after unchecking:`, checkbox.checked);
//   });

//   clearAllFilters();
// }

// document.querySelectorAll(".remove-items").forEach((button) => {
//   console.log("Adding event listener to button:", button); // Check if event listener is being added
//   button.addEventListener("click", handleRemoveAllButton);
// });

// // Additional Debug: Ensure page has loaded
// document.addEventListener("DOMContentLoaded", () => {
//   console.log("DOM fully loaded, attaching event listeners");
// });





import { filterItems } from "./filter.js";

export function clearAllFilters() {
  console.log("clearAllFilters called");
  document.querySelectorAll(".filter-checkbox").forEach((checkbox) => {
    checkbox.checked = false;
    console.log(`Checkbox ${checkbox.name} unchecked`);
  });
  filterItems();
}

function handleRemoveAllButton() {
  console.log("handleRemoveAllButton called");
  const correspondingSection = this.dataset.section;
  console.log(`Section: ${correspondingSection}`);
  
  document
    .querySelectorAll(`input[name="${correspondingSection}"]:checked`)
    .forEach((checkbox) => {
      checkbox.checked = false;
      console.log(`${checkbox.name} checkbox cleared`);
    });
  clearAllFilters();
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded, attaching event listeners");

  // Ensure remove-items buttons are visible
  document.querySelectorAll(".remove-items").forEach((button) => {
    button.style.display = "block"; // Ensure the button is visible
    console.log(`Button made visible: ${button.className}`);
  });

  const removeAllButtons = document.querySelectorAll(".remove-items");
  console.log(`${removeAllButtons.length} remove-items buttons found`);

  removeAllButtons.forEach((button, index) => {
    console.log(`Button ${index + 1}:`, button); // Log each button found
    button.addEventListener("click", handleRemoveAllButton);
  });
});


