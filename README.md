This project was created in [Next.js](https://nextjs.org/) - React

## Getting Started

```
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tools used

- Node v14.15.5
- Next.js (React)
- Sass
- Public database created in firebase (read only) `"https://rebelbase-challenge-default-rtdb.firebaseio.com"`.
- The website is build in a CI/CD environment where every branch and push request creates a website environment to test.

## Structure

| Components                           | Description                                                                                  |
| ------------------------------------ | -------------------------------------------------------------------------------------------- |
| ./Components/DragAndDropContainer.js | Contains a collection of scheduled items that can be draged and droped between them.         |
| ./Components/MainApp.js              | Contains a collections of 1 or more Drag and drop components.                                |
| ./Components/NavBar.js               | Navigation bar, contains the All button selector, as well as the selector for each template. |
| ./Components/ScheduleItem            | An item that contains all the schedule information from a single template (label and date).  |

| pages                | Description                                                           |
| -------------------- | --------------------------------------------------------------------- |
| ./pages/\_app.js     | Project initialization file created by next.js                        |
| ./pages/index.js     | Main app route                                                        |
| ./pages/easterEgg.js | Easter egg route [click here](https://rebelbase.vercel.app/easterEgg) |

| public                | Description          |
| --------------------- | -------------------- |
| ./public/deadpool.jpg | used in index.js     |
| ./public/schedule.png | used in easterEgg.js |

| Shared                       | Description                                      |
| ---------------------------- | ------------------------------------------------ |
| ./Shared/Material/index.js   | Material components shared across the project.   |
| ./Shared/ReactIcons/index.js | ReactIcons components shared across the project. |

| styles                   | Description                  |
| ------------------------ | ---------------------------- |
| ./styles/App.module.scss | Modular scss used in the app |
| ./styles/element.scss    | Elements sass code           |
| ./styles/global.scss     | Global sass                  |

| root                | Description                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| ./environment       | Contains the enviroment to run the app (database url).                                                       |
| ./package-lock.json | It describes the exact tree of npm dependencies that was generated                                           |
| ./package.json      | Gives information to npm that allows it to identify the project as well as handle the project's dependencies |
