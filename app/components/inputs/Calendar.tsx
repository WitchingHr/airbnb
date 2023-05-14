"use client"

import { DateRange, Range, RangeKeyDict } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

// props
interface CalendarProps {
  value: Range;
  disabledDates?: Date[];
  onChange: (value: RangeKeyDict) => void;
}

// calendar component
// displays calendar for selecting reservation dates
const Calendar: React.FC<CalendarProps> = ({
  value,
  disabledDates,
  onChange,
}) => {
  return (
    <DateRange
      rangeColors={["#262626"]} // color of selected date range
      ranges={[value]} // initial date range
      date={new Date()} // initial date
      onChange={onChange} // when date range changes
      direction="vertical" // vertical calendar
      showDateDisplay={false} // hide date display
      minDate={new Date()} // minimum date
      disabledDates={disabledDates} // dates that are already reserved
    />
  );
};

export default Calendar;
