export default function FeedbackAlert({ message, type = 'info' }) {
  if (!message) return null;
  const bg = type === 'error' ? '#fee2e2' : type === 'success' ? '#dcfce7' : '#e0f2fe';
  const color = type === 'error' ? '#991b1b' : type === 'success' ? '#166534' : '#075985';
  
  return (
    <div style={{ padding: '15px', backgroundColor: bg, color: color, borderRadius: '6px', margin: '15px 0', border: `1px solid ${color}` }}>
      {message}
    </div>
  );
}