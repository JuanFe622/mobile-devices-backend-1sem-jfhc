const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const avatar = req.file ? req.file.filename : null;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
        avatar,
      },
    });
    console.log(user);

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving users",
      error: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving user",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { name, email, password, role } = req.body;
  console.log(req.body);
  try {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name,
        email,
        password,
        role,
      },
    });
    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting user",
      error: error.message,
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
