export default function Header({ title }) {
  return (
    <header className="bg-[#1E2A38] text-white h-16 px-6 flex items-center justify-between shadow">
      <h1 className="text-2xl font-normal text-yellow-500">{title}</h1>
    </header>
  );
}
