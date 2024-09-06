// tổng hợp các chức năng sẽ thực hiện trong bài quản lý sinh viên
// CRUD - (Create - Read - Update - Delete)
// Thêm sinh viên (done)
// Xóa sinh viên
// Cập nhật sinh viên
// Clear dữ liệu đang có trong form
// Render dữ liệu lên trên giao diện (done)
// Lưu trữ dữ liệu ở local storage
// Validation dữ liệu
// Tìm kiếm sinh viên
// Thông báo cho người dùng

let arrSinhVien = [];
// --------------- Thêm Sinh Viên -----------------
document.getElementById("formQLSV").onsubmit = function (event) {
  //prevendDefault dùng để ngăn chặn sự kiện reload
  event.preventDefault();

  // Thực hiện xử lý và truy cập lấy tất cả dữ liệu từ các input có trong giao diện
  let arrField = document.querySelectorAll("#formQLSV input,select");
  let sinhVien = new SinhVien();
  for (let field of arrField) {
    // destructuring
    let { value, id } = field;
    sinhVien[id] = value;
  }
  arrSinhVien.push(sinhVien);
  setLocalStorage("sinhVien", arrSinhVien);
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
                    <button class="btn btn-danger">Xóa</button>
                    <button class="btn btn-warning">Sửa</button>
                </td>
            </tr>
        `;
  }
  document.getElementById("tbodySinhVien").innerHTML = content;
}

window.onload = function () {
  let dataLocal = getLocalStorage("arrSinhVien"); // data | null
  if (dataLocal) {
    arrSinhVien = dataLocal;
    renderDataSinhVien();
  }
};

// --------------- local storage ----------------
// 3 phương thức chính : setItem , getItem , removeItem

// setItem() truyền vào 2 giá trị là key (tên dữ liệu cần lưu), giá trị của key
localStorage.setItem("hoTen", "Tấn Phát");
let arrMonAn = [
  {
    tenMon: "Màn thầu",
  },
  {
    tenMon: "Xí Quách",
  },
];
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
