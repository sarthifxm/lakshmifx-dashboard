export async function signInWithPassword(
  email: string,
  password: string
) {
  if (
    email === "admin@lakshmifx.com" &&
    password === "admin123"
  ) {
    return {
      success: true,
      message: "Login successful",
    };
  }

  return {
    success: false,
    message: "Invalid email or password",
  };
}