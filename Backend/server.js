const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= CONSTANTS ================= */
const JWT_SECRET = "SUPER_SECRET_KEY";

/* ================= MONGODB ================= */
mongoose
  .connect("mongodb://127.0.0.1:27017/BookBinge")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

/* ================= USER SCHEMA ================= */
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    // 🔑 IMPORTANT FIX
    isRegistered: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

/* ================= AUTH MIDDLEWARE ================= */
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};

/* ================= REGISTER ================= */
app.post("/register", async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      isRegistered: true,   // ✅ FIX
      isActive: true,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Register Error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

/* ================= LOGIN ================= */
app.post("/login", async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ❌ USER NOT REGISTERED (CORE FIX)
    if (user.role === "user" && user.isRegistered !== true) {
      return res.status(403).json({ message: "Please register first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Account blocked" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

/* ================= ADMIN: GET USERS ================= */
app.get("/admin/users", protect, isAdmin, async (req, res) => {
  const users = await User.find({}, "-password");
  res.json(users);
});

/* ================= CREATE ADMIN (ONE TIME) ================= */
app.post("/create-admin", async (req, res) => {
  const admin = await User.findOne({ role: "admin" });
  if (admin) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await User.create({
    name: "Admin",
    email: "admin@gmail.com",
    password: hashedPassword,
    role: "admin",
    isRegistered: false, // ✅ IMPORTANT
    isActive: true,
  });

  res.json({ message: "Admin created successfully" });
});

/* ================= SERVER ================= */
app.listen(8080, () => {
  console.log("🚀 Server running on port 8080");
});
