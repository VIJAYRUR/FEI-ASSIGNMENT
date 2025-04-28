interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
