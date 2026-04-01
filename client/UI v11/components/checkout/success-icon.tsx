'use client';

import { useEffect, useState } from 'react';

export function SuccessIcon() {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setIsAnimating(true);
  }, []);

  return (
    <div className="flex justify-center mb-8">
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        className="drop-shadow-md"
      >
        {/* Outer circle */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="#2DB224"
          strokeWidth="3"
          style={{
            strokeDasharray: '301.59',
            strokeDashoffset: isAnimating ? 0 : '301.59',
            transition: 'stroke-dashoffset 0.8s ease-out',
          }}
        />

        {/* Checkmark */}
        <path
          d="M 32 50 L 45 63 L 68 38"
          fill="none"
          stroke="#2DB224"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: '60',
            strokeDashoffset: isAnimating ? 0 : '60',
            transition: 'stroke-dashoffset 0.8s ease-out 0.2s',
          }}
        />
      </svg>
    </div>
  );
}
