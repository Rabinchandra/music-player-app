const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { connectDb } = require("./config/dbConfig");
const songRoutes = require("./routes/songRoutes");

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDb();

// Middlewares
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use(songRoutes);

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
