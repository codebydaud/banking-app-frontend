import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext"; // Import AuthContext for authentication
import TextInput from "./TextInput"; // Import TextInput component
import Form from "./Form";
import Button from "./Button";

export default function ProfilePageAdmin() {
  const { accountNumber } = useParams(); // Get accountNumber from URL parameters
  const { currentAdmin } = useAuth(); // Get currentAdmin from AuthContext for authorization
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode] = useState("PK");
  const [balance, setBalance] = useState("");
  const [newPassword, setNewPassword] = useState(""); // New password state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const [isEditMode, setIsEditMode] = useState(false); // Edit mode state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if no currentAdmin data
    if (!currentAdmin) {
      navigate("/admin/login", { replace: true });
      return;
    }

    // Fetch profile data based on accountNumber
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/admin/account/${accountNumber}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminAuthToken")}`,
            },
          }
        );

        // Set state with the fetched data
        const data = response.data;
        setName(data.name);
        setEmail(data.email);
        setAddress(data.address);
        setPhoneNumber(data.phoneNumber);
        setBalance(data.balance);
      } catch (err) {
        setError("Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [accountNumber, currentAdmin, navigate]);

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!email || !address || !phoneNumber) {
      setError("Please fill out all required fields.");
      return;
    }

    try {
      const updateData = {
        name,
        email,
        address,
        phoneNumber,
        countryCode,
      };
      if (newPassword) {
        updateData.password = newPassword;
      }
      await axios.put(
        `http://localhost:8080/api/admin/account/${accountNumber}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminAuthToken")}`,
          },
        }
      );
      setIsEditMode(false);
      setSuccessMessage("Profile updated successfully.");
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    } catch (err) {
      setError("Failed to save profile data.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Form style={{ height: "500px" }} onSubmit={handleSaveClick}>
      {successMessage && (
        <p style={{ color: "green", marginBottom: "10px" }}>{successMessage}</p>
      )}

      <label
        htmlFor="accountNumber"
        style={{ display: "block", marginBottom: "5px" }}
      >
        Account Number
      </label>
      <TextInput
        disabled
        type="text"
        placeholder="Account Number"
        icon="attribution"
        value={accountNumber}
      />

      <label
        htmlFor="balance"
        style={{ display: "block", marginBottom: "5px" }}
      >
        Account Balance
      </label>
      <TextInput
        disabled
        type="text"
        placeholder="Account Balance"
        icon="currency_pound"
        value={`$${balance}`}
      />

      <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>
        Name
      </label>
      <TextInput
        disabled
        type="text"
        placeholder="Name"
        icon="person"
        value={name}
      />

      <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>
        Email
      </label>
      <TextInput
        disabled={!isEditMode}
        type="email"
        placeholder="Email"
        icon="alternate_email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required={isEditMode}
      />

      <label
        htmlFor="address"
        style={{ display: "block", marginBottom: "5px" }}
      >
        Address
      </label>
      <TextInput
        disabled={!isEditMode}
        type="text"
        placeholder="Address"
        icon="home"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required={isEditMode}
      />

      <label
        htmlFor="country"
        style={{ display: "block", marginBottom: "5px" }}
      >
        Country
      </label>
      <TextInput type="text" icon="flag" value={countryCode} disabled />

      <label
        htmlFor="phoneNumber"
        style={{ display: "block", marginBottom: "5px" }}
      >
        Phone Number
      </label>
      <TextInput
        type="text"
        icon="smartphone"
        value={phoneNumber}
        disabled={!isEditMode}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required={isEditMode}
      />

      {isEditMode && (
        <>
          <label
            htmlFor="newPassword"
            style={{ display: "block", marginBottom: "5px" }}
          >
            New Password
          </label>
          <TextInput
            type="password"
            icon="lock"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}

          />
        </>
      )}

      {isEditMode ? (
        <>
          <Button disabled={loading} type="submit">
            <span>Save Profile</span>
          </Button>
          <Button
            disabled={loading}
            onClick={handleEditClick}
            type="button"
          >
            <span>Cancel</span>
          </Button>
        </>
      ) : (
        <Button disabled={loading} onClick={handleEditClick} type="button">
          <span>Edit Profile</span>
        </Button>
      )}
    </Form>
  );
}
