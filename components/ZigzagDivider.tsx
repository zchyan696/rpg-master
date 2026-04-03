export default function ZigzagDivider({ className = '' }: { className?: string }) {
  return (
    <div
      className={`w-full ${className}`}
      style={{
        height: '12px',
        backgroundImage:
          'linear-gradient(135deg, #8B0000 25%, transparent 25%) -8px 0, ' +
          'linear-gradient(225deg, #8B0000 25%, transparent 25%) -8px 0, ' +
          'linear-gradient(315deg, #8B0000 25%, transparent 25%), ' +
          'linear-gradient(45deg, #8B0000 25%, transparent 25%)',
        backgroundSize: '16px 16px',
        backgroundColor: '#1a0505',
      }}
    />
  )
}
