import jwtDecode from "jwt-decode";

export function getToken() {
  return localStorage.getItem("token");
}

export function isAuthenticated() {
  return !!getToken();
}

export function getUserRole() {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role; // 👈 MUST match backend claim name
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem("token");
}


