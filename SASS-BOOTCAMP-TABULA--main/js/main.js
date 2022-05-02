//header scrolling

const header = document.querySelector("#header");

function scrollheader(event) {
  if (window.scrollY > 0) {
    header.classList.add("header-onscroll");
    header.classList.remove("header-default");
  } else {
    header.classList.add("header-default");
    header.classList.remove("header-onscroll");
  }
}

window.addEventListener("scroll", scrollheader);

function getEle(id) {
  return document.getElementById(id);
}

var services = new Services();

function getListTeacher() {
  var promise = services.fetchData();
  promise
    .then(function (result) {
      renderHTML(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getListTeacher();

function renderHTML(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    var user = data[i];
    if (user.loaiND === "GV") {
      content += `
        <div class="col-12 col-md-6 col-lg-3">
                      <div class="card">
                          <div class="card-img">
                              <img class="card-img-top" src="./img/${user.hinhAnh}" alt="">
                          </div>
                          <div class="card-body">
                              <h6 class="card-title1">${user.ngonNgu}</h6>
                              <h4 class="card-title2">${user.hoTen}</h4>
                              <p class="card-text">${user.moTa}</p>
                          </div>
                      </div>
        </div>
  
      `;
    }
  }
  getEle("user__list").innerHTML = content;
}
