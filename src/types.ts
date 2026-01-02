export interface OrderData {
  name: string;
  surname: string;
  email: string;
  phone: string;
  company: string;
  comments: string;
  copies: string;
  fileUrl: string;
  specs: { key: string; value: string }[];
}