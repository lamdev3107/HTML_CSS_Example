const hamburgerSidebar = document.querySelector(".hamburger-sidebar");
const hamburgerSidebarContent = document.querySelector(
  ".hamburger-sidebar__content"
);
const toggleSidebarBtn = document.querySelector(".header__toggle-sidebar");
const closeSidebarBtn = document.querySelector(".close-sidebar-btn");
toggleSidebarBtn.addEventListener("click", handleSidebarToggle);
closeSidebarBtn.addEventListener("click", handleSidebarToggle);

async function fetchData(page = 1) {
  try {
    let response = await fetch(`https://reqres.in/api/users?page=${page}`, {
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    });
    response = await response.json();
    renderUserList(response.data);
    renderPagination(response.page, response.total_pages);
  } catch (err) {
    console.log("Error fetching data:", err);
  }
}

function renderUserList(users) {
  const userListContainer = document.querySelector(".user-content__list");
  userListContainer.innerHTML = "";
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
  let pagination = document.querySelector(".user-content__pagination");
  console.log("Pagination element:", pagination);
  if (!pagination) {
    pagination = document.createElement("div");
    pagination.className = "user-content__pagination";
    document.querySelector(".user-content").appendChild(pagination);
  }
  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.className = "pagination-btn";
    btn.textContent = i;
    if (i === currentPage) {
      btn.classList.add("is-active");
    } else {
      btn.classList.remove("is-active");
    }
    btn.onclick = () => fetchData(i);
    pagination.appendChild(btn);
  }
}

function handleSidebarToggle() {
  hamburgerSidebar.classList.toggle("is-active");
}

document.addEventListener("click", function (e) {
  if (hamburgerSidebar.classList.contains("is-active")) {
    if (!hamburgerSidebar.contains(e.target) && e.target !== toggleSidebarBtn) {
      hamburgerSidebar.classList.remove("is-active");
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  fetchData();
});
