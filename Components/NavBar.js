import { useState } from "react";
import styles from "../styles/Global.module.scss";
import { Button, Select, MenuItem } from "../Shared/Material";

export default function NavBar(props) {
  const { templates, onChange } = props;
  const [selectedTemplate, setSelectedTemplate] = useState("All");

  return (
    <div className={styles.navBar}>
      <Button
        variant="contained"
        color="primary"
        className={selectedTemplate == "All" ? styles.selectedTemplate : ""}
        onClick={() => {
          setSelectedTemplate("All");
          onChange(["All", -1]);
        }}
      >
        All
      </Button>
      <br></br>
      <div>
        <h3 className={styles.desktopElement}>Templates</h3>
      </div>
      {templates.map((template) => {
        return (
          <Button
            key={template.id}
            variant="contained"
            color="primary"
            disableElevation
            className={
              (selectedTemplate == template.label
                ? styles.selectedTemplate
                : "") +
              " " +
              styles.desktopElement
            }
            onClick={() => {
              setSelectedTemplate(template.label);
              onChange([template.label, template.id]);
            }}
          >
            {template.label}
          </Button>
        );
      })}
      <Select
        className={styles.mobileElement}
        onChange={(e) => {
          setSelectedTemplate(e.target.value);
          const template = templates.find((template) => {
            return template.label === e.target.value ? true : false;
          });
          onChange([e.target.value, template.id]);
        }}
        value={
          selectedTemplate && selectedTemplate !== "All" ? selectedTemplate : ""
        }
      >
        {templates.map((template) => {
          return (
            <MenuItem
              key={template.id}
              variant="contained"
              color="primary"
              value={template.label}
            >
              {template.label}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
}
