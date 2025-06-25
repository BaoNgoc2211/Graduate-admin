export interface IDistributor {
  _id?: string; // optional nếu là thêm mới
  nameCo: string;
  nameRep: string;
  email: string;
  phone: string;
  address: string;
  country: string;
}
export interface DistributorFormProps {
  defaultValue?: IDistributor // nếu có thì là update, không thì là create
  onSuccess?: () => void // gọi lại sau khi submit thành công
  onCancel?: () => void // gọi khi hủy form
}
