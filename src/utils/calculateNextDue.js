export const calculateNextDueDate = (lastDate, days = 30) => {
  const nextDate = new Date(lastDate);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate.toISOString().split("T")[0];
};
