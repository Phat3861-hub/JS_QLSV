class SinhVien {
  txtMaSV = "";
  txtTenSV = "";
  txtEmail = "";
  txtPass = "";
  txtNgaySinh = "";
  khSV = "";
  txtDiemToan = "";
  txtDiemLy = "";
  txtDiemHoa = "";

  tinhDiemTrungBinh = function () {
    return (
      (this.txtDiemToan * 1 + this.txtDiemLy * 1 + this.txtDiemHoa * 1) / 3
    );
  };
}
