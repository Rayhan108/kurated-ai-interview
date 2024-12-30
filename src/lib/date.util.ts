import { format } from "date-fns";

export const DateUtil = {
  /**
   * @param date 2023-05-09
   * @returns 09 May 2023
   */
  formatOnlyDate: (date: Date | string, hideYear = false) => {
    return format(new Date(date), `dd MMM ${hideYear ? "" : "yyyy"}`);
  },
  /**
   * @param date 2023-05-09
   * @returns 12/01/2024
   */
};
