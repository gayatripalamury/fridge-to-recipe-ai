export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="bg-red-50 border border-red-200 p-6 rounded-lg max-w-md mx-auto text-center shadow-sm">
      <h3 className="text-red-800 font-bold mb-1">Oops, something went wrong</h3>
      <p className="text-red-600 text-sm mb-4">{message}</p>
      <button 
        onClick={onRetry}
        className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-700 transition"
      >
        Try Again
      </button>
    </div>
  );
}