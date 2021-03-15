import styles from "../styles/App.module.scss";
import { useEffect, useState } from "react";
import { resetServerContext } from "react-beautiful-dnd";
import "react-datepicker/dist/react-datepicker.css";
import DrangAndDropContainer from "./DragAndDropContainer";

export default function MainApp(props) {
  const { templates, onChange: setTemplates, selectedTemplate } = props;
  const [dates, setDates] = useState([]);
  const [times, setTimes] = useState([]);
  const [selected, setSelected] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [state, refresh] = useState(false);

  useEffect(() => {
    const _dates = [];
    const _times = [];
    const _selected = [];
    if (templates.length) {
      templates[selectedTemplate]?.schedules?.forEach((schedule, index) => {
        _selected[index] = false;
        _dates.push(new Date(schedule.date));
        _times.push(
          new Date(schedule.date).toLocaleString("en-us", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      });
    }

    setSelected(_selected);
    setDates([..._dates]);
    setTimes([..._times]);
  }, [selectedTemplate]);

  useEffect(() => {
    refresh(!state);
  }, [times, dates]);

  useEffect(() => {
    const _selected = [...selected];
    if (allSelected) {
      for (let i in templates[selectedTemplate]?.schedules) {
        _selected[i] = allSelected;
      }
      setSelected(_selected);
    } else {
      for (let i in templates[selectedTemplate]?.schedules) {
        if (!_selected[i]) return;
        _selected[i] = allSelected;
      }
      setSelected(_selected);
    }
  }, [allSelected]);

  useEffect(() => {
    let _allSelected = false;
    for (let i in selected) {
      if (!selected[i]) {
        _allSelected = true;
        return;
      } else {
        _allSelected = true;
      }
    }
    if (
      _allSelected &&
      selected.length === templates[selectedTemplate]?.schedules?.length
    )
      setAllSelected(true);
  }, [selected]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    else {
      const [reorderedItem] = templates[selectedTemplate]?.schedules?.splice(
        result.source.index,
        1
      );
      templates[selectedTemplate]?.schedules?.splice(
        result.destination.index,
        0,
        reorderedItem
      );

      const [reorderedDates] = dates.splice(result.source.index, 1);
      dates.splice(result.destination.index, 0, reorderedDates);

      const [reorderedTimes] = times.splice(result.source.index, 1);
      times.splice(result.destination.index, 0, reorderedTimes);

      const [reorderedSelected] = selected.splice(result.source.index, 1);
      selected.splice(result.destination.index, 0, reorderedSelected);
    }

    setTimes(times);
    setDates(dates);
    setSelected(selected);
    setTemplates(templates);
  };

  const handleDateChange = (date, index) => {
    dates[index] = date;
    templates[selectedTemplate]?.schedules?.forEach((schedule, index) => {
      schedule.date = dates[index].toLocaleDateString() + " " + times[index];
    });
    refresh(!state);
  };

  const handleTimeChange = (date, index) => {
    times[index] = date;
    templates[selectedTemplate]?.schedules?.forEach((schedule, index) => {
      schedule.date = dates[index].toLocaleDateString() + " " + times[index];
    });
    refresh(!state);
  };

  return (
    <div className={styles.scheduleContainer}>
      <div className={styles.topMainApp}>
        <span
          style={{ textAlign: "left", fontWeight: "bolder", color: "grey" }}
        >
          {templates[selectedTemplate]?.label}
        </span>
        <a
          onClick={(e) => setAllSelected(!allSelected)}
          style={{ textAlign: "right" }}
        >
          {(!allSelected ? "Select " : "Deselect ") +
            "all in " +
            templates[selectedTemplate]?.label}
        </a>
        <span className={styles.desktopElement}>Due Date</span>
      </div>
      <div className={styles.app}>
        <DrangAndDropContainer
          handleOnDragEnd={handleOnDragEnd}
          handleDateChange={handleDateChange}
          handleTimeChange={handleTimeChange}
          selected={selected}
          setSelected={setSelected}
          dates={dates}
          allSelected={allSelected}
          times={times}
          templates={templates}
          selectedTemplate={selectedTemplate}
          refresh={refresh}
          state={state}
          setAllSelected={setAllSelected}
        ></DrangAndDropContainer>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  resetServerContext();
  return { props: { data: [] } };
};
