// function togglePanel() {
//     var panel = document.getElementById("sidePanel");
//     var content = document.getElementById("mainContent");
//     var button = document.getElementById("menuButton");
//     var text = document.getElementById("textContent")
//     var popup = document.querySelector(".services-popup");

//     if (panel.classList.contains("closed")) {
//         panel.classList.remove("closed");
//         panel.classList.add("opened");
//     } else if(panel.classList.contains("opened")){
//         panel.classList.add("closed");
//     }
//     else {
//         panel.classList.add("closed");                
//     }

//     // Close panel if clicked outside
//     document.addEventListener("click", function (event) {
//         // Check if the click was outside the panel and the button
//         if (!panel.contains(event.target) && !button.contains(event.target) && !popup.contains(event.target)) {
//             panel.classList.add("closed");
//             // Uncomment if you need to hide the popup when clicking outside
//             // popup.style.display = "none"; 
//             // Remove the event listener to avoid multiple triggers
//             document.removeEventListener("click", arguments.callee);
//         }
//     });
// }


// //******** SERVICES OPTION in SIDE PANEL Popup open and close
// document.getElementById("servicesLink").onclick = function(event) {
//     event.preventDefault(); // Prevent default link behavior
//     var popup = document.getElementById("servicesPopup");
//     var mainContent = document.getElementById("mainContent");
//     var serviceContent = document.querySelectorAll(".services-section");
//     var topContent = document.querySelectorAll(".top-panel")
//     var companyDetails =  document.getElementById("companyDetails")
    
//     if (popup.style.display === "block") {
//         popup.style.display = "none"; // Hide popup if it's already visible
//         mainContent.classList.remove("blurred");
//         companyDetails.classList.remove("blurred");
//         //serviceContent.classList.remove("blurred")
//         serviceContent.forEach(div => div.classList.remove("blurred")); 
//         topContent.forEach(div => div.classList.remove("blurred")); 
//     } else {
//         popup.style.display = "block"; // Show popup
//         //panel.classList.add("opened");
//         mainContent.classList.add("blurred");
//         companyDetails.classList.add("blurred");
//         serviceContent.forEach(div => div.classList.add("blurred")); 
//         topContent.forEach(div => div.classList.add("blurred")); 
//     }
// };

// // Close popup when clicking outside of it
// document.addEventListener("click", function(event) {
//     var popup = document.getElementById("servicesPopup");
//     var servicesLink = document.getElementById("servicesLink");
//     var mainContent = document.getElementById("mainContent");
//     var serviceContent = document.querySelectorAll(".services-section");
//     var topContent = document.querySelectorAll(".top-panel")
//     var companyDetails =  document.getElementById("companyDetails")

//     if (!popup.contains(event.target) && event.target !== servicesLink) {
//         popup.style.display = "none";
//         mainContent.classList.remove("blurred");
//         companyDetails.classList.remove("blurred");
//         serviceContent.forEach(div => div.classList.remove("blurred")); 
//         topContent.forEach(div => div.classList.remove("blurred")); 
//     }
// });

// //******* HOME link in SIDE PANEL click to go to HOME PAGE
// document.getElementById("homeLink").onclick = function(event) {
//     var panel = document.getElementById("sidePanel");
//     panel.classList.add("closed"); // Close the side panel if open
//     // You can also add any other functionality here if needed
// };


// //******* SEARCH HANDLE API CALL and POPUP display
// function handleSearch(event) {
//     event.preventDefault();  // Prevent form submission to handle it via JS
    
//     var searchQuery = document.getElementById("searchInput").value.trim();
//     var noResultsPopup = document.getElementById("noResultsPopup");

//     // Simulate search logic (replace this with actual search result checking)
//     if (searchQuery) {
//         // Make API call to the backend
//             fetch(`/search?query=${encodeURIComponent(searchQuery)}`, {
//                 method: 'GET',
//             })
//             .then(response => response.json())
//             .then(data => {
                
//                 let currentMatchIndex = 0;
//                 let matches = [];

//                 // Function to handle scrolling to matches
//                 function scrollToNextMatch() {
//                     if (matches.length > 0) {
//                         matches[currentMatchIndex].scrollIntoView({ behavior: "smooth", block: "center" });
//                         currentMatchIndex = (currentMatchIndex + 1) % matches.length;  // Loop back to the first match after the last one
//                     }
//                 }

//                 if (data.resultsFound) {
//                     noResultsPopup.classList.remove("show");  // Hide the popup if results are found
//                     document.documentElement.innerHTML = data.highlightedContent; // Update the page content with highlighted results

//                     document.getElementById("searchInput").value = searchQuery;
//                     // Get all matches with the "highlight" class
//                     matches = Array.from(document.querySelectorAll(".highlight"));
//                     if (matches.length > 0) {
//                         scrollToNextMatch();  // Scroll to the first match initially
//                     }

//                     // Add an event listener for "Enter" key to scroll to the next match
//                     document.addEventListener("keydown", function(event) {
//                         if (event.key === "Enter") {
//                             event.preventDefault();  // Prevent form submission
//                             scrollToNextMatch();     // Scroll to the next match
//                         }
//                     });

//                     // Add event listener to detect when the search bar is cleared
//                     document.getElementById("searchInput").addEventListener("input", function() {
//                         if (this.value.trim() === "") {
//                             window.location.href = "/";  // Load the default `homePage.html` if the search bar is cleared
//                         }
//                     });

//                 } else {
//                     noResultsPopup.classList.add("show");    // Show the popup if no results found
//                     // Add event listener to detect when the search bar is cleared
//                     document.getElementById("searchInput").addEventListener("input", function() {
//                         if (this.value.trim() === "") {
//                             window.location.href = "/";  // Load the default `homePage.html` if the search bar is cleared
//                         }
//                     });
//                 }
//             })
//             .catch(error => {
//                 console.error("Error making search API call:", error);
//             });
//     } else {
//         // noResultsPopup.classList.remove("show");  // Hide the popup if the query is empty
//         window.location.href = "/";  // Load the default `homePage.html`
//     }
// }

// // Attach the search handler to the search button click
// document.getElementById("searchButton").addEventListener("click", handleSearch);

// // If the form is used to trigger search via "Enter" key, also attach handler to the form submit
// // Attach the event listener to the search form
// document.getElementById("searchForm").addEventListener("submit", handleSearch);

// // Function to close the popup
// function closePopup() {
//     var popup = document.getElementById("noResultsPopup");
//     popup.classList.remove("show");
// }