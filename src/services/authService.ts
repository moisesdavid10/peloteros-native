import { API_BASE_URL } from "@/config/api";

export interface LoginResponse {
  token: string;
  mensaje?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  nombres: string;
  apellidos: string;
  telefono: string;
}

export interface UsuarioResponse {
  id: number;
  email: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  createdAt?: string; // En JSON las fechas de Java suelen viajar como string
  modifiedAt?: string;
}

export const loginUSer = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.mensaje || "Error desconocido en el servidor");
    }

    const data: LoginResponse = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error en el servicio de login: ", error);
    throw error;
  }
};

export const registerUser = async (
  userData: RegisterRequest,
): Promise<UsuarioResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/registrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.mensaje || "Error al registrar el usuario");
    }

    const data: UsuarioResponse = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error en el servicio de registro: " + error);
    throw error;
  }
};
