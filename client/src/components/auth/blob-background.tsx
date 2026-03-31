'use client';

export function BlobBackground() {
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      {/* Animated Blob */}
      <svg
        className="absolute w-96 h-96 -top-32 -right-32 opacity-80"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>
            {`
              @keyframes blob {
                0%, 100% {
                  transform: translate(0, 0) scale(1);
                }
                33% {
                  transform: translate(30px, -50px) scale(1.1);
                }
                66% {
                  transform: translate(-20px, 20px) scale(0.9);
                }
              }
              .blob {
                animation: blob 7s infinite;
              }
            `}
          </style>
        </defs>
        <path
          className="blob"
          fill="#57B7F5"
          d="M45.11,-57.77C57.38,-50.39,66.45,-37.26,71.85,-23.59C77.25,-9.92,79.01,4.27,76.78,18.12C74.55,31.97,68.33,45.26,58.57,52.86C48.81,60.46,35.5,62.27,22.59,61.54C9.68,60.81,-3.46,57.54,-15.36,51.87C-27.26,46.2,-37.88,38.14,-44.37,27.88C-50.86,17.62,-53.21,5.16,-52.85,-8.67C-52.49,-22.5,-49.32,-37.8,-41.78,-47.72C-34.24,-57.64,-22.33,-62.18,-10.35,-63.59C1.63,-65,25.84,-65.15,45.11,-57.77Z"
        />
      </svg>

      {/* Background Color */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F2FAFF] to-[#E8F4FB]" />
    </div>
  );
}
