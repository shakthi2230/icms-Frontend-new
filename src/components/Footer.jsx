import logo from '../assets/logo.png'; // adjust the path if needed

export default function Footer() {
  return (
    <footer className="bg-[#1E2A38] text-yellow-400 h-12 flex items-center justify-end  px-4 text-sm relative">

   

      {/* Right side logo */}
      <img src={logo} alt="Logo" className="h-8 w-auto" />
    </footer>
  );
}
