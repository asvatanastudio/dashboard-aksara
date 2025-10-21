import React, { useState } from "react";
import { Zap } from "lucide-react";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password tidak boleh kosong.");
      return;
    }

    // Tentukan endpoint berdasarkan mode (login atau register)
    const endpoint = isRegistering ? "/api/register" : "/api/login";
    const url = `http://localhost:3001${endpoint}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Jika server mengembalikan error, tampilkan pesannya
        throw new Error(data.message || "Terjadi kesalahan");
      }

      // Jika login/register berhasil, panggil fungsi onLoginSuccess dari App.jsx
      // Untuk registrasi, kita langsung login-kan pengguna
      if (data.user) {
        onLoginSuccess(data.user);
      }
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Zap className="w-8 h-8 mr-2 text-purple-600" />
            <h1 className="text-3xl font-extrabold text-gray-900">Organix</h1>
          </div>
          <h2 className="text-xl text-gray-600">{isRegistering ? "Buat Akun Baru" : "Selamat Datang Kembali"}</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Alamat Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="anda@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <button type="submit" className="w-full px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              {isRegistering ? "Daftar" : "Masuk"}
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-600">
          {isRegistering ? "Sudah punya akun? " : "Belum punya akun? "}
          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError("");
            }}
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            {isRegistering ? "Masuk di sini" : "Daftar sekarang"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
