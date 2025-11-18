function ResultDisplay({ shamsiDate, gregorianDate, mode }) {
  try {
    const formatGregorianDate = (date) => {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    };

    const leftCard = () => {
      if (mode === 's2g') {
        // show Shamsi on left
        return (
          <div className="bg-amber-50 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="icon-calendar-days text-lg text-[var(--secondary-color)]"></div>
              <h3 className="font-semibold text-[var(--text-secondary)]">Afghan Shamsi Date</h3>
            </div>
            <p className="text-2xl font-bold text-[var(--secondary-color)]">
              {shamsiDate.day} {shamsiDate.monthName} {shamsiDate.year}
            </p>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              {shamsiDate.day}/{shamsiDate.month}/{shamsiDate.year}
            </p>
          </div>
        );
      }

      return (
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="icon-calendar text-lg text-[var(--primary-color)]"></div>
            <h3 className="font-semibold text-[var(--text-secondary)]">Gregorian Date</h3>
          </div>
          <p className="text-2xl font-bold text-[var(--primary-color)]">
            {formatGregorianDate(gregorianDate)}
          </p>
        </div>
      );
    };

    const rightCard = () => {
      if (mode === 's2g') {
        return (
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="icon-calendar text-lg text-[var(--primary-color)]"></div>
              <h3 className="font-semibold text-[var(--text-secondary)]">Gregorian Date</h3>
            </div>
            <p className="text-2xl font-bold text-[var(--primary-color)]">
              {gregorianDate ? formatGregorianDate(gregorianDate) : 'Invalid date'}
            </p>
          </div>
        );
      }

      return (
        <div className="bg-amber-50 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="icon-calendar-days text-lg text-[var(--secondary-color)]"></div>
            <h3 className="font-semibold text-[var(--text-secondary)]">Afghan Shamsi Date</h3>
          </div>
          <p className="text-2xl font-bold text-[var(--secondary-color)]">
            {shamsiDate.day} {shamsiDate.monthName} {shamsiDate.year}
          </p>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            {shamsiDate.day}/{shamsiDate.month}/{shamsiDate.year}
          </p>
        </div>
      );
    };

    return (
      <div className="space-y-6" data-name="result-display" data-file="components/ResultDisplay.js">
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Conversion Result</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {leftCard()}
            {rightCard()}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ResultDisplay component error:', error);
    return null;
  }
}