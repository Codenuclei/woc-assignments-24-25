async function textToSpeech(text) {
  const voiceId = "Xb7hH8MSUJpSbSDYk0k2"; // Replace with the desired voice ID
  const apiKey = "sk_03d3491febbf231c431977143b8c0e5abad8d308c0b5e3bf"; // Replace with your ElevenLabs API key

  const requestBody = {
    text: text,
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.75,
    },
  };

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify(requestBody),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.oncanplaythrough = () => {
      audio.play();
    };

    // Optional: To detect errors
    audio.onerror = (err) => {
      console.error("Audio playback error:", err);
    };
  } catch (error) {
    console.error("Error:", error);
  }
}
const date = new Date();
const day = date.getDate().toString().padStart(2, "0");
const month = date.toLocaleString("en-US", { month: "short" });
const year = date.getFullYear();
const dayshort = date.toLocaleString("en-US", { weekday: "short" });
const mElement = document.getElementById("m");
const yElement = document.getElementById("y");
const ndElement = document.getElementById("nd");
const sElement = document.getElementById("s");

mElement.textContent = month.toUpperCase();
yElement.textContent = year;
ndElement.textContent = day;
sElement.textContent = dayshort.toUpperCase();
function speech() {
  const text = day+date.toLocaleString("en-US",{weekday: "long"}) + date.toLocaleString("en-US",{month: "long"})  + year;
  textToSpeech(text);
}
