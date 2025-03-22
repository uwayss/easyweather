import React, { useState } from "react";
import HomeScreen from "./src/screens/Home";
import DayDetails from "./src/screens/DayDetails";

export default function App() {
  const [isDayDetailsVisible, setIsDayDetailsVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const showDayDetails = (date: string) => {
    setSelectedDate(date);
    setIsDayDetailsVisible(true);
  };

  const hideDayDetails = () => {
    setIsDayDetailsVisible(false);
    setSelectedDate(null);
  };

  return (
    <>
      {!isDayDetailsVisible ? (
        <HomeScreen onDayPress={showDayDetails} /> // Pass callback to HomeScreen
      ) : (
        <DayDetails date={selectedDate} onClose={hideDayDetails} /> // Pass date and close callback to DayDetails
      )}
    </>
  );
}
