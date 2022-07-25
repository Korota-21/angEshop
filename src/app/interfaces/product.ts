export interface IProduct {
  _id:string;
  image:string;
  name:string;
  description:string;
  price:string;
  quantity:number;
  colors:string[];
  tags:string[];
  availability:boolean;
  createdAt:string;
  updatedAt:string;
}
