import { IProduct } from "./product";
import { IUser } from "./user";

export interface IcartItem {
  _id?: string;
  product: IProduct;
  quantity: string;
  user?: IUser;
}
