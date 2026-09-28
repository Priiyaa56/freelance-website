import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Admin() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Check if an admin session already exists
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      setSession(data.session);
      setAuthLoading(false);
    };

    checkSession();
  }, []);

  // Fetch inquiries
  useEffect(() => {
    const fetchInquiries = async () => {
      // Don't try to fetch inquiries before login
      if (!session) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/inquiries`, {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Could not load inquiries.");
        }

        setInquiries(data.inquiries || []);
      } catch (err) {
        console.error(err);
        setError("Could not load inquiries.");
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [session]);

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoginError("Invalid email or password.");
      return;
    }

    setSession(data.session);
  };

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setInquiries([]);
    setSelectedInquiry(null);
  };

  // Update inquiry status
  const updateStatus = async (id, status) => {
    try {
      setUpdatingStatus(true);
      setError("");

      // Get the latest session
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      if (!currentSession) {
        setSession(null);
        return;
      }

      const response = await fetch(`${API_URL}/api/inquiries/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentSession.access_token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not update status.");
      }

      setInquiries((current) =>
        current.map((inquiry) =>
          inquiry.id === id
            ? {
                ...inquiry,
                status: data.inquiry.status,
              }
            : inquiry,
        ),
      );

      setSelectedInquiry((current) =>
        current && current.id === id
          ? {
              ...current,
              status: data.inquiry.status,
            }
          : current,
      );
    } catch (err) {
      console.error("STATUS UPDATE ERROR:", err);
      setError("Could not update status.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Authentication loading screen
  if (authLoading) {
    return (
      <main
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>Checking admin access...</p>
      </main>
    );
  }

  // Login screen
  if (!session) {
    return (
      <main
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            padding: "35px",
            borderRadius: "20px",
            border: "1px solid rgba(128, 128, 128, 0.25)",
            background: "rgba(255, 255, 255, 0.05)",
          }}
        >
          <h1>Admin Login</h1>

          <p style={{ marginBottom: "25px" }}>
            Sign in to access your project inquiries.
          </p>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "16px" }}>
              <label
                htmlFor="admin-email"
                style={{
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Email
              </label>

              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your admin email"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid rgba(128, 128, 128, 0.35)",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "18px" }}>
              <label
                htmlFor="admin-password"
                style={{
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Password
              </label>

              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid rgba(128, 128, 128, 0.35)",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {loginError && (
              <p
                style={{
                  marginBottom: "15px",
                  fontSize: "14px",
                }}
              >
                {loginError}
              </p>
            )}

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px 18px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </form>
        </div>
      </main>
    );
  }

  // Admin dashboard
  return (
    <main
      style={{
        padding: "60px 5%",
        minHeight: "80vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1>Admin Dashboard</h1>
          <p>Project inquiries received through your portfolio.</p>
        </div>

        <button onClick={handleLogout}>Logout</button>
      </div>

      {loading && <p>Loading inquiries...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && inquiries.length === 0 && (
        <p>No inquiries received yet.</p>
      )}

      {!loading && !error && inquiries.length > 0 && (
        <div
          style={{
            marginTop: "30px",
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Project</th>
                <th>Budget</th>
                <th>Timeline</th>
                <th>Status</th>
                <th>Date</th>
                <th>Message</th>
              </tr>
            </thead>

            <tbody>
              {inquiries.map((inquiry) => (
                <tr key={inquiry.id}>
                  <td>{inquiry.name}</td>
                  <td>{inquiry.email}</td>
                  <td>{inquiry.project_type}</td>
                  <td>{inquiry.budget || "—"}</td>
                  <td>{inquiry.timeline || "—"}</td>
                  <td>{inquiry.status}</td>

                  <td>{new Date(inquiry.created_at).toLocaleDateString()}</td>

                  <td>
                    <button onClick={() => setSelectedInquiry(inquiry)}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedInquiry && (
            <div
              style={{
                marginTop: "30px",
                padding: "25px",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.05)",
              }}
            >
              <h2>Inquiry Details</h2>

              <p>
                <strong>Name:</strong> {selectedInquiry.name}
              </p>

              <p>
                <strong>Email:</strong> {selectedInquiry.email}
              </p>

              <p>
                <strong>Company:</strong>{" "}
                {selectedInquiry.company || "Not provided"}
              </p>

              <p>
                <strong>Project:</strong> {selectedInquiry.project_type}
              </p>

              <p>
                <strong>Budget:</strong>{" "}
                {selectedInquiry.budget || "Not provided"}
              </p>

              <p>
                <strong>Timeline:</strong>{" "}
                {selectedInquiry.timeline || "Not provided"}
              </p>

              <div style={{ marginTop: "15px" }}>
                <strong>Status:</strong>

                <select
                  value={selectedInquiry.status}
                  onChange={(e) =>
                    updateStatus(selectedInquiry.id, e.target.value)
                  }
                  disabled={updatingStatus}
                  style={{
                    marginLeft: "10px",
                    padding: "8px 12px",
                    borderRadius: "8px",
                  }}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="completed">Completed</option>
                </select>

                {updatingStatus && <span> Updating...</span>}
              </div>

              <div>
                <strong>Message:</strong>
                <p>{selectedInquiry.message}</p>
              </div>

              <button onClick={() => setSelectedInquiry(null)}>Close</button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

export default Admin;
