"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.script = void 0;
exports.script = `
(function () {

document.querySelectorAll(".pg-table").forEach(initTable);

function initTable(wrapper) {

  const tbody = wrapper.querySelector("tbody");
  if (!tbody) return;

  const rows = [...tbody.querySelectorAll("tr")];

  const search = wrapper.querySelector(".table-search");
  const select = wrapper.querySelector(".rows-select");
  const info = wrapper.querySelector(".page-info");
  const pager = wrapper.querySelector(".pagination");
  const headers = [...wrapper.querySelectorAll("thead th")];

  let page = 1;
  let sortColumn = -1;
  let ascending = true;

  restorePageSize();

  headers.forEach((th, index) => {

    th.style.cursor = "pointer";
    th.title = "Sort";

    th.onclick = () => {

      if (sortColumn === index) {
        ascending = !ascending;
      } else {
        sortColumn = index;
        ascending = true;
      }

      sortRows(index);
      page = 1;
      render();

    };

  });

  function restorePageSize() {

    const value = localStorage.getItem("pg-page-size");

    if (value) {
      select.value = value;
    }

  }

  function savePageSize() {

    localStorage.setItem("pg-page-size", select.value);

  }

  function size() {

    const value = select.value;

    return value === "all"
      ? rows.length
      : Number(value);

  }

  function sortRows(column) {

    rows.sort((a, b) => {

      const av = a.cells[column].innerText.trim().toLowerCase();
      const bv = b.cells[column].innerText.trim().toLowerCase();

      const result = av.localeCompare(
        bv,
        undefined,
        { numeric: true }
      );

      return ascending ? result : -result;

    });

    rows.forEach(r => tbody.appendChild(r));

  }

  function highlight(row, q) {

    [...row.cells].forEach(cell => {

      const text = cell.textContent || "";

      cell.innerHTML = text;

      if (!q) return;

      cell.innerHTML = text.split(q).join("<mark>" + q + "</mark>");

    });

  }

  function filtered() {

    const q = (search.value || "").trim().toLowerCase();

    return rows.filter(r => {

      highlight(r, q);

      return r.innerText.toLowerCase().includes(q);

    });

  }

  function render() {

    const visible = filtered();

    const pageSize = size();

    const pages = Math.max(
      1,
      Math.ceil(visible.length / pageSize)
    );

    page = Math.min(page, pages);

    rows.forEach(r => {
      r.style.display = "none";
    });

    const start = (page - 1) * pageSize;

    const end = Math.min(
      start + pageSize,
      visible.length
    );

    visible
      .slice(start, end)
      .forEach(r => {

        r.style.display = "";

      });

    info.textContent =
      "Showing " +
      (visible.length === 0 ? 0 : start + 1) +
      "-" +
      end +
      " of " +
      visible.length;

    pager.innerHTML = "";

    const prev = document.createElement("button");

    prev.textContent = "◀";

    prev.disabled = page === 1;

    prev.onclick = () => {

      page--;

      render();

    };

    pager.appendChild(prev);

    const maxButtons = 7;

    let first = Math.max(1, page - 3);

    let last = Math.min(
      pages,
      first + maxButtons - 1
    );

    first = Math.max(
      1,
      last - maxButtons + 1
    );

    for (let i = first; i <= last; i++) {

      const b = document.createElement("button");

      b.textContent = i;

      if (i === page) {
        b.className = "active";
      }

      b.onclick = () => {

        page = i;

        render();

      };

      pager.appendChild(b);

    }

    const next = document.createElement("button");

    next.textContent = "▶";

    next.disabled = page === pages;

    next.onclick = () => {

      page++;

      render();

    };

    pager.appendChild(next);

  }

  search.oninput = () => {

    page = 1;

    render();

  };

  select.onchange = () => {

    savePageSize();

    page = 1;

    render();

  };

  render();

}

})();
`;
