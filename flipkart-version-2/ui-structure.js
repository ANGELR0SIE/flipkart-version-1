// Load JSON data
let flipkartData;

fetch("ui-structure.json")
  .then((response) => response.json())
  .then((data) => {
    flipkartData = data;
    createHeader();
    createSubNav();
    createLeftSidebar();
    createRightSidebar();
  })
  .catch((error) => console.error("Error loading JSON data:", error));

function createHeader() {
  const navBar = document.querySelector(".nav-bar-margin");

  flipkartData.header.forEach((item) => {
    const headerLogo = document.createElement("div");
    headerLogo.className = "header-logo";

    const logoImage = document.createElement("img");
    logoImage.src = item.headerLogo.icon;

    const logoText = document.createElement("p");
    logoText.innerHTML = `${item.headerLogo.text.p} <span>${item.headerLogo.text.span}</span> <img src="${item.headerLogo.plusIcon}">`;

    const logoLink = document.createElement("a");
    logoLink.className = "link";
    logoLink.appendChild(logoText);

    headerLogo.appendChild(logoImage);
    headerLogo.appendChild(logoLink);

    const searchBar = document.createElement("div");
    searchBar.className = "header-search-bar";

    const searchBg = document.createElement("div");
    searchBg.className = "search-bg wht-bg";

    const searchInput = document.createElement("input");
    searchInput.className = "search-input";
    searchInput.type = "text";
    searchInput.placeholder = item.searchBar.placeholder;

    const searchImg = document.createElement("div");
    searchImg.className = "search-img";

    const searchIcon = document.createElement("img");
    searchIcon.src = item.searchBar.icon;

    searchImg.appendChild(searchIcon);
    searchBg.appendChild(searchInput);
    searchBg.appendChild(searchImg);

    searchBar.appendChild(searchBg);

    const login = document.createElement("div");
    login.className = "login";
    const loginLink = document.createElement("a");
    loginLink.className = "login-link wht-bg clr-bl";
    loginLink.innerHTML = item.navLinks.login;
    login.appendChild(loginLink);

    const seller = document.createElement("div");
    seller.className = "seller";
    const sellerLink = document.createElement("a");
    sellerLink.className = "seller-link";
    sellerLink.innerHTML = item.navLinks.seller;
    seller.appendChild(sellerLink);

    const more = document.createElement("div");
    more.className = "more";
    const moreLink = document.createElement("a");
    moreLink.className = "more-link";
    moreLink.innerHTML = item.navLinks.more.text;
    const moreIcon = document.createElement("img");
    moreIcon.src = item.navLinks.more.icon;
    more.appendChild(moreLink);
    more.appendChild(moreIcon);

    const cart = document.createElement("div");
    cart.className = "cart";
    const cartLink = document.createElement("a");
    cartLink.className = "cart-link";
    const cartImg = document.createElement("img");
    cartImg.src = item.navLinks.cart.icon;
    const cartSpan = document.createElement("span");
    cartSpan.innerHTML = item.navLinks.cart.text;
    cartLink.appendChild(cartImg);
    cartLink.appendChild(cartSpan);
    cart.appendChild(cartLink);

    navBar.appendChild(headerLogo);
    navBar.appendChild(searchBar);
    navBar.appendChild(login);
    navBar.appendChild(seller);
    navBar.appendChild(more);
    navBar.appendChild(cart);
  });
}

function createSubNav() {
  const subnavBar = document.querySelector(".sub-nav-margin");

  flipkartData.subNav.forEach((item) => {
    const subNavItem = document.createElement("div");
    subNavItem.className = "sub-nav-item";

    const subNavText = document.createElement("span");
    subNavText.innerHTML = item.text;

    const subNavImage = document.createElement("img");
    subNavImage.src = item.image;

    subNavItem.appendChild(subNavText);
    subNavItem.appendChild(subNavImage);

    subnavBar.appendChild(subNavItem);
  });
}


  

  
  



