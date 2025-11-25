import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

const API_BASE = "http://localhost:8000";

function AdminPanel() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [vehicleType, setVehicleType] = useState("bike");
  const [adminToken, setAdminToken] = useState("devtoken");
  const [status, setStatus] = useState(null);
  const [creating, setCreating] = useState(false);

  // NEW: list state
  const [vehicles, setVehicles] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // ---- LOAD EXISTING VEHICLES ----
  const fetchVehicles = async () => {
    try {
      setListLoading(true);
      setListError(null);

      const res = await fetch(`${API_BASE}/vehicles`);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`List error ${res.status}: ${text}`);
      }
      const data = await res.json();
      setVehicles(data);
    } catch (err) {
      console.error("Error loading vehicles:", err);
      setListError(err.message || "Failed to load vehicles");
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- CREATE VEHICLE ----
  const apiCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    setStatus("creating...");

    try {
      const payload = {
        name,
        description,
        image_url: imageUrl,
        price,
        vehicle_type: vehicleType,
      };

      const res = await fetch(`${API_BASE}/admin/vehicles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": adminToken,
        },
        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get("content-type") || "";

      if (!res.ok) {
        if (contentType.includes("application/json")) {
          const errJson = await res.json();
          setStatus(
            `error ${res.status}: ${
              errJson.detail || JSON.stringify(errJson)
            }`
          );
        } else {
          const text = await res.text();
          setStatus(`error ${res.status}: ${text}`);
        }
        return;
      }

      setStatus("created ✅");
      setName("");
      setDescription("");
      setImageUrl("");
      setPrice("");

      // refresh list
      fetchVehicles();
    } catch (err) {
      setStatus(`network/error: ${err.message}`);
    } finally {
      setCreating(false);
    }
  };

  // ---- DELETE VEHICLE ----
  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this vehicle?");
    if (!ok) return;

    try {
      setDeletingId(id);
      setStatus(null);

      const res = await fetch(`${API_BASE}/admin/vehicles/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-token": adminToken,
        },
      });

      const contentType = res.headers.get("content-type") || "";

      if (!res.ok) {
        if (contentType.includes("application/json")) {
          const errJson = await res.json();
          setStatus(
            `delete error ${res.status}: ${
              errJson.detail || JSON.stringify(errJson)
            }`
          );
        } else {
          const text = await res.text();
          setStatus(`delete error ${res.status}: ${text}`);
        }
        return;
      }

      setStatus("deleted ✅");
      // remove from list / or refetch
      setVehicles((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      setStatus(`delete network/error: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel — Add Vehicle</h2>
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back
      </button>

      <form className="admin-form" onSubmit={apiCreate}>
        <label>Admin Token (default: devtoken)</label>
        <input
          value={adminToken}
          onChange={(e) => setAdminToken(e.target.value)}
        />

        <label>Type</label>
        <select
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
        >
          <option value="bike">Bike</option>
          <option value="car">Car</option>
          <option value="van">Van</option>
          <option value="bus">Bus</option>
        </select>

        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Image URL</label>
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://... or leave empty"
        />

        <label>Price</label>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="e.g. 37000"
        />

        <button type="submit" disabled={creating}>
          {creating ? "Creating…" : "Create Vehicle"}
        </button>
      </form>

      <div className="admin-status">{status}</div>

      {/* ---- LIST SECTION ---- */}
      <h3 className="admin-list-title">Existing Vehicles</h3>

      {listLoading && <p>Loading vehicles...</p>}
      {listError && <p style={{ color: "red" }}>{listError}</p>}
      {!listLoading && !listError && vehicles.length === 0 && (
        <p>No vehicles found.</p>
      )}

      {!listLoading && !listError && vehicles.length > 0 && (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => (
                <tr key={v.id}>
                  <td>{v.id}</td>
                  <td>{v.vehicle_type}</td>
                  <td>{v.name}</td>
                  <td>{v.price}</td>
                  <td className="admin-desc-cell">
                    {v.description || "-"}
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(v.id)}
                      disabled={deletingId === v.id}
                    >
                      {deletingId === v.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
