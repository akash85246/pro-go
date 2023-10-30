import React from "react";

export default function ProgressBar({ circleCount, color }) {
  const elements = [];

  for (let i = 1; i <= color; i++) {
    elements.push(<div key={`circle${i}`} className={`circle c1`}></div>);
    if (i < circleCount) {
      elements.push(<div key={`line${i}`} className="line"></div>);
    }
  }
  for (let i = color + 1; i <= circleCount; i++) {
    elements.push(<div key={`circle${i}`} className={`circle c${i}`}></div>);
    if (i < circleCount) {
      elements.push(<div key={`line${i}`} className="line"></div>);
    }
  }

  return <div className="progress-bar">{elements}</div>;
}



