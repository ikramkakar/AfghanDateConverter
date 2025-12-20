# DateConverter — Shamsi ↔ Gregorian

This project converts between Gregorian and Afghan Shamsi (Solar Hijri) dates.

What I changed
- Implemented `shamsiToGregorian(shYear, shMonth, shDay)` in `utils/dateConverter.js`.
- Added a UI mode selector (Gregorian → Shamsi or Shamsi → Gregorian).
- Updated `components/DateInput.js`, `components/ResultDisplay.js`, and `app.js` to support both directions.

How to use
1. Open `index.html` in a browser (it uses React via CDN and Babel).
2. Choose the conversion mode from the dropdown.
   - "Gregorian → Shamsi": pick a Gregorian date with the date picker.
   - "Shamsi → Gregorian": enter Shamsi year, choose month, and enter day.
3. The result panel will show the input side and the converted date side.

Quick manual test (in browser console)
- Convert a Shamsi date to Gregorian:
  - Example: `shamsiToGregorian(1404, 8, 16)` — returns a JavaScript `Date` object.
- Convert a Gregorian date to Shamsi:
  - Example: `gregorianToShamsi(new Date(2025, 10, 7))` — note months are 0-based in `Date`.



