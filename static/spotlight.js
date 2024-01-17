const image = document.getElementById("artist-image");
let zoomLevel = 1;
let zoomIncrement = 0.005;
let isZoomingIn = true;

function animateZoom() {
  if (isZoomingIn) {
    zoomLevel += zoomIncrement;
  } else {
    zoomLevel -= zoomIncrement;
  }

  // Set the CSS transform property to scale the image
  image.style.transform = `scale(${zoomLevel})`;

  // Reverse the zoom direction if we've reached our limits
  if (zoomLevel >= 1.3) {
    isZoomingIn = false;
  } else if (zoomLevel <= 1) {
    isZoomingIn = true;
  }

  // Use a smooth animation curve
  let progress = (zoomLevel - 1) / 0.3;
  let easeProgress = 1 - Math.pow(1 - progress, 3);
  let duration = 1000;
  image.style.transition = `transform ${duration}ms cubic-bezier(0.22, 0.61, 0.36, 1)`;
  image.style.transform = `scale(${zoomLevel}) translateZ(0)`;

  // Call this function again on the next frame
  requestAnimationFrame(animateZoom);
}

animateZoom();



// const image = document.getElementById("artist-image");
// let zoomLevel = 1;
// let zoomIncrement = 0.005;
// let isZoomingIn = true;

// function animateZoom() {
//   if (isZoomingIn) {
//     zoomLevel += zoomIncrement;
//   } else {
//     zoomLevel -= zoomIncrement;
//   }

//   // Set the CSS transform property to scale the image
//   image.style.transform = `scale(${zoomLevel})`;

//   // Reverse the zoom direction if we've reached our limits
//   if (zoomLevel >= 1.3) {
//     isZoomingIn = false;
//   } else if (zoomLevel <= 1) {
//     isZoomingIn = true;
//   }



//   // Call this function again on the next frame
//   requestAnimationFrame(animateZoom);
// }

// animateZoom();

let links = document.getElementsByTagName("a");

let sub = document.getElementsByTagName("sub")[0];
let sub_text = sub.innerHTML;
let idx = 0;

sub.innerHTML = "";

const typeOut = () => {
    if (idx < sub_text.length) {
        sub.innerHTML += sub_text.charAt(idx);
        idx++;
        setTimeout(typeOut, 120);
    }
}

typeOut();


for (let i = 0; i < links.length; i++) {
    let link = links[i];
    // console.log(link.style);
    if (link.id === "card-link") {
        continue;
    }

    link.addEventListener("mouseover", function () {this.style.color = 'red'});
    link.addEventListener("mouseout", function () {this.style.color = 'white'});
}

  // Get references to the form and table elements
  const form = document.querySelector('form');
  const table = document.querySelector('#table tbody');

  // Add an event listener to the form submit button
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get the form input values
    const name = form.elements.name.value;
    const rating = form.elements.rating.value + ' stars';
    const review = form.elements.review.value;

    // Create a new table row and cells
    const newRow = table.insertRow();
    const nameCell = newRow.insertCell();
    const ratingCell = newRow.insertCell();
    const reviewCell = newRow.insertCell();

    // Set the cell values
    nameCell.textContent = name;
    ratingCell.textContent = rating;
    reviewCell.textContent = review;

    // Reset the form
    form.reset();
  });

// const form = document.querySelector('form');
// const tbody = document.querySelector('tbody');

// form.addEventListener('submit', function(event) {
//   event.preventDefault();

//   const name = document.querySelector('#name').value;
//   const rating = document.querySelector('input[name="rating"]:checked').value;
//   const review = document.querySelector('#review').value;

//   const tr = document.createElement('tr');

//   const tdName = document.createElement('td');
//   tdName.textContent = name;
//   tr.appendChild(tdName);

//   const tdRating = document.createElement('td');
//   tdRating.textContent = rating;
//   tr.appendChild(tdRating);

//   const tdReview = document.createElement('td');
//   tdReview.textContent = review;
//   tr.appendChild(tdReview);

//   tbody.appendChild(tr);

//   form.reset();
// });


// // Get the reviews form and reviews table
// const form = document.querySelector('form');
// const table = document.querySelector('#reviews-table');

// // Add event listener to form submit button
// form.addEventListener('submit', (event) => {
//   event.preventDefault(); // Prevent form from submitting

//   // Get form input values
//   const name = form.elements.name.value;
//   const rating = form.elements.rating.value;
//   const review = form.elements.review.value;

//   // Create new row for reviews table
//   const newRow = document.createElement('tr');
//   const nameCell = document.createElement('td');
//   const ratingCell = document.createElement('td');
//   const reviewCell = document.createElement('td');

//   // Set cell values
//   nameCell.textContent = name;
//   ratingCell.textContent = rating;
//   reviewCell.textContent = review;

//   // Append cells to new row
//   newRow.appendChild(nameCell);
//   newRow.appendChild(ratingCell);
//   newRow.appendChild(reviewCell);

//   // Append new row to reviews table
//   table.appendChild(newRow);

//   // Reset form
//   form.reset();
// });

// Countdown timer
const countdown = document.getElementById('countdown-timer');
const releaseDate = new Date('June 30, 2023 00:00:00').getTime();

setInterval(() => {
  const now = new Date().getTime();
  const distance = releaseDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);

