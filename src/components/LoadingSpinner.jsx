

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f111a]">
      <div className="text-center">
        {/* Outer rotating ring */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-yellow-400/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-yellow-400 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-transparent border-t-yellow-300 rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
          
          {/* Inner pulsing dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Loading text with animated dots */}
        <div className="flex items-center justify-center space-x-1">
          <p className="text-yellow-400 text-lg font-semibold tracking-wide">Loading</p>
          <div className="flex space-x-1">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
        
        <p className="text-blue-300 text-sm mt-2 opacity-75">Please wait...</p>
      </div>
    </div>
  );
}
export default LoadingSpinner;