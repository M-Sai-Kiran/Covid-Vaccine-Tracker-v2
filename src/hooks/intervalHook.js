import { useState } from "react";

export function useInterval(gap) {
  let [searchObj, setSearchObj] = useState(0);

  const start = (fn) => {
    setSearchObj(setInterval(fn, gap));
  };

  const stop = () => {
    clearInterval(searchObj);
    setSearchObj(0);
  };

  return { start, inProgress: searchObj > 0, stop };
}
