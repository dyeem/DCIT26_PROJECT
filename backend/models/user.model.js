import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    postalcode: {
        type: String,
        required: false,
    },
    province: {
        type: String,
        required: false,
    },
    avatar: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: ["User", "Admin"], // Define allowed roles
        default: "User", // Default to regular user
    },
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
