"use client";
import { useEffect, useState } from "react";

export default function TranscriptViewer({ url }) {
  const [subtitles, setSubtitles] = useState("");

  useEffect(() => {
    // Function to fetch and parse the .srt file
    const fetchSubtitles = async () => {
      try {
        const response = await fetch(url);
        const text = await response.text();

        setSubtitles(parseSRT(text));
      } catch (error) {
        console.error("Failed to fetch subtitles:", error);
      }
    };

    fetchSubtitles();
  }, [url]);

  // Function to parse .srt content into readable text
  const parseSRT = (srt) => {
    const lines = srt.split("\n");
    const textLines = lines
      .filter((line) => !line.match(/^\d+$/) && !line.match(/-->/))
      .join(" ");
    return textLines.trim();
  };

  return (
    <div>
      <p>{subtitles}</p>
    </div>
  );
}
