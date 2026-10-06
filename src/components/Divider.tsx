'use client';

export default function Divider({ roman, label }: { roman: string; label: string }) {
  return (
    <div className="divider">
      <span className="divider__roman">{roman}</span>
      <span>— {label} —</span>
    </div>
  );
}
