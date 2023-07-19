export function determineTimeDifference(startTime, stopTime) {
  const startTimeHours = startTime.split(":")[0];
  const startTimeMinutes = startTime.split(":")[1];
  const stopTimeHours = stopTime.split(":")[0];
  const stopTimeMinutes = stopTime.split(":")[1];

  if (
    (stopTimeHours > startTimeHours && stopTimeMinutes > startTimeMinutes) ||
    (stopTimeHours > startTimeHours && stopTimeMinutes === startTimeMinutes)
  ) {
    const timeDifference =
      (stopTimeHours - startTimeHours) * 60 +
      (stopTimeMinutes - startTimeMinutes);
    return timeDifference;
  } else if (stopTimeHours === startTimeHours) {
    const timeDifference = stopTimeMinutes - startTimeMinutes;
    return timeDifference;
  } else if (
    stopTimeHours > startTimeHours &&
    stopTimeMinutes < startTimeMinutes
  ) {
    const timeDifference =
      (stopTimeHours - startTimeHours) * 60 -
      60 +
      (startTimeMinutes - stopTimeMinutes);
    return timeDifference;
  }
}
