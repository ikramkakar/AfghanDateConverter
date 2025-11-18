function Header() {
  try {
    return (
      <header className="bg-[var(--primary-color)] text-white py-8" data-name="header" data-file="components/Header.js">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <div className="icon-calendar text-2xl text-white"></div>
            </div>
            <h1 className="text-3xl font-bold">Date Converter</h1>
          </div>
          <p className="text-blue-100 text-lg">Convert Gregorian dates to Afghan Shamsi (Solar Hijri) calendar</p>
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}