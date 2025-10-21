import React, { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

// Ikon dari lucide-react
import { LayoutDashboard, Users, Clock, FileText, Settings, HelpCircle, LogOut, Zap, Edit, Trash2, Package, KeyRound, UserCircle, Upload } from "lucide-react";

// Daftarkan komponen Chart.js yang diperlukan
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// URL API Backend
const API_URL = "http://localhost:3001/api";

// ===================================
// KOMPONEN LOGIN
// ===================================
const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isRegistering) {
      if (password !== confirmPassword) {
        setError("Password dan konfirmasi password tidak cocok.");
        return;
      }
      if (!fullName || !whatsapp) {
        setError("Nama lengkap dan No. Whatsapp harus diisi.");
        return;
      }
    }

    const endpoint = isRegistering ? "/register" : "/login";
    const url = `http://localhost:3001${endpoint}`;

    const body = isRegistering ? { fullName, email, whatsapp, password } : { email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Terjadi kesalahan");

      if (isRegistering) {
        alert("Registrasi berhasil! Silakan login dengan akun Anda.");
        setIsRegistering(false);
      } else if (data.user) {
        onLoginSuccess(data.user);
      }
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Zap className="w-8 h-8 mr-2 text-purple-600" />
            <h1 className="text-3xl font-extrabold text-gray-900">Aksara Laserwork</h1>
          </div>
          <h2 className="text-xl text-gray-600">{isRegistering ? "Buat Akun Baru" : "Selamat Datang Kembali"}</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <>
              <div>
                <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                  Nama Lengkap
                </label>
                <input id="fullName" name="fullName" type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md" placeholder="Nama Anda" />
              </div>
              <div>
                <label htmlFor="whatsapp" className="text-sm font-medium text-gray-700">
                  No. Whatsapp
                </label>
                <input id="whatsapp" name="whatsapp" type="tel" required value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md" placeholder="08xxxxxxxxxx" />
              </div>
            </>
          )}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Alamat Email
            </label>
            <input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md" placeholder="anda@email.com" />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md" placeholder="••••••••" />
          </div>
          {isRegistering && (
            <div>
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Ulangi Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
                placeholder="••••••••"
              />
            </div>
          )}
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <div>
            <button type="submit" className="w-full px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700">
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

// ===================================
// KOMPONEN-KOMPONEN KECIL
// ===================================
const SidebarLink = ({ icon: Icon, title, isActive, onClick }) => {
  const baseClasses = "flex items-center space-x-3 p-3 text-sm font-medium rounded-xl transition duration-200 cursor-pointer";
  const activeClasses = isActive ? "bg-purple-600 text-white shadow-lg" : "text-gray-600 hover:bg-gray-100";
  return (
    <div onClick={onClick} className={`${baseClasses} ${activeClasses}`}>
      <Icon className="w-5 h-5" />
      <span>{title}</span>
    </div>
  );
};
const NotificationPopup = ({ message, isError = false }) => {
  if (!message) return null;
  const bgColor = isError ? "bg-red-500" : "bg-green-500";
  return <div className={`fixed top-5 right-5 ${bgColor} text-white py-2 px-4 rounded-lg shadow-lg z-50 animate-fade-in-down`}>{message}</div>;
};
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm m-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
        <div className="text-gray-600 mb-6">{children}</div>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
            Batal
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
  </div>
);
const getStatusClass = (status) => {
  const statusMap = {
    Dibuat: "bg-gray-200 text-gray-800",
    Diproses: "bg-blue-200 text-blue-800",
    Selesai: "bg-green-200 text-green-800",
  };
  return statusMap[status] || "bg-gray-200 text-gray-800";
};

