//import format from "date-fns/format";

export function determineType(timeArray) {
  if (timeArray === undefined) {
    const type = "empty";
    return type;
  } else {
    const arrayLength = timeArray.length;
    const lastPosition = timeArray[arrayLength - 1];
    const type = typeof lastPosition;
    return type;
  }
}

/* export function determineTimeDifference(startTime, stopTime) {
  const startTimeHours = startTime.split(":")[0];
  const startTimeMinutes = startTime.split(":")[1];
  const stopTimeHours = stopTime.split(":")[0];
  const stopTimeMinutes = stopTime.split(":")[1];

  const timeDifference =
    (stopTimeHours - startTimeHours) * 60 +
    (stopTimeMinutes - startTimeMinutes);
  return timeDifference;
} */

export function determineTimeDifferenceNew(startTime, stopTime) {
  const differenceInMilliseconds =
    new Date(stopTime).getTime() - new Date(startTime).getTime();
  return differenceInMilliseconds;
}

export function storeStart(
  setterOne,
  setterTwo,
  startStopArray,
  running,
  project
) {
  //const now = format(new Date(), "HH:mm");
  const now = new Date();
  const projectInStartStopArray = startStopArray.find(
    (object) => object.id === project.id
  );
  const type = determineType(projectInStartStopArray?.array);

  if (running[0]) {
    alert(
      "Es läuft bereits ein Timer in einem anderen Projekt. Bitte pausiere oder stoppe diesen, bevor du einen neuen Timer startest."
    );
  } else if (type === "string") {
    alert(
      `Entschuldigung, etwas ist schief gelaufen. Bitte klicke auf "Tag abschließen" und versuche es dann erneut.`
    );
  } else {
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
  //const now = format(new Date(), "HH:mm");
  const now = new Date();
  const projectInStartStopArray = startStopArray.find(
    (object) => object.id === project.id
  );
  const type = determineType(projectInStartStopArray?.array);

  if (type === "object") {
    alert(
      `Entschuldigung, etwas ist schief gelaufen. Bitte klicke auf "Tag abschließen" und versuche es dann erneut.`
    );
  } else {
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
}

function addTimesHelper(array) {
  let totalTimeInMilliseconds = 0;

  for (let i = 0; i < array.length; i++) {
    totalTimeInMilliseconds += array[i];
  }

  return totalTimeInMilliseconds;
}

export function addTimesInProjects(projects) {
  const projectsWithAllTimes = projects.map((project) => {
    return { ...project, times: project.times.map((time) => time.time) };
  });

  const projectsWithAddedTimes = projectsWithAllTimes.map((project) => {
    return { ...project, times: addTimesHelper(project.times) };
  });
  return projectsWithAddedTimes;
}

export function addAllTimesPerDay(projectsWithAddedTimes) {
  const arrayWithJustTimes = projectsWithAddedTimes.map(
    (project) => project.times
  );
  const totalTime = addTimesHelper(arrayWithJustTimes);
  return totalTime;
}
