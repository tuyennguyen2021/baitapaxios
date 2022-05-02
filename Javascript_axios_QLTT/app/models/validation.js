function Validation() {
  this.kiemTraRong = function (value, divId, mess) {
    if (value == "") {
      //bi loi
      getEle(divId).innerHTML = mess;
      getEle(divId).style.display = "block";
      return false;
    } else {
      // ko bi loi
      getEle(divId).style.display = "none";
      return true;
    }
  };
  this.kiemTraKhoangTrang = function (value, divId, mess) {
    if (/\s/g.test(value)) {
      //bi loi
      getEle(divId).innerHTML = mess;
      getEle(divId).style.display = "block";
      return false;
    } else {
      // ko bi loi
      getEle(divId).style.display = "none";
      return true;
    }
  };
  this.kiemTraTrung = function (value, divId, mess, arr) {
    var status = false;
    for (var i = 0; i < arr.length; i++) {
      var user = arr[i];
      if (value == user.taiKhoan) {
        status = true;
        break;
      }
    }
    if (status) {
      //khong hop le
      getEle(divId).innerHTML = mess;
      getEle(divId).style.display = "block";
      return false;
    }

    // hop le
    getEle(divId).style.display = "none";
    return true;
  };
  this.chonGiaTri = function (value, divId, defautMess) {
    if (value === defautMess) {
      getEle(divId).innerHTML = "(*)Vui lòng chọn giá trị ";
      getEle(divId).style.display = "block";
      return false;
    } else {
      getEle(divId).style.display = "none";
      return true;
    }
  };

  this.kiemTraHoTen = function (value, divId, mess) {
    var letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.toString().match(letter)) {
      //hop le
      getEle(divId).style.display = "none";
      return true;
    }

    // ko hop le
    getEle(divId).innerHTML = mess;
    getEle(divId).style.display = "block";
    return false;
  };

  this.kiemTraPass = function (value, divId, mess) {
    var letter =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    if (value.match(letter)) {
      //hop le
      getEle(divId).style.display = "none";
      return true;
    }
    // ko hop le
    getEle(divId).innerHTML = mess;
    getEle(divId).style.display = "block";
    return false;
  };
  this.kiemTraDoDai = function (value, divId, mess, min, max) {
    if (value.trim().length >= min && value.trim().length <= max) {
      //hop le
      getEle(divId).style.display = "none";
      return true;
    }
    // ko hop le
    getEle(divId).innerHTML = mess;
    getEle(divId).style.display = "block";
  };
  this.kiemTraEmail = function (value, divId, mess) {
    var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.match(letter)) {
      //hop le
      getEle(divId).style.display = "none";
      return true;
    }
    // ko hop le
    getEle(divId).innerHTML = mess;
    getEle(divId).style.display = "block";
    return false;
  };
}
