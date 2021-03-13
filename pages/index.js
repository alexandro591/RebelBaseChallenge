import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Global.module.scss";
import axios from "axios";
import { databaseUrl } from "../environment";
import NavBar from "../Components/NavBar";
import MainApp from "../Components/MainApp";
import { Button } from "../Shared/Material";
import { resetServerContext } from "react-beautiful-dnd";

export default function Main() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState([]);
  useEffect(() => {}, [templates]);

  useEffect(async () => {
    const { data } = await axios.get(`${databaseUrl}/templates.json`);
    setSelectedTemplate(
      localStorage.getItem("selectedTemplate")
        ? localStorage.getItem("selectedTemplate")
        : ["All", -1]
    );

    setTemplates(data);
  }, []);

  return (
    <div>
      <Head>
        <title>Builder Schedule</title>
        <link rel="icon" href="/schedule.png" />
      </Head>
      <h1 style={{ textAlign: "center" }}>
        Select Builder Schedule - 2019 Fall Cohort
      </h1>
      <div className={styles.appContainer}>
        <NavBar templates={templates} onChange={setSelectedTemplate}></NavBar>
        <div className={styles.mainAppContainer}>
          {(() => {
            if (selectedTemplate[1] >= 0) {
              return (
                <MainApp
                  templates={templates}
                  onChange={setTemplates}
                  selectedTemplate={selectedTemplate[1]}
                ></MainApp>
              );
            }
            return templates.map((_, index) => (
              <MainApp
                key={index}
                templates={templates}
                onChange={setTemplates}
                selectedTemplate={index}
              ></MainApp>
            ));
          })()}
        </div>

        <div></div>
        <div className={styles.bottomButtons}>
          <Button color="secondary" variant="contained">
            Cancel
          </Button>
          <Button color="primary" variant="contained">
            Use this builder schedule
          </Button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  resetServerContext();
  return { props: { data: [] } };
};
