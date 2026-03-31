'use client';

export function DecorationShape() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Pill shape based on user guide: 
          - Large rectangle (size proportional to viewport)
          - Max rounding (radius = 1/2 width)
          - Rotation 45 degrees counter-clockwise (-45deg)
      */}
      <div
        className="absolute opacity-100 mix-blend-normal"
        style={{
          width: '80vw',
          height: '110vh',
          background: '#57B7F5',
          borderRadius: '40vw', // radius = 1/2 width
          left: '-40vw',
          top: '-10vh',
          transform: 'rotate(-45deg)', // 45 degrees counter-clockwise
          transformOrigin: 'center center',
          zIndex: 0
        }}
      />
    </div>
  );
}
