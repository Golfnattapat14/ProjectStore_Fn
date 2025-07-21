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
  Id: string;
  ProductName: string;
  ProductPrice: number;
  ProductType?: number;
  Quantity: number;
  CreateDate: string;
  CreateBy: string;
  UpdateDate?: string;
  UpdateBy?: string;
  IsActive?: boolean;
}

export interface ProductRequest {
  ProductName: string;
  ProductPrice: number;
  ProductType: number;
  Quantity: number;
  CreateBy: string;
  IsActive?: boolean;
}




const BASE_API_URL = "https://localhost:44355/api/";

export async function registerUser(data: RegisterRequest) {
  try {
    const response = await fetch(BASE_API_URL + "users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Register failed");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Register error: " + error.message);
    }
    throw new Error("Unknown error");
  }
}

export async function loginUser( credentials: ILoginState): Promise<LoginResponse> {
  const response = await fetch(BASE_API_URL + "users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return await response.json();
}

export async function addNewProduct(product: ProductRequest): Promise<ProductResponse> {
  const response = await fetch(BASE_API_URL + "users/New-Product", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "ไม่สามารถเพิ่มสินค้าได้");
  }

  return await response.json();
}

export async function getProducts(): Promise<ProductResponse[]> {
  const response = await fetch(BASE_API_URL + "users/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "ไม่สามารถดึงข้อมูลสินค้าได้");
  }

  return await response.json();
}





