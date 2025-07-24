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

export interface User {
  id: string;
  username: string;
  password: string;
  role: string;
  createDate: string;       
  createBy: string;
  updateDate?: string | null;
  updateBy?: string | null;
  isDeleted?: boolean | null;
  token?: string | null;
  tokenExpiredDate?: string | null;
}

export interface UserResponse{
    id : string;
    username : string;
    role : string;
    isDeleted : boolean;
}

export interface UpdateUserRequest{
    username : string;
    role : string;
    isDeleted:boolean;
}
