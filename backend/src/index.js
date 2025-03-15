require("dotenv").config();
const express = require("express");
const cors = require("cors");
const uploadRoutes = require("./uploadRoutes");

const app = express();

app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON
app.use("/upload", uploadRoutes); // Handle PDF uploads

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
