import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      requ1ired: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 500,
    },
    media: {
      type: String, // image/video URL
    },
    mediaType: {
      type: String, // "image" or "video"
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);