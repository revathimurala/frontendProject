let cart = {};
let total = 0;

function addItem(name, price, btn) {

  if (cart[name]) return;

  cart[name] = price;
  total += price;

  btn.innerText = "Remove Item -";
  btn.classList.add("remove");
  btn.onclick = () => removeItem(name, price, btn);

  renderCart();
}

function removeItem(name, price, btn) {
  delete cart[name];
  total -= price;

  btn.innerText = "Add Item ⊕";
  btn.classList.remove("remove");
  btn.onclick = () => addItem(name, price, btn);

  renderCart();
}

function renderCart() {
  const tbody = document.querySelector("#cartTable tbody");
  const emptyMsg = document.getElementById("emptyMsg");
  tbody.innerHTML = "";

  let index = 1;

  for (let item in cart) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index++}</td>
      <td>${item}</td>
      <td>₹${cart[item]}</td>
    `;
    tbody.appendChild(row);
  }

  emptyMsg.style.display = Object.keys(cart).length === 0 ? "block" : "none";
  document.getElementById("total").innerText = "₹" + total;
}
function bookNow() {
  const fname = document.querySelector(".fname").value.trim();
  const email = document.querySelector(".email").value.trim();
  const phno = document.querySelector(".phno").value.trim();

  if (Object.keys(cart).length === 0) {
    showBookingMessage("Please add at least one service to the cart", true);
    return;
  }

  if (!fname || !email || !phno) {
    showBookingMessage("Please fill all details properly", true);
    return;
  }


  showBookingMessage("Booking successful", false);


  clearCartAfterBooking();
}

function showBookingMessage(message, isError) {
  const msgEl = document.getElementById('bookingMsg');
  if (!msgEl) return;
  msgEl.textContent = message;
  msgEl.classList.remove('hidden');
  msgEl.classList.toggle('error', !!isError);
  msgEl.classList.toggle('success', !isError);

  setTimeout(() => {
    msgEl.classList.add('hidden');
  }, 4000);
}

function clearCartAfterBooking() {

  cart = {};
  total = 0;
  renderCart();

  const buttons = document.querySelectorAll('.add-btn');
  buttons.forEach(btn => {
    const name = btn.dataset.name || '';
    const price = Number(btn.dataset.price || 0);
    btn.innerText = 'Add Item ⊕';
    btn.classList.remove('remove');
    btn.onclick = () => addItem(name, price, btn);
    
    
    const fnameEl = document.querySelector('.fname');
    const emailEl = document.querySelector('.email');
    const phnoEl = document.querySelector('.phno');
    if (fnameEl) fnameEl.value = '';
    if (emailEl) emailEl.value = '';
    if (phnoEl) phnoEl.value = '';
  });
}
function showAboutAlert(message) {
  document.getElementById("aboutAlertMsg").innerText = message;
  document.getElementById("aboutAlert").classList.remove("hidden");
  const aboutEl = document.querySelector('.about');
  if (aboutEl) aboutEl.classList.add('blurred');
}

function closeAboutAlert() {
  document.getElementById("aboutAlert").classList.add("hidden");
  const aboutEl = document.querySelector('.about');
  if (aboutEl) aboutEl.classList.remove('blurred');
}
