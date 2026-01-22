let guestSelect = document.getElementById("guests");

guestSelect.addEventListener("change", function () {
  let guestCount = Number(this.value);
  // console.log(guestCount);
  let summaryGuest = document.getElementById("summary-guest");
  summaryGuest.innerHTML = guestCount;
  // console.log(summaryGuest);

  // let basePrice = document.getElementById("base-price");
  // let totalPrice = document.getElementById("total-price");

  // let intBasePrice = Number(basePrice.dataset.price);
  // totalPrice.innerHTML = intBasePrice * guestCount;
  // console.log(intBasePrice);
});

let today = new Date().toISOString().split("T")[0];

let selectCheckIn = document.getElementById("checkIn");
let selectCheckOut = document.getElementById("checkOut");

checkIn.min = today;
checkOut.min = today;

selectCheckOut.addEventListener("change", function () {
  let checkInValue = selectCheckIn.value;
  let checkOutValue = this.value;

  let checkInDate = new Date(checkInValue);
  let checkOutDate = new Date(checkOutValue);

  let totalDays =
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24);

  let totalDuration = document.getElementsByClassName("days");

  totalDuration[0].innerText = totalDays;
});

selectCheckIn.addEventListener("change", function () {
  let checkInDate = new Date(this.value);

  // add 1 day
  checkInDate.setDate(checkInDate.getDate() + 1);

  let minCheckout = checkInDate.toISOString().split("T")[0];
  selectCheckOut.min = minCheckout;

  // reset checkout if user changes check-in again
  // selectCheckOut.value = "";
});

//Back Icon

document.getElementById("backBtn").addEventListener("click", function () {
  window.history.back();
});
