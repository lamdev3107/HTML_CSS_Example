async function fetchData(page = 1) {
  try {
    let response = await fetch(`https://reqres.in/api/users?page=${page}`, {
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    });
    response = await response.json();
    console.log("check response", response);
    renderUserList(response.data);
    renderPagination(response.page, response.total_pages);
  } catch (err) {
    console.log("Error fetching data:", err);
  }
}

function renderUserList(users) {
  const userListContainer = document.querySelector(".user-content__list");
  userListContainer.innerHTML = ""; // Clear previous content
  users.forEach((user) => {
    const userItem = document.createElement("div");
    userItem.className = "user-item";
    userItem.innerHTML = `
        <img src="${user.avatar}" alt="${user.first_name} ${user.last_name}" >
        <div class="user-item__desc">
          <h3 class="user-item__name">${user.first_name} ${user.last_name}</h3>
          <p class="user-item__email"> ${user.email}</p>
        </div>
        `;
    userListContainer.appendChild(userItem);
  });
}

function renderPagination(currentPage, totalPages) {
  let pagination = document.querySelector(".pagination");
  if (!pagination) {
    pagination = document.createElement("div");
    pagination.className = "pagination";
    pagination.style = "margin: 20px 0; text-align: center;";
    document.querySelector(".user-content").appendChild(pagination);
  }
  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.style = `margin:0 5px; padding:5px 10px; border-radius:5px; border:1px solid #004d1f; background:${
      i === currentPage ? "#004d1f" : "#fff"
    }; color:${i === currentPage ? "#fff" : "#004d1f"};`;
    btn.onclick = () => fetchData(i);
    pagination.appendChild(btn);
  }
}

function handleSidebarToggle() {
  if (mainSidebar.classList.contains("active")) {
    mainSidebar.classList.remove("active");
  } else {
    mainSidebar.classList.add("active");
  }
}

// Toggle sidebar cho desktop
const mainSidebar = document.querySelector(".main-sidebar");
const mainSidebarContent = document.querySelector(".main-sidebar__content");
const toggleSidebarBtn = document.querySelector(".header__toggle-sidebar");
const closeSidebarBtn = document.querySelector(".close-sidebar-btn");
toggleSidebarBtn.addEventListener("click", handleSidebarToggle);
closeSidebarBtn.addEventListener("click", handleSidebarToggle);
// Toggle sidebar cho mobile/tablet

document.addEventListener("click", function (e) {
  if (mainSidebar.classList.contains("active")) {
    console.log("check sidebar", mainSidebar.classList);
    if (!mainSidebar.contains(e.target) && e.target !== toggleSidebarBtn) {
      mainSidebar.classList.remove("active");
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  fetchData(1);
});
