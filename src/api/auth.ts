import axios from "axios";
import { getSession } from "next-auth/react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function login(email: string, password: string, type: string) {
  try {
    const response = await axios.post(
      `${backendUrl}/user/auth/login?type=${type}`,
      {
        email,
        password,
      }
    );
    console.log("Login response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function register({
  email,
  password,
  name,
  faculty,
  type,
  role,
  user_id,
}: {
  email: string;
  password: string;
  name: string;
  faculty: string;
  type: string;
  role?: string;
  user_id?: string;
}) {
  console.log(email, password, name, faculty, type);
  if (type === "staff") {
    try {
      const response = await axios.post(
        `${backendUrl}/user/auth/register?type=${type}`,
        {
          email,
          password,
          name,
          faculty,
          type,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  } else {
    try {
      const response = await axios.post(
        `${backendUrl}/user/auth/register?type=${type}`,
        {
          email,
          password,
          name,
          faculty,
          type,
          role,
          user_id,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  }
}

export async function verify(token: string) {
  try {
    const response = await axios.get(`${backendUrl}/user/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Verify error:", error);
    throw error;
  }
}

export async function changePassword(
  token: string,
  oldPassword: string,
  newPassword: string
) {
  try {
    const response = await axios.post(
      `${backendUrl}/user/auth/change-password`,
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Change password error:", error);
    throw error;
  }
}

export async function logout() {
  const session = await getSession(); // Get the session
  const token = session?.token;
  try {
    const response = await axios.post(
      `${backendUrl}/user/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}
