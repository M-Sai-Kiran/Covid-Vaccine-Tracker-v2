import { centerBlocks } from "./constants";
export const centerValidation = (center) => {
  // if (!centerBlocks.includes(center.block_name)) return false;
  if (center.fee_type !== "Paid") return false;
  if (
    center.sessions.some(
      (session) =>
        session.available_capacity_dose1 > 0 && session.min_age_limit === 18
      //&& session.vaccine === ("COVAXIN" || "Sputnik")
    )
  )
    return true;
};
