"use client";

import { useEffect, useState } from "react";
import Ping from "./Ping";

const View = ({ id }: { id: string }) => {
  const [views, setViews] = useState<number>(0);

  function formatNumber(number: number) {
    return number === 1 ? `${number} view` : `${number} views`;
  }

  useEffect(() => {
    const incrementViews = async () => {
      try {
        const response = await fetch(`http://localhost:5000/posts/views/${id}`);

        if (!response.ok) {
          throw new Error("Failed to update views");
        }

        const data = await response.json();
        setViews(data.views);
      } catch (error) {
        console.error("Error updating views:", error);
      }
    };

    incrementViews();
  }, [id]);

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">{formatNumber(views)}</span>
      </p>
    </div>
  );
};

export default View;
