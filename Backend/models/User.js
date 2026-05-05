// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String
// });

// module.exports = mongoose.model("User", userSchema);








const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    // ROLE-BASED ACCESS
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    //  BLOCK / UNBLOCK USER
    isActive: {
      type: Boolean,
      default: true,
    },

    //  TRACK LOGIN
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

module.exports = mongoose.model("User", userSchema);
