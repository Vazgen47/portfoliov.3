const MONTHS = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  hy: ['Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս', 'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր'],
};

/** '2026-10' -> 'October 2026' / 'Հոկտեմբեր 2026' (no Intl dependency, so Armenian is always correct). */
export function formatMonth(isoYearMonth, lang) {
  const [year, month] = isoYearMonth.split('-');
  const names = MONTHS[lang] || MONTHS.en;
  return `${names[Number(month) - 1]} ${year}`;
}
