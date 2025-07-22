// StoreApi.ts
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

const BASE_API_URL = "https://localhost:44355/api/";

function getToken() {
  return localStorage.getItem("token") ?? "";
}

function getAuthHeaders() {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function registerUser(data: RegisterRequest) {
  const response = await fetch(BASE_API_URL + "users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Register failed");
  }

  return response.json();
}

export async function loginUser(
  credentials: ILoginState
): Promise<LoginResponse> {
  const response = await fetch(BASE_API_URL + "users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
}

export async function addNewProduct(
  product: ProductRequest
): Promise<ProductResponse> {
  const headers = getAuthHeaders();
  if (!headers.Authorization) throw new Error("Token not found, please login");

  const response = await fetch(BASE_API_URL + "products", {
    // <-- แก้ตรงนี้
    method: "POST",
    headers,
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "ไม่สามารถเพิ่มสินค้าได้");
  }

  return response.json();
}

export async function getProducts(): Promise<ProductResponse[]> {
  const headers = getAuthHeaders();
  if (!headers.Authorization) throw new Error("Token not found, please login");

  const response = await fetch(BASE_API_URL + "products", {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "ไม่สามารถดึงข้อมูลสินค้าได้");
  }

  return response.json();
}

export async function updateProduct(
  id: string,
  data: {
    Id: string;
    ProductName: string;
    ProductPrice: number;
    ProductType: number;
    Quantity: number;
    IsActive: boolean;
  }
): Promise<ProductResponse> {
  const headers = getAuthHeaders();
  if (!headers.Authorization) throw new Error("Token not found, please login");

  const response = await fetch(`${BASE_API_URL}products/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "ไม่สามารถอัปเดตข้อมูลสินค้าได้");
  }

  return response.json();
}

export async function getProductById(id: string): Promise<ProductResponse> {
  const response = await fetch(`${BASE_API_URL}products/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "ไม่สามารถดึงข้อมูลสินค้ารายการนี้ได้"
    );
  }

  return response.json();
}
