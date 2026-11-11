import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const API_BASE = import.meta.env.VITE_API_URL || "";

async function getCsrfToken() {
  const response = await fetch(`${API_BASE}/api/auth/csrf`, {
    credentials: "include",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error("Could not fetch CSRF token.");
  }

  const data = await response.json().catch(() => null);
  const token =
    typeof data === "string"
      ? data
      : data?.token ?? data?.csrfToken ?? data?.XSRFToken;

  if (!token) {
    throw new Error("CSRF token is missing from the server response.");
  }

  return token;
}

async function apiRequest(endpoint, { method = "GET", body, requireCsrf = false } = {}) {
  const headers = { Accept: "application/json" };

  if (body) {
    headers["Content-Type"] = "application/json";
  }
  if (requireCsrf) {
    headers["X-XSRF-TOKEN"] = await getCsrfToken();
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    method,
    credentials: "include",
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json().catch(() => null)
    : await response.text().catch(() => "");

  if (!response.ok) {
    throw new Error(
      typeof payload === "string"
        ? payload || "Request failed."
        : payload?.message || payload?.error || "Request failed."
    );
  }

  return payload;
}

function notifyAuthChange(user) {
  window.dispatchEvent(new CustomEvent("cwt:auth-change", { detail: user }));
}

function getResetTokenFromUrl() {
  if (typeof window === "undefined") {
    return "";
  }

  return new URLSearchParams(window.location.search).get("token") || "";
}

function AuthPage() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetToken, setResetToken] = useState(getResetTokenFromUrl());
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const showResetForm = Boolean(resetToken);

  useEffect(() => {
    function syncResetToken() {
      setResetToken(getResetTokenFromUrl());
    }

    if (typeof window !== "undefined") {
      syncResetToken();
      window.addEventListener("popstate", syncResetToken);
      return () => window.removeEventListener("popstate", syncResetToken);
    }

    return undefined;
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const email = String(formData.get("email") ?? "").trim();
      const password = String(formData.get("password") ?? "");

      if (!email || !password) {
        throw new Error("Email and password are required.");
      }

      const endpoint = isSignUp ? "/api/auth/register" : "/api/auth/login";
      const body = isSignUp
        ? {
            name: String(formData.get("name") ?? "").trim(),
            email,
            password,
          }
        : { email, password };

      if (isSignUp && !body.name) {
        throw new Error("Name is required to create an account.");
      }

      const authResult = await apiRequest(endpoint, {
        method: "POST",
        body,
        requireCsrf: true,
      });

      const currentUser = authResult?.user ?? authResult;

      if (!currentUser?.userId) {
        throw new Error("Authentication succeeded, but the server did not return a user profile.");
      }

      notifyAuthChange(currentUser);
      navigate("/", { replace: true });
    } catch (error) {
      setMessage(error.message || "Could not connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleForgotPasswordSubmit(event) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const email = String(formData.get("email") ?? "").trim();

      if (!email) {
        throw new Error("Email is required.");
      }

      await apiRequest("/api/auth/forgot-password", {
        method: "POST",
        body: { email },
        requireCsrf: true,
      });

      setMessage("Password reset email sent. Check your inbox.");
      setIsForgotPassword(false);
    } catch (error) {
      setMessage(error.message || "Could not send password reset request.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResetPasswordSubmit(event) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const password = String(formData.get("password") ?? "");
      const token = resetToken || getResetTokenFromUrl();

      if (!token) {
        throw new Error("Reset token is missing from the URL.");
      }

      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long.");
      }

      await apiRequest("/api/auth/reset-password", {
        method: "POST",
        body: { token, password },
        requireCsrf: true,
      });

      setMessage("Password updated successfully. Please log in again.");
      if (typeof window !== "undefined") {
        window.history.replaceState({}, "", window.location.pathname);
      }
      setResetToken("");
      setIsForgotPassword(false);
      setIsSignUp(false);
    } catch (error) {
      setMessage(error.message || "Could not reset the password.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleModeChange() {
    setIsSignUp((current) => !current);
    setIsForgotPassword(false);
    setMessage("");
  }

  function handleForgotMode() {
    setIsForgotPassword(true);
    setIsSignUp(false);
    setMessage("");
  }

  return (
    <section className="auth-page">
      <form
        className="auth-card"
        onSubmit={
          showResetForm
            ? handleResetPasswordSubmit
            : isForgotPassword
              ? handleForgotPasswordSubmit
              : handleSubmit
        }
      >
        <h1>
          {showResetForm
            ? "Set a new password"
            : isForgotPassword
              ? "Reset your password"
              : "Login or sign up to start learning"}
        </h1>

        {showResetForm && (
          <>
            <label htmlFor="auth-password">New password</label>
            <input
              id="auth-password"
              name="password"
              type="password"
              placeholder="Enter a new password"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </>
        )}

        {!showResetForm && !isForgotPassword && isSignUp && (
          <>
            <label htmlFor="auth-name">Your full name</label>
            <input
              id="auth-name"
              name="name"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              required
            />
          </>
        )}

        {!showResetForm && (
          <>
            <label htmlFor="auth-email">
              {isForgotPassword ? "Your account email" : "What's your e-mail?"}
            </label>
            <input
              id="auth-email"
              name="email"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              required
            />
          </>
        )}

        {!showResetForm && !isForgotPassword && (
          <>
            <label htmlFor="auth-password">Your password?</label>
            <input
              id="auth-password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              minLength={8}
              required
            />
          </>
        )}

        {showResetForm && (
          <button className="auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update password"}
          </button>
        )}

        {!showResetForm && isForgotPassword && (
          <button className="auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send reset email"}
          </button>
        )}

        {!showResetForm && !isForgotPassword && (
          <>
            <button className="auth-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Please wait..." : isSignUp ? "Create Account" : "Login"}
            </button>

            <button
              className="auth-secondary"
              type="button"
              disabled={isSubmitting}
              onClick={handleModeChange}
            >
              {isSignUp ? "Already have an account? Login" : "Create Account"}
            </button>

            {!isSignUp && (
              <button className="auth-forgot" type="button" onClick={handleForgotMode}>
                Forgot your password?
              </button>
            )}
          </>
        )}

        {showResetForm && (
          <button
            className="auth-secondary"
            type="button"
            disabled={isSubmitting}
            onClick={() => {
              if (typeof window !== "undefined") {
                window.history.replaceState({}, "", window.location.pathname);
              }
              setResetToken("");
              setMessage("");
            }}
          >
            Back to login
          </button>
        )}

        {!showResetForm && isForgotPassword && (
          <button
            className="auth-secondary"
            type="button"
            disabled={isSubmitting}
            onClick={() => {
              setIsForgotPassword(false);
              setMessage("");
            }}
          >
            Back to login
          </button>
        )}

        {message && (
          <p className="auth-message" role="status">
            {message}
          </p>
        )}
      </form>
    </section>
  );
}

export default AuthPage;