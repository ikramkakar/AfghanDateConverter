function Footer() {
  try {
    return (
      <footer className="bg-gray-100 py-6 mt-12" data-name="footer" data-file="components/Footer.js">
        <div className="container mx-auto px-4 max-w-4xl text-center text-[var(--text-secondary)]">
          <p>© 2025 More Systems. Convert dates between Gregorian and Afghan Shamsi calendars.</p>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}