export const getFormattedTime = (time) => {
  const date = new Date(time?.seconds * 1000 + time?.nanoseconds / 1000000);

  const formattedDate = `${date.toLocaleDateString("en-US", {
    month: "short",
  })} ${date.toLocaleDateString("en-US", {
    day: "2-digit",
  })}, ${date.toLocaleDateString("en-US", {
    year: "numeric",
  })}`;

  const formattedTime = date.toLocaleTimeString("en-US");

  const formattedDateTime = `${formattedDate}, ${formattedTime}`;
  return formattedDateTime;
};
