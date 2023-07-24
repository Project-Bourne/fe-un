import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "../custom-hooks";
import EmojiPicker, {
  EmojiStyle,
  //   SkinTones,
  //   Theme,
  //   Categories,
  EmojiClickData,
  //   Emoji,
  //   SuggestionMode,
  //   SkinTonePickerLocation
} from "emoji-picker-react";

export default function CustomEmoji({
  toggleEmoji,
  selectedEmoji,
  closeEmojiDisplay,
}) {
  // handle emoji click
  const handleClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    selectedEmoji(emojiData.emoji);
  };
  //  emoji container ref
  const emojiRef = useRef();
  // close emoji modal when anywhere outside it is clicked
  useOnClickOutside(emojiRef, closeEmojiDisplay);

  useEffect(() => {
    // Add event listener to close the modal when the escape key is pressed
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        closeEmojiDisplay();
      }
    };
    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [closeEmojiDisplay]);

  if (!toggleEmoji) {
    return null;
  }

  return (
    <div
      className="fixed z-50 top-[10rem] md:top-[21.5rem] md:right-7 right-3 shadow-md"
      ref={emojiRef}
    >
      {/* <h2>Emoji Picker React 4 Demo</h2>
      <div className="show-emoji">
        Your selected Emoji is:
        {selectedEmoji ? (
          <Emoji
            unified={selectedEmoji}
            emojiStyle={EmojiStyle.APPLE}
            size={22}
          />
        ) : null}
      </div> */}

      <EmojiPicker
        onEmojiClick={handleClick}
        autoFocusSearch={false}
        emojiStyle={EmojiStyle.NATIVE}
      />
    </div>
  );
}
