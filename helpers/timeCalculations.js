//helper functions for time calculations and safety checks

//safety check: determines type of last entity in array
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

//time calculation for timer: determines the time difference in milliseconds between two time stamps
export function determineTimeDifferenceNew(startTime, stopTime) {
  const differenceInMilliseconds =
    new Date(stopTime).getTime() - new Date(startTime).getTime();
  return differenceInMilliseconds;
}

//time calculation for timer: stores the time at which the timer is started at the end of the startStopArray
export function storeStart(
  setterOne,
  setterTwo,
  startStopArray,
  running,
  project
) {
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

//time calculation for timer: stores the pair of timer start time (taken from the end of the startStopArray) and timer pause time in an object within the startStopArray
export function storePause(
  setterOne,
  setterTwo,
  startStopArray,
  running,
  project
) {
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

//time calculation for day overview: adds all times of subtasks within a project
function addTimesHelper(array) {
  let totalTimeInMilliseconds = 0;

  for (let i = 0; i < array.length; i++) {
    totalTimeInMilliseconds += array[i];
  }

  return totalTimeInMilliseconds;
}

//time calculation for day overview: returns projects array with project information and added times for all subtasks within the projects
export function addTimesInProjects(projects) {
  const projectsWithAllTimes = projects.map((project) => {
    return { ...project, times: project.times.map((time) => time.time) };
  });

  const projectsWithAddedTimes = projectsWithAllTimes.map((project) => {
    return { ...project, times: addTimesHelper(project.times) };
  });
  return projectsWithAddedTimes;
}

//time calculation for day overview: returns the total time worked in a day by adding all subtask times of all projects
export function addAllTimesPerDay(projectsWithAddedTimes) {
  const arrayWithJustTimes = projectsWithAddedTimes.map(
    (project) => project.times
  );
  const totalTime = addTimesHelper(arrayWithJustTimes);
  return totalTime;
}
