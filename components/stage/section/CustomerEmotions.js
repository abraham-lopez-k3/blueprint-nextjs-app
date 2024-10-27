// components/section/CustomerEmotions.js
import React, { forwardRef } from "react"; // Import React and forwardRef for handling refs
import emoji from "emoji-dictionary"; // Import emoji dictionary for emoji conversion

// Function to convert emotion words to emojis
const getEmoji = (emotion) => {
  switch (emotion.toLowerCase()) {
    case "happy":
      return emoji.getUnicode("smile"); // Return smiling emoji for "happy" 😊
    case "neutral":
      return emoji.getUnicode("neutral_face"); // Return neutral face emoji for "neutral" 😐
    case "frustrated":
      return emoji.getUnicode("confounded"); // Return confounded emoji for "frustrated" 😖
    case "confused":
      return emoji.getUnicode("thinking"); // Return thinking emoji for "confused" 🤔
    case "angry":
      return emoji.getUnicode("angry"); // Return angry emoji for "angry" 😠
    case "sad":
      return emoji.getUnicode("cry"); // Return crying emoji for "sad" 😢
    case "disappointed":
      return emoji.getUnicode("disappointed"); // Return disappointed emoji for "disappointed" 😞
    default:
      return emoji.getUnicode("question"); // Return question emoji for unknown emotions ❓
  }
};

// Create CustomerEmotions component using forwardRef to allow parent components to access its ref
const CustomerEmotions = forwardRef(({ data, minHeight }, ref) => {
  const emotionEmoji = getEmoji(data); // Get the emoji for the given emotion

  // Debugging line to see what's being passed as data
  // console.log("Customer Emotion Data:", data);

  return (
    <div
      ref={ref} // Attach ref for parent access
      className="mb-4 p-4 border-2 border-orange-300 bg-orange-50 rounded-lg shadow-sm flex items-center justify-center" // Styling for the container
      style={{ minHeight }} // Set minimum height from props
    >
      <span className="text-4xl">{emotionEmoji || "❓"}</span>{" "}
      {/* Display the emoji or a question mark if none found */}
    </div>
  );
});

export default CustomerEmotions; // Export the CustomerEmotions component
