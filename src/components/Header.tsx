const Header = () => {
  return (
    <>
      <header className="border-b-2 mb-6 pb-2 flex justify-between items-center gap-4 md:gap-0">
        <h1 className="text-2xl font-medium">Gallery</h1>
        <button className="border-2 rounded-md px-3 py-1 bg-black/5 font-medium border-red-200 hover:border-red-400 text-red-600">
          Delete
        </button>
      </header>
    </>
  );
};

export default Header;
