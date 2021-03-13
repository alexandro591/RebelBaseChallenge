import styles from "../styles/App.module.scss";
import { BsCircleFill, GiHamburgerMenu } from "../Shared/ReactIcons";

export default function ScheduleItem(props) {
  const { selected } = props;
  return (
    <div className={styles.scheduleItem + (selected ? " selected" : "")}>
      <GiHamburgerMenu className={styles.desktopElement}></GiHamburgerMenu>
      <BsCircleFill className={styles.desktopElement}></BsCircleFill>

      <BsCircleFill
        className={styles.mobileElement}
        style={{ marginTop: "10px" }}
      ></BsCircleFill>
      <div className={styles.scheduleCard}>
        <div>
          <h4>{props.label}</h4>
          <a href="/">view builder</a>
        </div>
        <img src="/schedule.png"></img>
      </div>
    </div>
  );
}
