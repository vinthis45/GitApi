const axios = require("axios");
const { User } = require("../models/user");

exports.createUser = async (req, res) => {
  try {
    const { username } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const response = await axios.get(`https://api.github.com/users/${username}`);
    const userData = response.data;
    const newUser = await User.create({ ...userData, username: userData.login });

    res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to create user. Please try again later." });
  }
};



exports.findMutualFollowersForUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const followersResponse = await axios.get(
      `https://api.github.com/users/${username}/followers`
    );
    const followers = followersResponse.data.map((follower) => follower.login);

    const followingResponse = await axios.get(
      `https://api.github.com/users/${username}/following`
    );
    const following = followingResponse.data.map((follow) => follow.login);

    const mutualFollowers = followers.filter((follower) =>
      following.includes(follower)
    );

    user.friends = mutualFollowers;
    await user.save();

    res.json({ message: "Mutual followers saved as friends for the user" });
  } catch (error) {
    console.error("Error finding mutual followers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const queryParams = req.query;
    const query = {};

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        query[key] = { $regex: new RegExp(value, "i") }; // 'i' for case-insensitive
      }
    });

    const users = await User.find(query);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const deletedUser = await User.findOneAndUpdate(
      { username },
      { isDeleted: true },
      { new: true }
    );
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User soft-deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const newData = req.body;
    const updatedUser = await User.findOneAndUpdate({ username }, newData, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUsersSortedByField = async (req, res) => {
  try {
    const { field } = req.query;
    const users = await User.find().sort({ [field]: 1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(`https://api.github.com/users/${username}`);
    const userData = response.data;
    res.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUserRepositories = async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    const repositories = response.data;
    res.json(repositories);
  } catch (error) {
    console.error("Error fetching user repositories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};