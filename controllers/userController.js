import User from "../models/UserModel.js";

const getUserById = async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

export { getUserById };
