import format from "date-fns/format";

export function determineTimeDifference(startTime, stopTime) {
  const startTimeHours = startTime.split(":")[0];
  const startTimeMinutes = startTime.split(":")[1];
  const stopTimeHours = stopTime.split(":")[0];
  const stopTimeMinutes = stopTime.split(":")[1];

  const timeDifference =
    (stopTimeHours - startTimeHours) * 60 +
    (stopTimeMinutes - startTimeMinutes);
  return timeDifference;
}

export function storeStart(
  setterOne,
  setterTwo,
  startStopArray,
  running,
  project
) {
  if (running[0]) {
    alert(
      "Es läuft bereits ein Timer in einem anderen Projekt. Bitte pausiere oder stoppe diesen, bevor du einen neuen Timer startest."
    );
  } else {
    const now = format(new Date(), "HH:mm");
    const projectInStartStopArray = startStopArray.find(
      (object) => object.id === project.id
    );

    if (projectInStartStopArray) {
      setterOne(
        startStopArray.map((object) =>
          object.id === project.id
            ? { ...object, array: [...object.array, now] }
            : object
        )
      );
    } else {
      setterOne([...startStopArray, { id: project.id, array: [now] }]);
    }

    setterTwo([...running, project.id]);
  }
}

export function storePause(
  setterOne,
  setterTwo,
  startStopArray,
  running,
  project
) {
  const now = format(new Date(), "HH:mm");
  const projectInStartStopArray = startStopArray.find(
    (object) => object.id === project.id
  );

  const arrayLength = projectInStartStopArray.array.length;

  const newTimePair = {
    start: projectInStartStopArray.array[arrayLength - 1],
    stop: now,
  };

  const shortenedArray = projectInStartStopArray.array.slice(
    0,
    arrayLength - 1
  );

  setterOne(
    startStopArray.map((object) =>
      object.id === project.id
        ? { ...object, array: [...shortenedArray, newTimePair] }
        : object
    )
  );

  setterTwo(running.filter((id) => id !== project.id));
}
