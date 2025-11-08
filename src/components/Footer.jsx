import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-[#1E2A38] text-yellow-400 h-12 sm:h-14 flex items-center justify-end px-3 sm:px-4 text-sm flex-shrink-0">
      <img src={logo} alt="Logo" className="h-6 sm:h-8 w-auto" />
    </footer>
  );
}