// ===================================
// KONTEN HALAMAN
// ===================================
const HomePage = ({ navigateTo }) => {
  const menuItems = [
    { title: "Manajemen Produk", page: "Product", icon: Package, description: "Kelola daftar produk, harga, dan stok." },
    { title: "Manajemen Proyek", page: "Project", icon: FileText, description: "Lacak semua proyek yang sedang berjalan." },
    { title: "Manajemen Tim", page: "Team", icon: Users, description: "Kelola anggota tim dan posisi mereka." },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Selamat Datang di Aksara Laserwork</h1>
      <p className="text-gray-600">Pilih menu di bawah ini untuk memulai atau gunakan navigasi di samping.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {menuItems.map((item) => (
          <div key={item.page} onClick={() => navigateTo(item.page)} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform cursor-pointer border-l-4 border-purple-500">
            <div className="flex items-center space-x-4">
              <item.icon className="w-8 h-8 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
            </div>
            <p className="mt-2 text-gray-500 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const DashboardContent = ({ products, projects }) => {
  // Statistik
  const totalStock = products.reduce((sum, product) => sum + product.qty, 0);
  const totalSold = projects.reduce((sum, project) => sum + project.qty, 0);
  const totalRevenue = projects.reduce((sum, project) => {
    const product = products.find((p) => p.id === project.productId);
    return product ? sum + project.qty * product.price : sum;
  }, 0);

  // Data untuk Bar Chart Stok
  const barChartData = {
    labels: products.map((p) => p.name),
    datasets: [{ label: "Stok Saat Ini", data: products.map((p) => p.qty), backgroundColor: "rgba(139, 92, 246, 0.6)", borderColor: "rgba(139, 92, 246, 1)", borderWidth: 1 }],
  };
  const barChartOptions = { responsive: true, plugins: { legend: { display: false }, title: { display: true, text: "Grafik Stok Produk" } } };

  // Data untuk Pie Chart Progres Proyek
  const statusCounts = projects.reduce((acc, project) => {
    const status = project.status || "Dibuat";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = {
    labels: ["Dibuat", "Diproses", "Selesai"],
    datasets: [
      {
        data: [statusCounts["Dibuat"] || 0, statusCounts["Diproses"] || 0, statusCounts["Selesai"] || 0],
        backgroundColor: ["rgba(107, 114, 128, 0.6)", "rgba(59, 130, 246, 0.6)", "rgba(16, 185, 129, 0.6)"],
        borderColor: ["rgba(107, 114, 128, 1)", "rgba(59, 130, 246, 1)", "rgba(16, 185, 129, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const pieChartOptions = { responsive: true, plugins: { legend: { position: "top" }, title: { display: true, text: "Progres Proyek" } } };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard Utama</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500 font-medium">Total Stok Tersedia</h3>
          <p className="text-3xl font-bold text-gray-800">{totalStock.toLocaleString("id-ID")}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500 font-medium">Total Item Terjual</h3>
          <p className="text-3xl font-bold text-gray-800">{totalSold.toLocaleString("id-ID")}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500 font-medium">Total Penghasilan</h3>
          <p className="text-3xl font-bold text-gray-800">Rp {totalRevenue.toLocaleString("id-ID")}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <div className="h-80">
            <Bar options={barChartOptions} data={barChartData} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex justify-center items-center">
          <div className="h-80 w-full">
            <Pie options={pieChartOptions} data={pieChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Halaman Produk
const ProductPage = ({ products, fetchData, showNotification }) => {
  const [formData, setFormData] = useState({ name: "", price: "", qty: "" });
  const [isEditing, setIsEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing ? `${API_URL}/products/${isEditing}` : `${API_URL}/products`;
    const method = isEditing ? "PUT" : "POST";
    try {
      await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...formData, price: parseFloat(formData.price), qty: parseInt(formData.qty) }) });
      showNotification(`Produk berhasil ${isEditing ? "diperbarui" : "ditambahkan"}!`);
      fetchData();
    } catch (error) {
      showNotification(error.message, true);
    }
    setIsEditing(null);
    setFormData({ name: "", price: "", qty: "" });
  };

  const handleEdit = (product) => {
    setIsEditing(product.id);
    setFormData(product);
  };

  const handleDeleteClick = (id) => {
    setProductToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        await fetch(`${API_URL}/products/${productToDelete}`, { method: "DELETE" });
        showNotification("Produk berhasil dihapus!");
        fetchData();
      } catch (error) {
        showNotification(error.message, true);
      }
    }
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  return (
    <div className="space-y-6">
      <ConfirmModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={confirmDelete} title="Konfirmasi Hapus Produk" children="Apakah Anda yakin ingin menghapus produk ini?" />
      <h1 className="text-3xl font-bold text-gray-800">Manajemen Produk</h1>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit Produk" : "Tambah Produk Baru"}</h2>
        <form onSubmit={handleFormSubmit} className="grid md:grid-cols-4 gap-4 items-center">
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Nama Produk" className="md:col-span-2 w-full p-2 border rounded" required />
          <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Harga" className="w-full p-2 border rounded" required />
          <input type="number" name="qty" value={formData.qty} onChange={handleInputChange} placeholder="Stok" className="w-full p-2 border rounded" required />
          <button type="submit" className="w-full p-2 text-white bg-purple-600 rounded hover:bg-purple-700">
            {isEditing ? "Update" : "Tambah"}
          </button>
        </form>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Daftar Produk</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3">ID</th>
              <th className="p-3">Nama</th>
              <th className="p-3">Harga</th>
              <th className="p-3">Stok</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{p.id}</td>
                <td className="p-3">{p.name}</td>
                <td className="p-3">Rp {p.price.toLocaleString("id-ID")}</td>
                <td className="p-3">{p.qty}</td>
                <td className="p-3 flex justify-center space-x-2">
                  <button onClick={() => handleEdit(p)} className="p-1 text-blue-500 hover:text-blue-700">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDeleteClick(p.id)} className="p-1 text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Halaman Proyek
const ProjectPage = ({ projects, products, fetchData, showNotification }) => {
  const [formData, setFormData] = useState({ customer: "", productId: "", qty: "", pic: "", status: "Dibuat" });
  const [isEditing, setIsEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { customer, productId, qty, pic, status } = formData;
    if (!customer || !productId || !qty || !pic) return;

    const product = products.find((p) => p.id === parseInt(productId));
    const orderQty = parseInt(qty);

    if (!product) {
      showNotification("Produk tidak valid.", true);
      return;
    }

    if (!isEditing) {
      if (product.qty < orderQty) {
        showNotification(`Stok tidak mencukupi (sisa ${product.qty}).`, true);
        return;
      }
      await fetch(`${API_URL}/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qty: product.qty - orderQty }),
      });
    }

    const projectData = { customer, item: product.name, qty: orderQty, pic, productId: parseInt(productId), status };
    const url = isEditing ? `${API_URL}/projects/${isEditing}` : `${API_URL}/projects`;
    const method = isEditing ? "PUT" : "POST";

    try {
      await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(projectData) });
      showNotification(`Proyek berhasil ${isEditing ? "diperbarui" : "ditambahkan"}!`);
      fetchData();
    } catch (error) {
      showNotification(error.message, true);
    }

    setIsEditing(null);
    setFormData({ customer: "", productId: "", qty: "", pic: "", status: "Dibuat" });
  };

  const handleEdit = (project) => {
    setIsEditing(project.id);
    setFormData({ customer: project.customer, productId: project.productId, qty: project.qty, pic: project.pic, status: project.status || "Dibuat" });
  };

  const handleDeleteClick = (id) => {
    setProjectToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (projectToDelete) {
      const project = projects.find((p) => p.id === projectToDelete);
      if (project) {
        const product = products.find((p) => p.id === project.productId);
        if (product && project.status !== "Selesai") {
          await fetch(`${API_URL}/products/${product.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ qty: product.qty + project.qty }),
          });
        }
      }
      await fetch(`${API_URL}/projects/${projectToDelete}`, { method: "DELETE" });
      showNotification("Proyek dihapus!");
      fetchData();
    }
    setIsModalOpen(false);
    setProjectToDelete(null);
  };

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error("Gagal memperbarui status.");
      showNotification("Status proyek berhasil diperbarui!");
      fetchData();
    } catch (error) {
      showNotification(error.message, true);
    }
  };

  return (
    <div className="space-y-6">
      <ConfirmModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={confirmDelete} title="Konfirmasi Hapus Proyek" children="Apakah Anda yakin? Stok produk akan dikembalikan jika proyek belum selesai." />
      <h1 className="text-3xl font-bold text-gray-800">Manajemen Proyek</h1>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit Proyek" : "Tambah Proyek"}</h2>
        <form onSubmit={handleFormSubmit} className="grid md:grid-cols-6 gap-4 items-center">
          <input name="customer" value={formData.customer} onChange={handleInputChange} placeholder="Nama Pemesan" className="p-2 border rounded" />
          <select name="productId" value={formData.productId} onChange={handleInputChange} className="md:col-span-2 p-2 border rounded bg-white">
            <option value="">-- Pilih Produk --</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (Stok: {p.qty})
              </option>
            ))}
          </select>
          <input name="qty" type="number" value={formData.qty} onChange={handleInputChange} placeholder="Qty" className="p-2 border rounded" />
          <input name="pic" value={formData.pic} onChange={handleInputChange} placeholder="Petugas" className="p-2 border rounded" />
          <select name="status" value={formData.status} onChange={handleInputChange} className="p-2 border rounded bg-white">
            <option value="Dibuat">Dibuat</option>
            <option value="Diproses">Diproses</option>
            <option value="Selesai">Selesai</option>
          </select>
          <button type="submit" className="md:col-span-6 w-full p-2 text-white bg-purple-600 rounded hover:bg-purple-700">
            {isEditing ? "Update Proyek" : "Tambah Proyek"}
          </button>
        </form>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Daftar Proyek</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3">ID</th>
              <th className="p-3">Pemesan</th>
              <th className="p-3">Barang</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Petugas</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{p.id}</td>
                <td className="p-3">{p.customer}</td>
                <td className="p-3">{p.item}</td>
                <td className="p-3">{p.qty}</td>
                <td className="p-3">{p.pic}</td>
                <td className="p-3">
                  <select value={p.status || "Dibuat"} onChange={(e) => handleStatusChange(p.id, e.target.value)} className={`p-1 border-0 rounded text-xs appearance-none ${getStatusClass(p.status || "Dibuat")}`}>
                    <option value="Dibuat">Dibuat</option>
                    <option value="Diproses">Diproses</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </td>
                <td className="p-3 flex justify-center space-x-2">
                  <button onClick={() => handleEdit(p)} className="p-1 text-blue-500">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDeleteClick(p.id)} className="p-1 text-red-500">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Halaman Tim
