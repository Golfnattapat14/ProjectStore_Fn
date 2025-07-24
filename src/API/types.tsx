// src/api/types.ts
export interface RegisterRequest {
  username: string;
  password: string;
  role: "Buyer" | "Seller" | "Admin";
}

export interface ILoginState {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  username: string;
  token: string;
  role: "Admin" | "Buyer" | "Seller";
}

export interface ProductResponse {
  id: string;
  productName: string;
  productPrice: number;
  productType?: number;
  quantity: number;
  createDate: string;
  createBy: string;
  updateDate?: string;
  updateBy?: string;
  isActive?: boolean;
  createdByName: string;
}

export interface ProductRequest {
  Id?: string;
  ProductName: string;
  ProductPrice: number;
  ProductType: number;
  Quantity: number;
  CreateBy?: string;
  IsActive?: boolean;
}
