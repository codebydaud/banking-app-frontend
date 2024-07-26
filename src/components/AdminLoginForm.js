import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import Form from "./Form";
import TextInput from "./TextInput";

export default function AdminLoginForm() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await adminLogin(identifier, password);
    } catch (err) {
      setLoading(false);
      setError("Invalid credentials!");
    }
  }

  return (
    <Form style={{ height: "330px" }} onSubmit={handleSubmit}>
      <TextInput
        required
        type="email"
        placeholder="Enter email"
        icon="alternate_email"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />
      <TextInput
        type="password"
        placeholder="Enter password"
        icon="lock"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button disabled={loading} type="submit">
        <span>Login</span>
      </Button>
      {error && <p className="error">{error}</p>}
    </Form>
  );
}
