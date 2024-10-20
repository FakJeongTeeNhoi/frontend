import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function login(email: string, password: string) {
  try {
    const response = await axios.post(
      `${backendUrl}/api/auth/login?type=staff`,
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
}: {
  email: string;
  password: string;
  name: string;
  faculty: string;
  type: string;
}) {
  console.log(email, password, name, faculty, type);
  console.log("PATH", `${backendUrl}/api/auth/register?type=staff`);
  try {
    const response = await axios.post(
      `${backendUrl}/api/auth/register?type=staff`,
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
}

export async function verify(token: string) {
  try {
    const response = await axios.get(`${backendUrl}/api/auth/verify`, {
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
      `${backendUrl}/api/auth/change-password`,
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
