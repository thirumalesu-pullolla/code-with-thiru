import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";

const API_BASE = import.meta.env.VITE_API_URL || "";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    let active = true;
    let authChanged = false;

    function handleAuthChange(event) {
      authChanged = true;
      setUser(event.detail || null);
      setIsLoading(false);
      setStatusMessage("");
    }

    window.addEventListener("cwt:auth-change", handleAuthChange);

    fetch(`${API_BASE}/api/auth/me`, {
      credentials: "include",
      headers: { Accept: "application/json" },
    })
      .then(async (response) => {
        if (!response.ok) {
          return null;
        }

        return response.json();
      })
      .then((currentUser) => {
        if (active && !authChanged) {
          setUser(currentUser);
        }
      })
      .catch(() => {
        if (active && !authChanged) {
          setUser(null);
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
      window.removeEventListener("cwt:auth-change", handleAuthChange);
    };
  }, []);

  async function handleLogout() {
    setStatusMessage("");
    setIsLoggingOut(true);

    try {
      const csrfResponse = await fetch(`${API_BASE}/api/auth/csrf`, {
        credentials: "include",
        headers: { Accept: "application/json" },
      });

      if (!csrfResponse.ok) {
        throw new Error("Could not fetch CSRF token.");
      }

      const csrfData = await csrfResponse.json();
      const csrfToken =
        typeof csrfData === "string"
          ? csrfData
          : csrfData?.token ?? csrfData?.csrfToken ?? csrfData?.XSRFToken;

      if (!csrfToken) {
        throw new Error("CSRF token is missing from the server response.");
      }

      const response = await fetch(`${API_BASE}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": csrfToken,
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(error?.message || "Could not log out.");
      }

      setUser(null);
      window.dispatchEvent(new CustomEvent("cwt:auth-change", { detail: null }));
      setStatusMessage("You have been logged out.");
      navigate("/", { replace: true });
    } catch (error) {
      setStatusMessage(error.message || "Could not log out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <header className="navbar">
      <NavLink className="logo" to="/">
        <span className="logo-icon">&lt;/&gt;</span>
        Code With <span>Thiru</span>
      </NavLink>

      <nav className="nav-links" aria-label="Main navigation">
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/problems">
          Problems
        </NavLink>

        <NavLink to="/dsa">
          DSA
        </NavLink>

        <NavLink to="/java">
          Java
        </NavLink>

        <NavLink to="/spring-boot">
          Spring Boot
        </NavLink>

        <NavLink to="/react">
          React
        </NavLink>

        {!isLoading &&
          (user ? (
            <>
              <span className="nav-user" title={user.email} role="status">
                Hi, {user.name || "there"}
              </span>
              <button
                className="nav-login-button auth-submit"
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? "Logging out…" : "Log out"}
              </button>
            </>
          ) : (
            <NavLink className="nav-login-button" to="/login">
              Login
            </NavLink>
          ))}
        {statusMessage && (
          <span className="auth-message" role="status">
            {statusMessage}
          </span>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
