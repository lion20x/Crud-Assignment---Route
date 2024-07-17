var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteURL");
var bookmarks = [];

if (localStorage.getItem("bookmarks") != null) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  addToTable();
}

function ModalError() {
  var myModal = new bootstrap.Modal(document.getElementById("warnModal")); // creating modal object
  myModal.show(); // show modal
}

function addProducts() {
  var AddProduct = {
    indexNum: bookmarks.length,
    name: siteName.value,
    url: siteUrl.value,
  };

  if (validateURL() && validateName()) {
    bookmarks.push(AddProduct);
    clearInputs();
  } else {
    ModalError();
  }
  addToTable();
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  console.log(bookmarks);
}

if (localStorage.getItem("bookmarks") != null) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  addToTable();
}

function clearInputs() {
  siteName.value = "";
  siteUrl.value = "";
  document.getElementById("siteName").classList.remove("is-valid");
  document.getElementById("siteURL").classList.remove("is-valid");
}

function visitlink() {
  window.open(bookmarks.url);
}

function validateName() {
  if (siteName.value.trim().length < 3) {
    document.getElementById("siteName").classList.add("is-invalid");
    return false;
  } else {
    document
      .getElementById("siteName")
      .classList.replace("is-invalid", "is-valid");
    return true;
  }
}

function validateURL() {
  var regex =
    /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

  if (regex.test(siteUrl.value) == false) {
    document.getElementById("siteURL").classList.add("is-invalid");
    return false;
  } else {
    document
      .getElementById("siteURL")
      .classList.replace("is-invalid", "is-valid");

    return true;
  }
}

function deleteProduct(index) {
  bookmarks.splice(index, 1);

  addToTable();
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function addToTable() {
  var addBookmark = "";

  for (var i = 0; i < bookmarks.length; i++) {
    if (!/^(?:f|ht)tps?\:\/\//.test(bookmarks[i].url)) {
      bookmarks[i].url = "https://" + bookmarks[i].url;
    }

    addBookmark =
      addBookmark +
      `
          <tr>
          <td>${bookmarks[i].indexNum + 1}</td>
          <td>${
            bookmarks[i].name[0].toUpperCase() + bookmarks[i].name.slice(1)
          }</td>
          <td>
                <button onclick="window.open('${
                  bookmarks[i].url
                }')" id="visitWebsite" class="btn-visit">
                    <i class="fas fa-eye"></i> Visit
                </button>
            </td>
            <td>
                <button onclick="deleteProduct(${i})" id="delWebsite" class="btn-visit">
                <i class="fas fa-trash-alt"></i> Delete
                </button>
            </td>
        </tr>`;
  }

  document.getElementById("BKtable").innerHTML = addBookmark;
}
