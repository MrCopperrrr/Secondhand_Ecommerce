'use client';

export function DecorationShape() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Centered Pill shape:
          - Geometric center coincides with the container's center
          - Rotation 45 degrees counter-clockwise
      */}
      <div
        className="absolute opacity-100 mix-blend-normal"
        style={{
          width: '80vw',
          height: '110vh',
          background: '#57B7F5',
          borderRadius: '40vw', // radius = 1/2 width
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) rotate(-45deg)', // Centered and rotated
          transformOrigin: 'center center',
          zIndex: 0
        }}
      />
    </div>
  );
}
