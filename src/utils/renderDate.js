export default function (curdate) {
  const date = new Date(curdate);
  let res = "";
  res += renderD(date.getDate()) + "/";
  res += renderD(date.getMonth());
  res += "/" + date.getFullYear();
  res += " ";
  res +=
    date.getHours() > 12
      ? `${renderD(date.getHours() - 12)}`
      : renderD(date.getHours());
  res += ":";
  res += renderD(date.getMinutes());
  res += date.getHours() > 12 ? "pm" : "am";

  return res;
}

const renderD = (date) => {
  return date < 10 ? `0${date}` : date;
};
