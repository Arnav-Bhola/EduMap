export const convertDuration = ({ number, unit }) => {
  if (unit === "days") {
    number *= 24;
  } else if (unit === "weeks") {
    number *= 168;
  } else if (unit === "months") {
    number *= 730;
  }

  return number;
};
