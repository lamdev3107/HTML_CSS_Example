async function fetchData(page = 1) {
  let userList = [];
  try {
    let response = await fetch(`https://reqres.in/api/users?page=1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    console.log("check response:", response);
  } catch (err) {
    console.log("Error fetching data:", err);
  }
}

function renderUserList(users) {
  const userListContainer = document.getElementById("user-list");
  userListContainer.innerHTML = ""; // Clear previous content
  users.forEach((user) => {
    const userItem = document.createElement("div");
    userItem.className = "user-item";
    userItem.innerHTML = `
        <img src="${user.avatar}" alt="${user.first_name} ${user.last_name}">
        <h3>${user.first_name} ${user.last_name}</h3>
        <p>Email: ${user.email}</p>
        `;
    userListContainer.appendChild(userItem);
  });
}

const toggleSidebarBtn = document.querySelector(".toggle-sidebar-btn");
toggleSidebarBtn.addEventListener("click", function () {
  const sidebar = document.querySelector(".main-sidebar");
  sidebar.classList.toggle("hidden");
});
document.addEventListener("DOMContentLoaded", function () {
  fetchData(1);
});
