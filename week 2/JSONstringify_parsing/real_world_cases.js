//local storage
localStorage.setItem("user", JSON.stringify({ name: "Ansh" }));

const user = JSON.parse(localStorage.getItem("user"));
console.log(user.name); // Output: Ansh
console.log(typeof user);

// Sending Data via API:

fetch("/api/data", {
  method: "POST",
  body: JSON.stringify({ name: "Ansh" }),
  headers: { "Content-Type": "application/json" }
});