function createLeftSidebar() {
  const leftSidebar = document.createElement("div");
  leftSidebar.className = "left-sidebar";
  const bodySection = document.querySelector(".body-section");

  const categoriesData = flipkartData.leftSidebar[0].categories;

  const filterHeader = document.createElement("div");
  filterHeader.className = "filter-header";
  const filterHeaderText = document.createElement("h2");
  filterHeaderText.innerText = categoriesData.head;
  filterHeader.appendChild(filterHeaderText);

  const removeItemsDivHeader = document.createElement("div");
  removeItemsDivHeader.className = "remove-items sec2-remove-items";
  removeItemsDivHeader.style.display = "none";

  const clearIconHeader = document.createElement("span");
  clearIconHeader.className = "icon";
  clearIconHeader.innerText = "✕"; // Clear icon

  const clearTextHeader = document.createElement("span");
  clearTextHeader.className = "text";
  clearTextHeader.innerText = "Clear all"; // Clear all text

  const listOfFilters = document.createElement("div");
  listOfFilters.className = "list-of-filter";

  removeItemsDivHeader.appendChild(clearIconHeader);
  removeItemsDivHeader.appendChild(clearTextHeader);
  filterHeader.appendChild(removeItemsDivHeader);

  leftSidebar.appendChild(filterHeader);

  flipkartData.leftSidebar[0].sections.forEach((section, index) => {
    const sectionDiv = document.createElement("section");
    sectionDiv.className = `filter-section ${section.title.replace(/\s+/g, '-').toLowerCase()}`;

    const sectionTitle = document.createElement("div");
    sectionTitle.className = "section-title";
    sectionTitle.innerText = section.title;
    sectionDiv.appendChild(sectionTitle);

    const removeItemsDiv = document.createElement("div");
    removeItemsDiv.className = `remove-items ${section.title.replace(/\s+/g, '-').toLowerCase() + '-remove-items'}`;
    removeItemsDiv.style.display = "none";

    const clearIcon = document.createElement("span");
    clearIcon.className = "icon";
    clearIcon.innerText = "✕"; // Clear icon

    const clearText = document.createElement("span");
    clearText.className = "text";
    clearText.innerText = "Clear all"; // Clear all text

    removeItemsDiv.appendChild(clearIcon);
    removeItemsDiv.appendChild(clearText);
    sectionDiv.appendChild(removeItemsDiv);

    if (section.options) {
      const checkboxList = document.createElement("ul");
      section.options.forEach((option) => {
        const listItem = document.createElement("li");
        listItem.className = "checkbox-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = option;

        const label = document.createElement("label");
        label.innerText = option;

        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        checkboxList.appendChild(listItem);

        // Show "Clear All" when any checkbox is checked
        checkbox.addEventListener('change', () => {
          const anyChecked = [...checkboxList.querySelectorAll('input[type="checkbox"]')].some(cb => cb.checked);
          removeItemsDiv.style.display = anyChecked ? 'block' : 'none';
        });
      });
      sectionDiv.appendChild(checkboxList);
    }

    // Clear selected checkboxes on "Clear All" click
    clearIcon.addEventListener('click', () => {
      const checkboxes = sectionDiv.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(cb => {
        cb.checked = false; // Uncheck the checkbox
      });
      removeItemsDiv.style.display = 'none'; // Hide "Clear All" button
    });

    leftSidebar.appendChild(sectionDiv);
  });

  const fassuredData = flipkartData.leftSidebar[0].fassured;
  const fassuredSection = document.createElement("div");
  fassuredSection.className = "fassured-section";

  const fassuredLogo = document.createElement("img");
  fassuredLogo.src = fassuredData.logo;
  fassuredSection.appendChild(fassuredLogo);

  const questionMark = document.createElement("span");
  questionMark.innerText = fassuredData.question;
  fassuredSection.appendChild(questionMark);

  leftSidebar.appendChild(fassuredSection);
  bodySection.appendChild(leftSidebar);
}















  createLeftSidebar();
  

function createRightSidebar() {
  const rightMainbar = document.createElement("div");
  rightMainbar.className = "right";
  flipkartData.right.div1.forEach((item) => {
    const rightHead = document.createElement("div");
    rightHead.className = "rightHead";

    const path = document.createElement("div");
    path.className = "path";
    path.innerHTML = `<span>${item.path}</span>`;
    rightHead.append(path);

    const results = document.createElement("div");
    results.className = "results";
    results.innerHTML = `<span>${item.result}</span>`;
    rightHead.append(results);

    const headTitle = document.createElement("div");
    headTitle.className = "head-title";
    const headTitleSpan1 = document.createElement("span");
    headTitleSpan1.innerHTML = item.title; // Assuming you want to add a title here
    const headTitleSpan2 = document.createElement("span");
    headTitleSpan2.innerHTML = item.span;
    headTitle.appendChild(headTitleSpan1);
    headTitle.appendChild(headTitleSpan2);
    rightHead.appendChild(headTitle);

    const filterBar = document.createElement("div");
    filterBar.className = "filter-bar";
    item.filters.forEach((filter) => {
      const filterText = document.createElement("div");
      filterText.className = "filter-txt";
      filterText.innerHTML = `<span class="${filter.cls}">${filter.text}</span>`;
      filterBar.append(filterText);
    });

    rightHead.appendChild(filterBar);
    rightMainbar.appendChild(rightHead);
  });
  const right = document.createElement("div");
  right.className = "right-sec-main";
  rightMainbar.appendChild(right);
  const bodySection = document.querySelector(".body-section");
  bodySection.appendChild(rightMainbar);
}

// Call functions to create the structure

