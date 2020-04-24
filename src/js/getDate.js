function convertDate(value) {
  return value < 10 ? `0${value}` : value;
}

export default function getDate(dateValue) {
  const currentDate = new Date(dateValue);
  const day = convertDate(currentDate.getDate());
  const month = convertDate(currentDate.getMonth() + 1);
  const year = convertDate(currentDate.getFullYear());
  const hours = convertDate(currentDate.getHours());
  const min = convertDate(currentDate.getMinutes());
  return `${day}.${month}.${year} ${hours}:${min}`;
}
