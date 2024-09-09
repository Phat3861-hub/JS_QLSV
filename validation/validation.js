/*  Kiểm tra dũ liệu rỗng, 
    kiểm tra định dạng email, 
    kiểm tra giới hạn ký tự, 
    kiểm tra xem giá trị nhập vào có trong khoảng hay không, 
    kiểm tra nhập vào chữ không cho phép số */

function checkEmptyValue(theThongBao, value) {
  // value = ""
  if (value == "") {
    // thông báo lỗi
    theThongBao.innerHTML = "Vui lòng không bỏ trống";
    return false;
  } else {
    // xóa thông báo khi không còn lỗi
    theThongBao.innerHTML = "";
    return true;
  }
}

// value ="abcdef" ==> yêu cầu người dùng nhập dữ liệu từ 4-10 ký tự
//6 -10
function checkMinMaxValue(theThongBao, value, min, max) {
  let doDaiValue = value.length;
  if (doDaiValue < min || doDaiValue > max) {
    theThongBao.innerHTML = `Vui lòng nhập trong khoảng từ ${min} - ${max}`;
    return false;
  } else {
    theThongBao.innerHTML = "";
    return true;
  }
}

function checkEmailValue(theThongBao, value) {
  let regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let checkEmail = regexEmail.test(value); // true || false
  if (checkEmail) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML = "vui lòng nhập đúng định dạng email";
    return false;
  }
}

function checkPasswordValue(theThongBao, value) {
  let regexPassword = /^(?=.*[A-Z])(?=.*[\W_]).+$/;
  let checkPassword = regexPassword.test(value);
  if (checkPassword) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML =
      "Vui lòng nhập mật khẩu có ít nhất 1 ký tự viết hoa và 1 ký tự đặc biệt";
    return false;
  }
}
