import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
    profileBanner: {
      type: String,
      default: "",
    },
    videos: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Video",
      default: [],
    },
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    following: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    about: {
      type: String,
      maxlength: 500,
    },
    likedVideos: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Video",
      default: [],
    },
    watchLater: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Video",
      default: [],
    },
    browsingHistory: {
      type: [
        {
          videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
          timestamp: { type: Date, default: Date.now },
        },
      ],
      default: [],
      validate: {
        validator: function (v) {
          return v.length <= 100; // Ограничение на 100 видео
        },
        message: "История просмотра не должна превышать 100 видео.",
      },
    },
    searchHistory: {
      type: [
        {
          query: { type: String, required: true },
        },
      ],
      default: [],
      validate: {
        validator: function (v) {
          return v.length <= 50; // Ограничение на 50 поисковых запросов
        },
        message: "История поиска не должна превышать 50 запросов.",
      },
    },
  },
  { timestamps: true }
);

// Методы для работы с историей просмотра
userSchema.methods.addToBrowsingHistory = async function (videoId) {
  this.browsingHistory.push({ videoId });

  if (this.browsingHistory.length > 100) {
    this.browsingHistory.shift();
  }
  await this.save();
};

userSchema.methods.removeFromBrowsingHistory = async function (videoId) {
  this.browsingHistory = this.browsingHistory.filter(
    (entry) => entry.videoId.toString() !== videoId.toString()
  );
  await this.save();
};

userSchema.methods.clearBrowsingHistory = async function () {
  this.browsingHistory = [];
  await this.save();
};

// Методы для работы с историей поиска
userSchema.methods.addToSearchHistory = async function (query) {
  this.searchHistory.unshift({ query });

  if (this.searchHistory.length > 50) {
    this.searchHistory.pop();
  }

  await this.save();
};

userSchema.methods.removeFromSearchHistory = async function (query) {
  this.searchHistory = this.searchHistory.filter(
    (entry) => entry.query !== query
  );
  await this.save();
};

userSchema.methods.clearSearchHistory = async function () {
  this.searchHistory = [];
  await this.save();
};

const User = mongoose.model("User", userSchema);

export default User;
