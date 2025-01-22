import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const HARD_CODED_TOKEN = "dev-token-12345"; // Hardcoded token for development

// Middleware to verify token and authenticate user
export const protect = async (req, res, next) => {
  let token;

  // Check if token is in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      if (process.env.NODE_ENV === "development" && token === HARD_CODED_TOKEN) {
        // In development, bypass JWT verification and use a hardcoded user
        req.user = {
          id: "devUserId123", // Replace with a mock user ID
          role: "Admin",       // Replace with the default role
          email: "devuser@example.com", // Mock email
        };
        return next();
      }

      // Decode token using the JWT secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach authenticated user to the request
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Middleware to verify admin role
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};
