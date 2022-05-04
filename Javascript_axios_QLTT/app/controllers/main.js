function getEle(id) {
  return document.getElementById(id);
}
var validation = new Validation();
var services = new Services();
var userList = new UserList();

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
    userList.arr.push(data[i]);
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

function layThongTinUser(isChecking = true) {
  //lay value tu cac the input

  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var loaiND = getEle("loaiNguoiDung").value;
  var loaiNgonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;
  var hinhAnh = getEle("HinhAnh").value;

  var isValid = true;
  // kiem tra taikhoan
  if (isChecking == true) {
    isValid = validation.kiemTraTrung(
      taiKhoan,
      "tbtaiKhoan",
      "(*) tào khoản đã tồn tại",
      userList.arr
    );
  }
  isValid &=
    validation.kiemTraRong(
      taiKhoan,
      "tbtaiKhoan",
      "(*) vui lòng nhập tài khoản"
    ) &&
    validation.kiemTraKhoangTrang(
      taiKhoan,
      "tbtaiKhoan",
      "(*) vui lòng không để khoảng trắng"
    );

  // kiem tra hoTen

  isValid &=
    validation.kiemTraRong(hoTen, "tbHoTen", "(*) vui lòng nhập họ tên") &&
    validation.kiemTraHoTen(
      hoTen,
      "tbHoTen",
      "(*) vui lòng nhập họ tên là ký tự"
    );

  //kiem tra mat khau

  isValid &=
    validation.kiemTraRong(
      matKhau,
      "tbMatKhau",
      "(*) vui lòng nhập mật khẩu"
    ) &&
    validation.kiemTraPass(
      matKhau,
      "tbMatKhau",
      "(*) vui lòng nhập mật khẩu đúng format có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số"
    ) &&
    validation.kiemTraDoDai(
      matKhau,
      "tbMatKhau",
      "(*) vui lòng nhập mật khẩu có độ dài từ 6 đến 8 ký tự",
      6,
      8
    );

  // kiem tra email

  isValid &=
    validation.kiemTraRong(email, "tbEmail", "(*) vui lòng nhập email") &&
    validation.kiemTraEmail(
      email,
      "tbEmail",
      "(*) vui lòng nhập email đúng định dạng"
    );

  // kiem tra hinh anh
  isValid &= validation.kiemTraRong(
    hinhAnh,
    "tbHinhAnh",
    "(*) vui lòng input hình ảnh"
  );

  // check nguoi dung

  isValid &= validation.chonGiaTri(
    loaiND,
    "tbloaiNguoiDung",
    "Chọn loại người dùng"
  );

  // check ngon ngu
  isValid &= validation.chonGiaTri(
    loaiNgonNgu,
    "tbloaiNgonNgu",
    "Chọn ngôn ngữ"
  );

  // check mo ta
  isValid &=
    validation.kiemTraRong(moTa, "tbMoTa", "(*) vui lòng nhập mô tả") &&
    validation.kiemTraDoDai(
      moTa,
      "tbMoTa",
      "(*) vui lòng nhập mô tả không quá 60 ký tự",
      0,
      60
    );

  if (isValid) {
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
    return user;
  }
}

function addUser() {
  var user = layThongTinUser();
  if (user) {
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
      getEle("TaiKhoan").disabled = true;
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
  var isValid = true;

  isValid &=
    validation.kiemTraRong(
      taiKhoan,
      "tbtaiKhoan",
      "(*) vui lòng nhập tài khoản"
    ) &&
    validation.kiemTraKhoangTrang(
      taiKhoan,
      "tbtaiKhoan",
      "(*) vui lòng không để khoảng trắng"
    );

  // kiem tra hoTen

  isValid &=
    validation.kiemTraRong(hoTen, "tbHoTen", "(*) vui lòng nhập họ tên") &&
    validation.kiemTraHoTen(
      hoTen,
      "tbHoTen",
      "(*) vui lòng nhập họ tên là ký tự"
    );

  //kiem tra mat khau

  isValid &=
    validation.kiemTraRong(
      matKhau,
      "tbMatKhau",
      "(*) vui lòng nhập mật khẩu"
    ) &&
    validation.kiemTraPass(
      matKhau,
      "tbMatKhau",
      "(*) vui lòng nhập mật khẩu đúng format có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số"
    ) &&
    validation.kiemTraDoDai(
      matKhau,
      "tbMatKhau",
      "(*) vui lòng nhập mật khẩu có độ dài từ 6 đến 8 ký tự",
      6,
      8
    );

  // kiem tra email

  isValid &=
    validation.kiemTraRong(email, "tbEmail", "(*) vui lòng nhập email") &&
    validation.kiemTraEmail(
      email,
      "tbEmail",
      "(*) vui lòng nhập email đúng định dạng"
    );

  // kiem tra hinh anh
  isValid &= validation.kiemTraRong(
    hinhAnh,
    "tbHinhAnh",
    "(*) vui lòng input hình ảnh"
  );

  // check nguoi dung

  isValid &= validation.chonGiaTri(
    loaiND,
    "tbloaiNguoiDung",
    "Chọn loại người dùng"
  );

  // check ngon ngu
  isValid &= validation.chonGiaTri(
    loaiNgonNgu,
    "tbloaiNgonNgu",
    "Chọn ngôn ngữ"
  );

  // check mo ta
  isValid &=
    validation.kiemTraRong(moTa, "tbMoTa", "(*) vui lòng nhập mô tả") &&
    validation.kiemTraDoDai(
      moTa,
      "tbMoTa",
      "(*) vui lòng nhập mô tả không quá 60 ký tự",
      0,
      60
    );

  //tao doi tuong user tu lop doi tuong

  if (isValid) {
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
  }

  console.log(user);

  if (user) {
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
}
