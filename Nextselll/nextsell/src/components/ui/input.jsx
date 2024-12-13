const Input = ({ label, value, onChange, type = 'text', className, ...props }) => {
  return (
    <div className={`input-container ${className}`}>
      {label && <label>{label}</label>}
      <input type={type} value={value} onChange={onChange} {...props} />
    </div>
  );
};

export default Input;
