import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["like", "comment", "subscribe"],
      required: true,
    },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderName: {
      type: String,
    },
    videoTitle: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Динамическое сообщение через virtual
notificationSchema.virtual("message").get(function () {
  const senderInfo = this.senderName || "неизвестным пользователем";
  const videoInfo = this.videoTitle || "неизвестным видео";

  switch (this.type) {
    case "like":
      return `Ваше видео "${videoInfo}" понравилось ${senderInfo}.`;
    case "comment":
      return `${senderInfo} оставил комментарий к вашему видео "${videoInfo}".`;
    case "subscribe":
      return `${senderInfo} подписался на вас.`;
    default:
      return `У вас новое уведомление от ${senderInfo}.`;
  }
});

// Включение virtual в JSON и объектные представления
notificationSchema.set("toJSON", { virtuals: true });
notificationSchema.set("toObject", { virtuals: true });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
