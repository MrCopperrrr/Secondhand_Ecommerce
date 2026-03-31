'use client';

export function DecorationShape() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large blue geometric shape - rotated 45 degrees */}
      <div
        className="absolute w-[900px] h-[900px] rounded-full opacity-100"
        style={{
          background: '#57B7F5',
          left: '-200px',
          top: '-150px',
          transform: 'rotate(45deg)',
        }}
      />
    </div>
  );
}
