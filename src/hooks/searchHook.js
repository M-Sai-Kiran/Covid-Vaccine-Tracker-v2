import { useState } from "react";
import axios from "axios";
import { useInterval } from "./intervalHook";
import { centerValidation } from "../validations";

export function useIntervalSearch() {
  const [nearbyCenters, setNearbyCenters] = useState([]);
  const { start, inProgress, stop } = useInterval(20000);

  const getCenters = async () => {
    let [month, date, year] = new Date().toLocaleDateString().split("/");
    const formattedDate = `${date}-${month < 10 ? "0" + month : month}-${year}`;
    const requestUrlMedchal = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict?district_id=596&date=${formattedDate}`;
    const requestUrlHyderabad = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict?district_id=581&date=${formattedDate}`;
    const requestUrlRangareddy = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict?district_id=603&date=${formattedDate}`;
    const [
      medchalCenters,
      hyderabadCenters,
      rangareddyCenters
    ] = await Promise.all([
      axios.get(requestUrlMedchal),
      axios.get(requestUrlHyderabad),
      axios.get(requestUrlRangareddy)
    ]);
    const totalRawCenters = [
      ...medchalCenters.data.centers,
      ...hyderabadCenters.data.centers,
      ...rangareddyCenters.data.centers
    ];
    const filteredCenters = totalRawCenters.filter((center) =>
      centerValidation(center)
    );
    setNearbyCenters(filteredCenters);
  };

  const startSearch = () => {
    start(getCenters);
  };

  return { nearbyCenters, startSearch, stopSearch: stop, looking: inProgress };
}
