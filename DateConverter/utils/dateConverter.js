function gregorianToShamsi(gregorianDate) {
  try {
    const gYear = gregorianDate.getFullYear();
    const gMonth = gregorianDate.getMonth() + 1;
    const gDay = gregorianDate.getDate();

    let jYear, jMonth, jDay;

    const gDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const jDaysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

    let gy = gYear - 1600;
    let gm = gMonth - 1;
    let gd = gDay - 1;

    let gDayNo = 365 * gy + Math.floor((gy + 3) / 4) - Math.floor((gy + 99) / 100) + Math.floor((gy + 399) / 400);

    for (let i = 0; i < gm; ++i) {
      gDayNo += gDaysInMonth[i];
    }

    if (gm > 1 && ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0))) {
      ++gDayNo;
    }

    gDayNo += gd;

    let jDayNo = gDayNo - 79;

    let jNp = Math.floor(jDayNo / 12053);
    jDayNo = jDayNo % 12053;

    jYear = 979 + 33 * jNp + 4 * Math.floor(jDayNo / 1461);

    jDayNo %= 1461;

    if (jDayNo >= 366) {
      jYear += Math.floor((jDayNo - 1) / 365);
      jDayNo = (jDayNo - 1) % 365;
    }

    let i = 0;
    for (; i < 11 && jDayNo >= jDaysInMonth[i]; ++i) {
      jDayNo -= jDaysInMonth[i];
    }

    jMonth = i + 1;
    jDay = jDayNo + 1;

    return {
      year: jYear,
      month: jMonth,
      day: jDay,
      monthName: getShamsiMonthName(jMonth)
    };
  } catch (error) {
    console.error('Date conversion error:', error);
    return null;
  }
}

function getShamsiMonthName(month) {
  const months = [
    'Hamal', 'Sawr', 'Jawza', 'Saratan', 'Asad', 'Sonbola',
    'Mizan', 'Aqrab', 'Qaws', 'Jadi', 'Dalvæ', 'Hut'
  ];
  return months[month - 1];
}

function shamsiToGregorian(shYear, shMonth, shDay) {
  try {
    // Based on algorithm complementary to gregorianToShamsi
    const jDaysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
    const gDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let jy = parseInt(shYear, 10);
    let jm = parseInt(shMonth, 10);
    let jd = parseInt(shDay, 10);

    if (isNaN(jy) || isNaN(jm) || isNaN(jd)) return null;

    jy -= 979;
    jm -= 1;
    jd -= 1;

    let jDayNo = 365 * jy + Math.floor(jy / 33) * 8 + Math.floor((jy % 33 + 3) / 4);
    for (let i = 0; i < jm; ++i) {
      jDayNo += jDaysInMonth[i];
    }
    jDayNo += jd;

    let gDayNo = jDayNo + 79;

    let gy = 1600 + 400 * Math.floor(gDayNo / 146097);
    gDayNo = gDayNo % 146097;

    let leap = true;
    if (gDayNo >= 36525) {
      gDayNo -= 1;
      gy += 100 * Math.floor(gDayNo / 36524);
      gDayNo = gDayNo % 36524;
      if (gDayNo >= 365) {
        gDayNo += 1;
      } else {
        leap = false;
      }
    }

    gy += 4 * Math.floor(gDayNo / 1461);
    gDayNo = gDayNo % 1461;

    if (gDayNo >= 366) {
      leap = false;
      gy += Math.floor((gDayNo - 1) / 365);
      gDayNo = (gDayNo - 1) % 365;
    }

    let gm = 0;
    for (; gm < 12; ++gm) {
      let v = gDaysInMonth[gm];
      if (gm === 1 && leap) v = 29; // February in leap year
      if (gDayNo < v) break;
      gDayNo -= v;
    }

    const gd = gDayNo + 1;

    // Return a JavaScript Date (months 0-based)
    return new Date(gy, gm, gd);
  } catch (error) {
    console.error('Shamsi->Gregorian conversion error:', error);
    return null;
  }
}

function validateShamsiDate(year, month, day) {
  // Basic numeric checks
  const y = parseInt(year, 10);
  const m = parseInt(month, 10);
  const d = parseInt(day, 10);
  if (isNaN(y) || isNaN(m) || isNaN(d)) return { valid: false, reason: 'Invalid numbers' };
  if (m < 1 || m > 12) return { valid: false, reason: 'Month must be between 1 and 12' };
  if (d < 1) return { valid: false, reason: 'Day must be >= 1' };

  // Month lengths in Shamsi calendar (last month may be 29 or 30)
  const monthLengths = [31,31,31,31,31,31,30,30,30,30,30,29];

  // Quick reject if day exceeds conservative max (30)
  if (d > 31) return { valid: false, reason: 'Day must be <= 31' };

  // For month 12 (index 11), need to check leap year possibility. We'll perform a round-trip check
  // using conversion helpers: convert to Gregorian and back — if the round-trip matches input, we accept it.
  try {
    const g = shamsiToGregorian(y, m, d);
    if (!(g instanceof Date) || isNaN(g.getTime())) return { valid: false, reason: 'Invalid Shamsi date (conversion failed)' };
    const back = gregorianToShamsi(g);
    if (!back) return { valid: false, reason: 'Round-trip conversion failed' };
    if (back.year === y && back.month === m && back.day === d) {
      return { valid: true };
    }
    return { valid: false, reason: 'Round-trip mismatch (date does not exist in Shamsi calendar)' };
  } catch (err) {
    return { valid: false, reason: 'Conversion error' };
  }
}