const TeamPage = ({ teamMembers, fetchData, showNotification }) => {
  const [formData, setFormData] = useState({ id: "", name: "", address: "", position: "" });
  const [isEditing, setIsEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isEditing && formData.id !== isEditing) {
      showNotification("ID tidak dapat diubah saat mengedit.", true);
      return;
    }

    const url = isEditing ? `${API_URL}/teamMembers/${isEditing}` : `${API_URL}/teamMembers`;
    const method = isEditing ? "PUT" : "POST";

    try {
      await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      showNotification(`Anggota tim berhasil ${isEditing ? "diperbarui" : "ditambahkan"}!`);
      fetchData();
    } catch (error) {
      showNotification(error.message, true);
    }
    setIsEditing(null);
    setFormData({ id: "", name: "", address: "", position: "" });
  };

  const handleEdit = (member) => {
    setIsEditing(member.id);
    setFormData(member);
  };

  const handleDeleteClick = (id) => {
    setMemberToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (memberToDelete) {
      try {
        await fetch(`${API_URL}/teamMembers/${memberToDelete}`, { method: "DELETE" });
        showNotification("Anggota tim berhasil dihapus!");
        fetchData();
      } catch (error) {
        showNotification("Gagal menghapus data.", true);
      }
    }
    setIsModalOpen(false);
    setMemberToDelete(null);
  };

  return (
    <div className="space-y-6">
      <ConfirmModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={confirmDelete} title="Konfirmasi Hapus Anggota" children="Apakah Anda yakin ingin menghapus anggota tim ini?" />
      <h1 className="text-3xl font-bold text-gray-800">Manajemen Tim</h1>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit Anggota" : "Tambah Anggota"}</h2>
        <form onSubmit={handleFormSubmit} className="grid md:grid-cols-5 gap-4 items-center">
          <input name="id" value={formData.id} onChange={handleInputChange} placeholder="No. ID" className="p-2 border rounded" disabled={isEditing} />
          <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Nama" className="p-2 border rounded" />
          <input name="address" value={formData.address} onChange={handleInputChange} placeholder="Alamat" className="p-2 border rounded" />
          <input name="position" value={formData.position} onChange={handleInputChange} placeholder="Posisi" className="p-2 border rounded" />
          <button type="submit" className="w-full p-2 text-white bg-purple-600 rounded hover:bg-purple-700">
            {isEditing ? "Update" : "Tambah"}
          </button>
        </form>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Daftar Anggota Tim</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3">ID</th>
              <th className="p-3">Nama</th>
              <th className="p-3">Alamat</th>
              <th className="p-3">Posisi</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((m) => (
              <tr key={m.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{m.id}</td>
                <td className="p-3">{m.name}</td>
                <td className="p-3">{m.address}</td>
                <td className="p-3">{m.position}</td>
                <td className="p-3 flex justify-center space-x-2">
                  <button onClick={() => handleEdit(m)} className="p-1 text-blue-500">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDeleteClick(m.id)} className="p-1 text-red-500">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Halaman Setting
const SettingPage = ({ user, showNotification, profilePic, setProfilePic }) => {
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePic(event.target.result);
        showNotification("Foto profil berhasil diperbarui!");
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      showNotification("Password baru tidak cocok dengan konfirmasi.", true);
      return;
    }
    if (passwords.newPassword.length < 6) {
      showNotification("Password baru minimal harus 6 karakter.", true);
      return;
    }
    showNotification("Password berhasil diubah!");
    setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Pengaturan Akun</h1>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <UserCircle className="w-6 h-6 mr-2" /> Informasi Profil
        </h2>
        <div className="flex items-center space-x-6">
          <div className="relative">
            {profilePic ? (
              <img src={profilePic} alt="Profil" className="w-24 h-24 rounded-full object-cover" />
            ) : (
              <div className="w-24 h-24 bg-purple-200 rounded-full flex items-center justify-center text-purple-600 text-3xl font-bold">{user.fullName ? user.fullName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}</div>
            )}
            <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-purple-600 p-1.5 rounded-full cursor-pointer hover:bg-purple-700">
              <Upload className="w-4 h-4 text-white" />
            </label>
            <input id="photo-upload" type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
          </div>
          <div className="space-y-2">
            <div>
              <label className="text-sm font-medium text-gray-500">Nama Lengkap</label>
              <p className="text-gray-800 text-lg font-semibold">{user.fullName || "Nama tidak tersedia"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Alamat Email</label>
              <p className="text-gray-800">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <KeyRound className="w-6 h-6 mr-2" /> Ubah Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
          <div>
            <label className="text-sm font-medium text-gray-700">Password Lama</label>
            <input type="password" name="oldPassword" value={passwords.oldPassword} onChange={handleInputChange} className="w-full p-2 border rounded mt-1" required />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Password Baru</label>
            <input type="password" name="newPassword" value={passwords.newPassword} onChange={handleInputChange} className="w-full p-2 border rounded mt-1" required />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Konfirmasi Password Baru</label>
            <input type="password" name="confirmPassword" value={passwords.confirmPassword} onChange={handleInputChange} className="w-full p-2 border rounded mt-1" required />
          </div>
          <button type="submit" className="w-full p-2 text-white bg-purple-600 rounded hover:bg-purple-700">
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
};

// ===================================
// KOMPONEN UTAMA DASHBOARD
// ===================================
const Dashboard = ({ user, onLogout }) => {
  const [activePage, setActivePage] = useState("Dashboard");
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: "", isError: false });
  const [profilePic, setProfilePic] = useState(null);

  const showNotification = (message, isError = false) => {
    setNotification({ message, isError });
    setTimeout(() => setNotification({ message: "", isError: false }), 3000);
  };

  const fetchData = async () => {
    try {
      const [productsRes, projectsRes, teamRes] = await Promise.all([fetch(`${API_URL}/products`), fetch(`${API_URL}/projects`), fetch(`${API_URL}/teamMembers`)]);
      setProducts(await productsRes.json());
      setProjects(await projectsRes.json());
      setTeamMembers(await teamRes.json());
    } catch (error) {
      showNotification("Gagal mengambil data dari server.", true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const renderContent = () => {
    if (loading) return <LoadingSpinner />;

    switch (activePage) {
      case "Home":
        return <HomePage navigateTo={setActivePage} />;
      case "Product":
        return <ProductPage products={products} fetchData={fetchData} showNotification={showNotification} />;
      case "Project":
        return <ProjectPage projects={projects} products={products} fetchData={fetchData} showNotification={showNotification} />;
      case "Team":
        return <TeamPage teamMembers={teamMembers} fetchData={fetchData} showNotification={showNotification} />;
      case "Setting":
        return <SettingPage user={user} showNotification={showNotification} profilePic={profilePic} setProfilePic={setProfilePic} />;
      default:
        return <DashboardContent products={products} projects={projects} />;
    }
  };

  const getInitials = (name) => {
    if (!name) return user.email ? user.email.charAt(0).toUpperCase() : "A";
    const names = name.split(" ");
    if (names.length > 1) {
      return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <NotificationPopup message={notification.message} isError={notification.isError} />
      <div className="w-64 p-4 border-r bg-white shadow-xl min-h-screen sticky top-0 flex flex-col">
        <div className="text-2xl font-extrabold text-purple-600 mb-8 flex items-center">
          <Zap className="w-6 h-6 mr-2" /> Aksara Laserwork
        </div>
        <div className="space-y-1 mb-8 flex-grow">
          <SidebarLink icon={LayoutDashboard} title="Dashboard" isActive={activePage === "Dashboard"} onClick={() => setActivePage("Dashboard")} />
          <SidebarLink icon={Clock} title="Home" isActive={activePage === "Home"} onClick={() => setActivePage("Home")} />
          <SidebarLink icon={Package} title="Produk" isActive={activePage === "Product"} onClick={() => setActivePage("Product")} />
          <SidebarLink icon={FileText} title="Project" isActive={activePage === "Project"} onClick={() => setActivePage("Project")} />
          <SidebarLink icon={Users} title="Team" isActive={activePage === "Team"} onClick={() => setActivePage("Team")} />
        </div>
        <div className="text-xs text-gray-500 font-bold uppercase mb-4">GENERAL</div>
        <div className="space-y-1">
          <SidebarLink icon={Settings} title="Setting" isActive={activePage === "Setting"} onClick={() => setActivePage("Setting")} />
          <div onClick={onLogout}>
            <SidebarLink icon={LogOut} title="Logout" isActive={false} />
          </div>
        </div>
      </div>
      <div className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-md">
          <div />
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="font-semibold text-gray-800">{user.fullName || "Nama Pengguna"}</div>
              <div className="text-sm text-gray-500">{user.email}</div>
            </div>
            {profilePic ? (
              <img src={profilePic} alt="Profil" className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center text-purple-600 font-bold">{getInitials(user.fullName)}</div>
            )}
          </div>
        </header>
        {renderContent()}
      </div>
    </div>
  );
};

// ===================================
// KOMPONEN INDUK APP
// ===================================
function App() {
  const [user, setUser] = useState(null);
  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };
  const handleLogout = () => {
    setUser(null);
  };
  return <>{user ? <Dashboard user={user} onLogout={handleLogout} /> : <Login onLoginSuccess={handleLoginSuccess} />}</>;
}

export default App;
