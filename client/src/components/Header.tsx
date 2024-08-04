export default function Header() {
  return (
    <header className="bg-indigo-600 text-white p-1 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl font-bold">INVOICE</span>
        </div>
        <nav className="flex space-x-4"></nav>
      </div>
    </header>
  );
}
