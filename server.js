
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/leadcrm");

const LeadSchema = new mongoose.Schema({
  name: String,
  phone: String,
  status: { type: String, default: "New Lead" },
  property: String,
  visitDate: String,
  visitTime: String
});

const Lead = mongoose.model("Lead", LeadSchema);

app.get("/leads", async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
});

app.post("/leads", async (req, res) => {
  const lead = new Lead(req.body);
  await lead.save();
  res.json(lead);
});

app.put("/leads/:id", async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(lead);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
