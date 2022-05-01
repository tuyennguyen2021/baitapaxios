function getEle(id) {
  return document.getElementById(id);
}

var services = new Services();

function getListTeacher() {
  services
    .fetchData()
    .then(function (result) {
      renderHTML(result.data);
      console.log(result.data);
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
    content += `
        <tr>
            <td>${i + 1}</td>
            <td>${user.taiKhoan}</td>
            <td>${user.matKhau}</td>
            <td>${user.hoTen}</td>
            <td>${user.email}</td>
            <td>${user.ngonNgu}</td>
            <td>${user.loaiND}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal" onclick="suaUser(${
                  user.id
                })"data-target="#myModal">Sửa</button>
                <button class="btn btn-danger" onclick="xoa(${
                  user.id
                })">Xóa</button>
            </td>

        </tr>
    `;
  }

  getEle("tblDanhSachNguoiDung").innerHTML = content;
}

/**
 * xoa user
 */

function xoa(id) {
  services
    .deleteUserById(id)
    .then(function () {
      getListTeacher();
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * them user
 */

getEle("btnThemNguoiDung").addEventListener("click", function () {
  // fix tieu de
  document.querySelector(".modal-title").innerHTML = "Thêm User Mới";

  // add button "add"
  var footer = `<button class="btn btn-success" onclick ="addUser()">Add</button>`;
  document.querySelector(".modal-footer").innerHTML = footer;
});

function addUser() {
  //lay value tu cac the input

  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var loaiND = getEle("loaiNguoiDung").value;
  var loaiNgonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;
  var hinhAnh = getEle("HinhAnh").value;

  //tao doi tuong user tu lop doi tuong

  var user = new User(
    "",
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiND,
    loaiNgonNgu,
    moTa,
    hinhAnh
  );

  services
    .addUser(user)
    .then(function () {
      getListTeacher();
      // tat pop up

      document.querySelector(".close").click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * sua user
 *
 */

function suaUser(id) {
  // fix tieu de
  document.querySelector(".modal-title").innerHTML = "Sửa User";

  // add button "add"
  var footer = `<button class="btn btn-warning" onclick="update(${id})">Update</button>`;
  document.querySelector(".modal-footer").innerHTML = footer;
  services
    .getUserById(id)
    .then(function (result) {
      console.log(result.data);
      getEle("TaiKhoan").value = result.data.taiKhoan;
      getEle("HoTen").value = result.data.hoTen;
      getEle("MatKhau").value = result.data.matKhau;
      getEle("Email").value = result.data.email;
      getEle("HinhAnh").value = result.data.hinhAnh;
      getEle("loaiNguoiDung").value = result.data.loaiND;
      getEle("loaiNgonNgu").value = result.data.ngonNgu;
      getEle("MoTa").value = result.data.moTa;
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * update user
 */

function update(id) {
  //lay value tu cac the input

  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var loaiND = getEle("loaiNguoiDung").value;
  var loaiNgonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;
  var hinhAnh = getEle("HinhAnh").value;

  //tao doi tuong user tu lop doi tuong

  var user = new User(
    id,
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiND,
    loaiNgonNgu,
    moTa,
    hinhAnh
  );
  console.log(user);

  services
    .putUserById(user)
    .then(function () {
      getListTeacher();
      document.querySelector(".close").click();
    })
    .catch(function (error) {
      console.log(error);
    });
}
