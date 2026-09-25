export function LoadingState() {
  return (
    <div className="text-center py-10">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-green-500 border-t-transparent"></div>
      <p className="text-gray-600 mt-2">Chef AI is mixing up your recipe...</p>
    </div>
  );
}