const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const PORT = 3001;

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Endpoint custom untuk registrasi (sekarang menyimpan ke db.json)
server.post("/register", (req, res) => {
  const { fullName, email, whatsapp, password } = req.body;
  const db = router.db; // Dapatkan instance database

  if (!fullName || !email || !whatsapp || !password) {
    return res.status(400).json({ message: "Semua kolom harus diisi" });
  }

  const userExists = db.get("users").find({ email: email }).value();
  if (userExists) {
    return res.status(400).json({ message: "Email sudah terdaftar" });
  }

  const lastUser = db.get("users").value().slice(-1)[0];
  const newId = lastUser ? lastUser.id + 1 : 1;

  const newUser = { id: newId, fullName, email, whatsapp, password };
  db.get("users").push(newUser).write(); // Tulis ke file db.json

  console.log("Pengguna terdaftar:", newUser);
  res.status(201).json({ message: "Registrasi berhasil" });
});

// Endpoint custom untuk login (sekarang membaca dari db.json)
server.post("/login", (req, res) => {
  const { email, password } = req.body;
  const db = router.db;

  if (!email || !password) {
    return res.status(401).json({ message: "Email atau password salah" });
  }

  const user = db.get("users").find({ email: email, password: password }).value();

  if (user) {
    res.status(200).json({ message: "Login berhasil", user: { email: user.email, fullName: user.fullName } });
  } else {
    res.status(401).json({ message: "Email atau password salah" });
  }
});

// Gunakan router dari JSON Server untuk rute API lainnya
server.use("/api", router);

server.listen(PORT, () => {
  console.log(`🚀 Server & API Berhasil Berjalan di http://localhost:${PORT}`);
});
