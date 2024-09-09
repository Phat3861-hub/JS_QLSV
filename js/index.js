// tổng hợp các chức năng sẽ thực hiện trong bài quản lý sinh viên
// CRUD - (Create - Read - Update - Delete)
// Thêm sinh viên (done)
// Xóa sinh viên
// Cập nhật sinh viên
// Clear dữ liệu đang có trong form
// Render dữ liệu lên trên giao diện (done)
// Lưu trữ dữ liệu ở local storage (done)
// Validation dữ liệu
// Tìm kiếm sinh viên
// Thông báo cho người dùng

let arrSinhVien = [];
// --------------- Thêm Sinh Viên -----------------
document.getElementById("formQLSV").onsubmit = function (event) {
  //prevendDefault dùng để ngăn chặn sự kiện reload
  event.preventDefault();
  // Thực hiện xử lý và truy cập lấy tất cả dữ liệu từ các input có trong giao diện
  let sinhVien = getValueForm();
  arrSinhVien.push(sinhVien);
  setLocalStorage("arrSinhVien", arrSinhVien);
  renderDataSinhVien();
  // trỏ tới thẻ form đang chạy unsubmit
  // xóa các giá trị người dùng nhập sau khi submit (reset lại các ô input)
  event.target.reset();
};

// Chức năng hiển thị sinh viên lên table
function renderDataSinhVien(arr = arrSinhVien) {
  let content = "";
  for (let sinhVien of arr) {
    // dữ liệu lấy từ local ==> dữ liệu không có phương thức
    // tạo ra một đối tượng mới ===> có phương thức nhưng không có dữ liệu
    let newSinhVien = new SinhVien();
    Object.assign(newSinhVien, sinhVien);
    let { txtMaSV, txtTenSV, txtEmail, txtNgaySinh, khSV } = newSinhVien;
    content += `
            <tr>
                <td>${txtMaSV}</td>
                <td>${txtTenSV}</td>
                <td>${txtEmail}</td>
                <td>${txtNgaySinh}</td>
                <td>${khSV}</td>
                <td>${newSinhVien.tinhDiemTrungBinh().toFixed(2)}</td>
                <td>
                    <button onclick="deleteSinhVien('${txtMaSV}')" class="btn btn-danger">Xóa</button>
                    <button onclick="getInfoSinhVien('${txtMaSV}')" class="btn btn-warning">Sửa</button>
                </td>
            </tr>
        `;
  }
  document.getElementById("tbodySinhVien").innerHTML = content;
}

window.onload = function () {
  let dataLocal = getLocalStorage("arrSinhVien");
  if (dataLocal) {
    console.log(dataLocal);
    arrSinhVien = dataLocal;
    renderDataSinhVien();
  }
};

// --------------- local storage ----------------
// 3 phương thức chính : setItem , getItem , removeItem

// setItem() truyền vào 2 giá trị là key (tên dữ liệu cần lưu), giá trị của key
// localStorage.setItem("hoTen", "Tấn Phát");
// let arrMonAn = [
//   {
//     tenMon: "Màn thầu",
//   },
//   {
//     tenMon: "Xí Quách",
//   },
// ];
// biến đổi những object trong mảng thành chuỗi bằng JSON.stringify()
// let dataString = JSON.stringify(arrMonAn);
// console.log(dataString);
// localStorage.setItem("arr", dataString);

// // chuyển đổi chuỗi JSON thành mảng bình thường
// let dataLocal = JSON.parse(localStorage.getItem("arr"));
// console.log(dataLocal);
// let parseValue = dataLocal ? JSON.parse(dataLocal) : null;

// localStorage.removeItem("hoTen");

// tạo ra một function sẽ giúp đưa bất kĩ dũ liệu nào xuống local storage lưu trữ
function setLocalStorage(key, data) {
  let dataString = JSON.stringify(data);
  localStorage.setItem(key, dataString);
}

function getLocalStorage(key) {
  let dataLocal = localStorage.getItem(key);
  return dataLocal ? JSON.parse(dataLocal) : null;
}
// ----------- CHỨC NĂNG XÓA SINH VIÊN --------------
function deleteSinhVien(maSV) {
  // khi xóa 1 phần tử, sử dụng phương thức splice(vị trí bắt đầu, số lượng phần tử cần xóa)
  // xử lý tìm kiếm vị trí sinh viên trong mảng
  let index = arrSinhVien.findIndex((item, i) => item.txtMaSV == maSV);
  if (index != -1) {
    arrSinhVien.splice(index, 1);
    renderDataSinhVien();
    setLocalStorage("arrSinhVien", arrSinhVien);
  }
  // thao tác xóa sinh viên cập nhật dữ liệu
}

//---------get info sinhvien -------------
// B1. gắn function getinfoSinhVien vao nút sửa
// B2. thực hiện tìm kiếm sinh viên trong mảng
// B3. thực hiện đưa dữ liệu viết lên input trong form cho người dùng chỉnh sửa
// B4. Ngăn chặn người dùng chỉnh sửa mã sinh viên (disabled, read only)
function getInfoSinhVien(maSV) {
  let sinhVien = arrSinhVien.find((item, index) => item.txtMaSV == maSV);
  if (sinhVien) {
    let arrField = document.querySelectorAll(
      "#formQLSV input,#formQLSV select"
    );
    for (let field of arrField) {
      // field đại diện cho các select input tìm kiếm được trong form
      field.value = sinhVien[field.id];
      if (field.id == "txtMaSV") {
        field.readOnly = true;
      }
    }
  }
}

// chức năng cập nhật sinh viên
// B1. DOM tới nút button cập nhật và tạo một sự kiện click
// B2. Xử lý lấy dữ liệu người dùng đã cập nhật trên form
// B3. Tìm kiếm tới vị trí của phần tử được cập nhật
// B4. Thay thế dữ liệu mới vào vị trí của phần tử được cập nhật
// B5. Thực hiện chạy lại hàm render và cập nhật xuống local storage
// B6. CLear toàn bộ dữ liệu của form và tắt readOnly của input

document.getElementById("updateSV").onclick = function () {
  let sinhVien = getValueForm();
  let index = arrSinhVien.findIndex(
    (item, i) => item.txtMaSV == sinhVien.txtMaSV
  );
  if (index != -1) {
    arrSinhVien[index] = sinhVien;
    renderDataSinhVien();
    setLocalStorage("arrSinhVien", arrSinhVien);
    document.getElementById("txtMaSV").readOnly = false;
    document.getElementById("formQLSV").reset();
  }
};

//----------- get value form ----------------
function getValueForm() {
  let arrField = document.querySelectorAll("#formQLSV input,#formQLSV select");
  let sinhVien = new SinhVien();
  for (let field of arrField) {
    // destructuring
    let { value, id } = field;
    sinhVien[id] = value;
  }
  return sinhVien;
}
