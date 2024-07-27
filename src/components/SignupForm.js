import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import Button from "./Button";
import Checkbox from "./Checkbox";
import Form from "./Form";
import TextInput from "./TextInput";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agree, setAgree] = useState(false); // Changed to boolean
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [countryCode] = useState("PK");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  let successTimeout;
  useEffect(() => {
    return () => {
      // Cleanup the timeout when the component unmounts
      if (successTimeout) {
        clearTimeout(successTimeout);
      }
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    // Validation
    if (password !== confirmPassword) {
      return setError("Password mismatched!");
    }
    if (!agree) {
      return setError("You must agree to the Terms & Conditions.");
    }

    try {
      setError("");
      setSuccess("");
      setLoading(true);

      // Prepare data to be sent
      const signupDetails = {
        name,
        email,
        password,
        address,
        phoneNumber,
        countryCode,
      };

      // Send data to backend
      await axios.post(
        "http://localhost:8080/api/user/register",
        signupDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setLoading(false);
      setSuccess("Account created successfully");

      // Delay navigation to login page
      successTimeout = setTimeout(() => {
        setSuccess(""); // Clear success message
        navigate("/user/login"); // Navigate to login page
      }, 3000);

      setAgree(false);
    } catch (err) {
      setLoading(false);

      // Handle error responses
      if (err.response) {
        // Check if the response contains a plain text error message
        if (typeof err.response.data === "string") {
          setError(err.response.data);
        } else if (err.response.data && err.response.data.message) {
          // Check if the response contains a JSON object with a message field
          setError(err.response.data.message);
        } else {
          setError("Failed to create an account!");
        }
      } else {
        setError("Failed to create an account!");
      }
    }
  }

  return (
    <Form style={{ height: "500px" }} onSubmit={handleSubmit}>
      <TextInput
        required
        type="text"
        placeholder="Enter name"
        icon="person"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextInput
        required
        type="email"
        placeholder="Enter email"
        icon="alternate_email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        required
        type="password"
        placeholder="Enter password"
        icon="lock"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextInput
        required
        type="password"
        placeholder="Confirm password"
        icon="lock_clock"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <TextInput
        required
        type="text"
        placeholder="Enter address"
        icon="home"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <TextInput type="text" icon="flag" value={countryCode} disabled />
      <TextInput
        required
        type="text"
        placeholder="Enter phone number"
        icon="smartphone"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <Checkbox
        required
        type="checkbox"
        text=" I agree to the Terms &amp; Conditions"
        checked={agree} // Change value to checked
        onChange={(e) => setAgree(e.target.checked)} // Update to e.target.checked
      />
      <Button disabled={loading} type="submit">
        <span>Submit now</span>
      </Button>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>} {/* Add this line */}
      <div className="info">
        Already have an account? <Link to="/login">Login</Link> instead.
      </div>
    </Form>
  );
}
