// components/section/CustomerEmotions.js
import React, { forwardRef } from "react";
import emoji from "emoji-dictionary";

// Function to convert emotion words to emojis
const getEmoji = (emotion) => {
  switch (emotion.toLowerCase()) {
    case "happy":
      return emoji.getUnicode("smile"); // 😊
    case "neutral":
      return emoji.getUnicode("neutral_face"); // 😐
    case "frustrated":
      return emoji.getUnicode("confounded"); // 😖
    case "confused":
      return emoji.getUnicode("thinking"); // 🤔
    case "angry":
      return emoji.getUnicode("angry"); // 😠
    case "sad":
      return emoji.getUnicode("cry"); // 😢
    case "disappointed":
      return emoji.getUnicode("disappointed"); // 😞
    default:
      return emoji.getUnicode("question"); // Return an unknown ❓
  }
};

const CustomerEmotions = forwardRef(({ data, minHeight }, ref) => {
  const emotionEmoji = getEmoji(data); // Get the emoji for the given emotion

  // Debugging line to see what's being passed as data
  // console.log("Customer Emotion Data:", data);

  return (
    <div
      ref={ref}
      className="mb-4 p-4 border-2 border-orange-300 bg-orange-50 rounded-lg shadow-sm flex items-center justify-center"
      style={{ minHeight }}
    >
      <span className="text-4xl">{emotionEmoji || "❓"}</span>
    </div>
  );
});

export default CustomerEmotions;
