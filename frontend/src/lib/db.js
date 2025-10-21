import { sql } from "@vercel/postgres";

// --- PRODUCTS ---
export async function getProducts() {
  try {
    // Mengambil semua data dari tabel products
    const { rows } = await sql`SELECT * FROM products;`;
    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products data.");
  }
}

// --- PROJECTS ---
export async function getProjects() {
  try {
    // Mengambil semua data dari tabel projects
    const { rows } = await sql`SELECT * FROM projects;`;
    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch projects data.");
  }
}

// --- TEAM MEMBERS ---
export async function getTeamMembers() {
  try {
    // Mengambil semua data dari tabel "teamMembers"
    // Gunakan tanda kutip ganda jika nama tabel mengandung huruf besar
    const { rows } = await sql`SELECT * FROM "teamMembers";`;
    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch team members data.");
  }
}

// --- USERS ---
export async function getUsers() {
  try {
    // Mengambil semua data dari tabel users
    const { rows } = await sql`SELECT * FROM users;`;
    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users data.");
  }
}
