export interface IManufacturer {
  _id?: string
  nameCo: string; // Tên công ty
  country: string;
  branch: string; // Tên thương hiệu
}
export interface ManufacturerFormProps {
  defaultValue?: IManufacturer // nếu có thì là update, không thì là create
  onSuccess?: () => void // gọi lại sau khi submit thành công
  onCancel?: () => void // gọi khi hủy form
}