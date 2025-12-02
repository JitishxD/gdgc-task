import userModel from "../models/Member.js";

// Register a new member
// POST /api/v1/registerMember
export const registerMember = async (req, res) => {
  try {
    const { id, name, role, skills, location, bio, photo } = req.body;
    const newMember = new userModel({
      id,
      name,
      role,
      skills,
      location,
      bio,
      photo,
    });
    await newMember.save();
    res.status(201).json({ message: "Member registered successfully", member: newMember });
  } catch (error) {
    res.status(500).json({ message: "Error registering member", error: error.message });
  }
};

// Get all members
// GET /api/v1/getMembers
export const getMembers = async (req, res) => {
  try {
    const members = await userModel.find();
    res.status(200).json(members );
  } catch (error) {
    res.status(500).json({ message: "Error fetching members", error: error.message });
  }
};

// Get member by ID 
// GET /api/v1/getMember/:id
export const getMemberById = async (req, res) => {
  try {
    const memberId = req.params.id;
    const member = await userModel.findOne({ id: memberId });
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: "Error fetching member", error: error.message });
  }
};
