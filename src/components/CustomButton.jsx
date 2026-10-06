export default function CustomButton({ onClick, children, variant = 'primary', title }) {
  const baseStyle = { padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' };
  const colorStyle = variant === 'primary' 
    ? { background: '#0284c7', color: 'white' } 
    : { background: '#64748b', color: 'white' };

  return (
    <button onClick={onClick} style={{...baseStyle, ...colorStyle}} title={title}>
      {children}
    </button>
  );
}