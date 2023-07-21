# Time Tracker

This webapp was written to keep track of how much time was spent working on specific projects.

Features:

- The user can create colour-coded projects and start timers in those projects
- Timers can be paused and restarted as needed
- Stopping a timer lets the user describe their task, the app will then display the description and total time worked on this task
- Only one timer can be running at any time, but pausing a timer gives the user the option to start another one
- Running timers are easily distinguishable by an animation
- Clicking the "end of day" button gives the user an overview over their projects, tasks and times
- Confirming this list deletes tasks and times but keeps projects for the next day
- All data is stored in local storage, no log-in is needed

## Project Setup

1. Clone this repository
2. Inside root folder install all dependencies via `npm install`
3. Run app in development mode via `npm run dev`
