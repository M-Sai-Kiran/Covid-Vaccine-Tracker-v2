import "./styles.scss";
import { useEffect, useState } from "react";
import { useIntervalSearch } from "./hooks/searchHook";
import { useNotification } from "./hooks/notificationHook";

export default function App() {
  const {
    nearbyCenters,
    startSearch,
    looking,
    stopSearch
  } = useIntervalSearch();

  const { notificationPermisssion, showNotification } = useNotification();
  const [centerHistory, setCenterHistory] = useState([]);

  const vaccineCount = (sessions) =>
    sessions.reduce(
      (total, current) => total + current.available_capacity_dose1,
      0
    );

  const joinedVaccineNames = (sessions) =>
    sessions.map((session) => session.vaccine).join(",");

  useEffect(() => {
    if (nearbyCenters.length && notificationPermisssion) {
      showNotification("Vaccines Available");
      const existing = centerHistory;
      const addHistory = existing.concat(nearbyCenters);
      setCenterHistory(addHistory);
    }
  }, [nearbyCenters]); // eslint-disable-line

  return (
    <div className="App">
      <button className="mg-r-sm" onClick={startSearch}>
        Start Looking for Centers
      </button>
      <button onClick={stopSearch}>Stop Looking for centers</button>
      <br />
      <br />
      {nearbyCenters.length ? (
        <>
          <h2>Vaccines Dose 1</h2>
          <h3>Live :</h3>
          <br />
          <ol>
            {nearbyCenters.map((center) => (
              <li key={center.center_id}>{`${center.name} Pin : ${
                center.pincode
              } - District : ${
                center.district_name
              } - Vaccine : ${joinedVaccineNames(
                center.sessions
              )} - Count : ${vaccineCount(center.sessions)}`}</li>
            ))}
          </ol>
        </>
      ) : looking ? (
        <span>Looking ....</span>
      ) : (
        <></>
      )}
      <h3>History :</h3>
      <br />
      <ol>
        {centerHistory &&
          centerHistory.length > 0 &&
          centerHistory.map((center) => (
            <li key={center.center_id}>{`${center.name} - Pin : ${
              center.pincode
            } - District : ${
              center.district_name
            } - Vaccine : ${joinedVaccineNames(
              center.sessions
            )} - Count : ${vaccineCount(
              center.sessions
            )} - time : ${new Date()}`}</li>
          ))}
      </ol>
    </div>
  );
}
