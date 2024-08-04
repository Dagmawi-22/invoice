interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Filter by id"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border h-9 mt-2 border-gray-300 p-2 rounded text-black transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transform focus:scale-105 shadow-lg"
    />
  );
};

export default SearchBar;
