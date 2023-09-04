const useCalculateTime = (inputStr) => {
  // if inputStr is in UTC format
  const inputDate: any = new Date(inputStr);
  // get current date
  const currentDate: any = new Date();

  // set up date formats
  const timeFormat: any = { hour: "numeric", minute: "numeric" };
  const dateFormat = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  // check if it's today, tomorrow or more than a day ago
  if (
    inputDate.getUTCDate() === currentDate.getUTCDate() &&
    inputDate.getUTCMonth() === currentDate.getUTCMonth() &&
    inputDate.getUTCFullYear() === currentDate.getUTCFullYear()
  ) {
    // Today: convert to AM/PM format
    const ampmTime = inputDate.toLocaleTimeString("en-US", timeFormat);
    return ampmTime;
  } else if (
    inputDate.getUTCDate() === currentDate.getUTCDate() - 1 &&
    inputDate.getUTCMonth() === currentDate.getUTCMonth() &&
    inputDate.getUTCFullYear() === currentDate.getUTCFullYear()
  ) {
    // Tomorrow: show "Yesterday"
    return "Yesterday";
  } else if (
    Math.floor((currentDate - inputDate) / (1000 * 60 * 60 * 24)) > 1 &&
    Math.floor((currentDate - inputDate) / (1000 * 60 * 60 * 24)) <= 7
  ) {
    const timeDifference = Math.floor(
      (currentDate - inputDate) / (1000 * 60 * 60 * 24),
    );
    const targetDate = new Date();
    targetDate.setDate(currentDate.getDate() - timeDifference);

    const days_of_the_week = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const targetDay = days_of_the_week[targetDate.getDay()];

    return targetDay;
  } else {
    const formattedDate = inputDate.toLocaleDateString("en-GB", dateFormat);
    return formattedDate;
  }
};

export default useCalculateTime;
