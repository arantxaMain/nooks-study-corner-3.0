interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div style={{ 
      color: 'red', 
      padding: '10px', 
      margin: '10px 0',
      borderRadius: '4px',
      backgroundColor: 'rgba(255, 0, 0, 0.1)'
    }}>
      {message}
    </div>
  );
};