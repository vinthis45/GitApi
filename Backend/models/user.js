const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  avatar_url: String,
  profile_url: String,
  followers_url: String,
  following_url: String,
  name: String,
  company: String,
  blog: String,
  location: String,
  email: String,
  hireable: Boolean,
  bio: String,
  twitter_username: String,
  repos_url: String,
  public_repos: Number,
  public_gists: Number,
  followers: Number,
  following: Number,
  created_at: Date,
  updated_at: Date,
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  isDeleted: {
    type: Boolean,
    default: false,
  }
});

userSchema.pre('find', function() {
  this.where({ isDeleted: { $ne: true } });
});

userSchema.pre('findOne', function() {
  this.where({ isDeleted: { $ne: true } });
});

const User = mongoose.model('User', userSchema);

module.exports = {User};
