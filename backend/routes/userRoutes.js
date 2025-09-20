const express = require("express");
const Contact = require("../models/Contact"); // your mongoose model
const router = express.Router();

// CREATE a new contact
router.post("/api/create-contact", async (req, res) => {
  try {
    const { name, gmail, phone } = req.body;

    // Validate input
    if (!name || !gmail || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if gmail or phone already exists
    const existingContact = await Contact.findOne({
      $or: [{ gmail }, { phone }],
    });

    if (existingContact) {
      return res
        .status(409)
        .json({ message: "A contact with this email or phone already exists" });
    }

    // Create and save the contact
    const contact = new Contact({ name, gmail, phone });
    await contact.save();

    res.status(201).json({
      message: "Contact created successfully",
      contact,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET all contacts
router.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET a single contact by ID
router.get("/api/contacts/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE a contact by ID
router.delete("/api/contacts/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json({ message: "Contact deleted successfully", contact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
