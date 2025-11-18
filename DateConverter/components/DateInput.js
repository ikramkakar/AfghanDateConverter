function DateInput({ selectedDate, onDateChange, conversionMode, onModeChange, shamsiInput, onShamsiChange }) {
  try {
    const formatDateForInput = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const handleDateChange = (e) => {
      const newDate = new Date(e.target.value);
      if (!isNaN(newDate.getTime())) {
        onDateChange(newDate);
      }
    };

    const setToday = () => {
      onDateChange(new Date());
    };

    return (
      <div className="mb-8" data-name="date-input" data-file="components/DateInput.js">
        <label className="block text-lg font-semibold mb-3 text-[var(--text-primary)]">
          Conversion Mode
        </label>
        <div className="flex gap-3 mb-4">
          <select value={conversionMode} onChange={(e) => onModeChange(e.target.value)} className="input-field w-64">
            <option value="g2s">Gregorian → Shamsi</option>
            <option value="s2g">Shamsi → Gregorian</option>
          </select>
        </div>

        {conversionMode === 'g2s' ? (
          <>
            <label className="block text-lg font-semibold mb-3 text-[var(--text-primary)]">Select Gregorian Date</label>
            <div className="flex gap-3">
              <input
                type="date"
                value={formatDateForInput(selectedDate)}
                onChange={handleDateChange}
                className="input-field flex-1"
              />
              <button
                onClick={setToday}
                className="px-6 py-3 bg-[var(--secondary-color)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <div className="icon-calendar-check text-lg"></div>
                Today
              </button>
            </div>
          </>
        ) : (
          <>
            <label className="block text-lg font-semibold mb-3 text-[var(--text-primary)]">Enter Shamsi (Solar Hijri) Date</label>
            <div className="grid grid-cols-3 gap-3">
              <input
                type="number"
                className="input-field"
                value={shamsiInput.year}
                onChange={(e) => onShamsiChange({ ...shamsiInput, year: e.target.value })}
                placeholder="Year"
              />
              <select
                className="input-field"
                value={shamsiInput.month}
                onChange={(e) => onShamsiChange({ ...shamsiInput, month: e.target.value })}
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={i + 1}>{getShamsiMonthName(i + 1)} ({i + 1})</option>
                ))}
              </select>
              <input
                type="number"
                className="input-field"
                value={shamsiInput.day}
                onChange={(e) => onShamsiChange({ ...shamsiInput, day: e.target.value })}
                placeholder="Day"
              />
            </div>
          </>
        )}
      </div>
    );
  } catch (error) {
    console.error('DateInput component error:', error);
    return null;
  }
}