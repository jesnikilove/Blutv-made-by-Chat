import { useState } from "react";
import { login } from "./services/xtream";
import { addProvider } from "./store/providerStore";

export default function XtreamProviderForm() {
  const [server,setServer] = useState("");
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  async function testAndSave() {
    try {
      setLoading(true);

      await login(server,username,password);

      addProvider({
        id: Date.now().toString(),
        name: username,
        type: "xtream",
        server,
        username,
        password,
        active: true
      });

      alert("Provider Saved");
    } catch {
      alert("Login Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <input
        placeholder="Server URL"
        value={server}
        onChange={e=>setServer(e.target.value)}
      />

      <input
        placeholder="Username"
        value={username}
        onChange={e=>setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e=>setPassword(e.target.value)}
      />

      <button
        onClick={testAndSave}
        disabled={loading}
      >
        {loading ? "Connecting..." : "Save Xtream"}
      </button>
    </div>
  );
}
