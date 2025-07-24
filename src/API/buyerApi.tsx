import { getAuthHeaders } from "./TokenSetting";
import type { ProductResponse } from "./types";

const BASE = "https://localhost:44355/api/";

export async function getProducts(): Promise<ProductResponse[]> {
  const headers = getAuthHeaders();
  const res = await fetch(`${BASE}buyer/all`, { method: "GET", headers });
  if (!res.ok) throw new Error("โหลดสินค้า (Buyer) ล้มเหลว");
  return res.json();
}
