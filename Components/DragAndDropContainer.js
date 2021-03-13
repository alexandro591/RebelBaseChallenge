import styles from "../styles/Global.module.scss";
import ScheduleItem from "./ScheduleItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TextField } from "../Shared/Material";

export default function DrangAndDropContainer(props) {
  const {
    handleOnDragEnd,
    handleDateChange,
    handleTimeChange,
    selected,
    setSelected,
    dates,
    times,
    templates,
    selectedTemplate,
    refresh,
    state,
    allSelected,
    setAllSelected,
  } = props;
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="drop-area">
        {(provided) => {
          return (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {templates[selectedTemplate]?.schedules?.map(
                (template, index) => {
                  return (
                    <Draggable
                      key={template.label}
                      draggableId={template.label}
                      index={index}
                    >
                      {(provided) => {
                        return (
                          <div
                            className={styles.draggableItemContainer}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div
                              onClick={(e) => {
                                e.target.classList.forEach((_class) => {
                                  const _selected = [...selected];
                                  if (_class.includes("scheduleItem")) {
                                    if (
                                      !e.target.classList.contains("selected")
                                    ) {
                                      e.target.classList.add("selected");
                                      _selected[index] = true;
                                    } else {
                                      e.target.classList.remove("selected");
                                      _selected[index] = false;
                                    }
                                    setSelected(_selected);
                                    refresh(!state);
                                    setAllSelected(false);
                                  }
                                });
                              }}
                            >
                              <ScheduleItem
                                selected={allSelected ? true : selected[index]}
                                label={template.label}
                              ></ScheduleItem>
                            </div>
                            <div
                              className={styles.mobileElement}
                              style={{
                                margin: "5px",
                                textAlign: "left",
                                marginLeft: "35px",
                                width: "100%",
                              }}
                            >
                              Due date
                            </div>
                            <div className={styles.pickers}>
                              <div
                                className={
                                  selected[index] || allSelected
                                    ? "hideIfSelected"
                                    : "showIfNotSelected" +
                                      " " +
                                      styles.datePicker
                                }
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    width: "100%",
                                    justifyContent: "center",
                                    alignContent: "center",
                                  }}
                                >
                                  <DatePicker
                                    selected={dates[index]}
                                    onChange={(date) => {
                                      handleDateChange(date, index);
                                    }}
                                  />
                                  <span>📅</span>
                                </div>
                              </div>

                              <form
                                noValidate
                                className={
                                  styles.input +
                                  (selected[index] || allSelected
                                    ? " hideIfSelected"
                                    : " showIfNotSelected")
                                }
                              >
                                <TextField
                                  type="time"
                                  className={
                                    selected[index] || allSelected
                                      ? "hideIfSelected"
                                      : "showIfNotSelected"
                                  }
                                  value={times[index] ? times[index] : ""}
                                  onChange={(e) => {
                                    handleTimeChange(e.target.value, index);
                                  }}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  inputProps={{
                                    step: 300,
                                  }}
                                />
                              </form>
                            </div>
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                }
              )}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
}
