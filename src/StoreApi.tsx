// export interface User {
//   id: string;
//   username: string;
//   password: string;
//   createDate: string;  
//   createBy: string;
//   updateDate?: string | null;
//   updateBy?: string | null;
//   isDeleted: boolean;
//   token?: string | null;
//   tokenExpiredDate?: string | null;
// //   userCarts?: UserCart[];
// //   userOrders?: UserOrder[];
// }

// const BASE_API_URL = "https://localhost:44355/api/";

// export async function PostNewUser(dataToAdd: User) {
//   try {
//     const url = BASE_API_URL + "Users/register"; 
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(dataToAdd),
//     });

//     if (!response.ok) {
//       let errorMessage = `${response.statusText}`;
//       try {
//         const errorData = await response.json();
//         if (errorData && errorData.message) {
//           errorMessage += `: ${errorData.message}`;
//         }
//       } catch {
//         const errorText = await response.text();
//         if (errorText) {
//           errorMessage += `: ${errorText}`;
//         }
//       }
//       throw new Error(errorMessage);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     if (error instanceof Error) {
//       return { error: error.message };
//     }
//     return { error: String(error) };
//   }
// }
