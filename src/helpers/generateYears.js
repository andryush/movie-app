function generateYears(startYear, endYear) {
  const years = [];
  for (let i = endYear; i >= startYear; i--) {
    years.push({ label: i.toString(), value: i });
  }
  return years;
}
export default generateYears;
