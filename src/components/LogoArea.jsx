export default function LogoArea({ logo }) {
  return (
    <div className="h-16 px-5 flex items-center border-b border-gray-700">
      <a href={logo.href} className="flex items-center">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-yellow-500 to-gray-600 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <span className="ml-3 text-xl font-bold">
  {/* First character with logo.color */}
  <span className={`text-${logo.color}-500`}>
    {logo.name.slice(0, 1)}
  </span>

  {/* 2nd + 3rd characters forced white */}
  <span className="text-white">
    {logo.name.slice(1, 3)}
  </span>

  {/* Remaining characters with logo.color */}
  <span className={`text-${logo.color}-500`}>
    {logo.name.slice(3)}
  </span>
</span>

      </a>
    </div>
  );
}
