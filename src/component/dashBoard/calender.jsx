import "./calender.css";
import DashNav from "./dashNavbar";
import Sidebar2 from "./sidebar2";
import "./addMember.css";
import ToDoList from "./todo";
import { useState } from "react";
import { useToast } from "@chakra-ui/toast";
import { Box } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import { useAuth } from "../utils/authContext";
import axios from "axios";

export default function Calendar() {
  const { authToken, setAuthToken } = useAuth();
  const toast = useToast();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const startYear = 1960;
  const endYear = 2300;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedDate, setSelectedDate] = useState(null);
  const [taskList, setTaskList] = useState([]);
  const handleTaskListChange = (newTaskList) => {
    setTaskList(newTaskList);
  };
  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const [goal, setGoal] = useState("");
  const [note, setNote] = useState("");
  const handleMonthChange = (newMonth) => {
    setSelectedMonth(newMonth);
    // setSelectedDate(null);
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
    // setSelectedDate(null);
  };

  const handleDateChange = (selectedDate) => {
    setSelectedDate(selectedDate);
    receivePlannerData();
    console.log(
      `Selected Date: ${selectedYear}-${selectedMonth + 1}-${selectedDate}`
    );
  };
  const handleNotifyMe = () => {
    const dateInput = document.querySelector(
      ".calendarButton[placeholder='Date']"
    );
    const monthInput = document.querySelector(
      ".calendarButton[placeholder='Month']"
    );
    const yearInput = document.querySelector(
      ".calendarButton[placeholder='Year']"
    );

    const enteredDate = parseInt(dateInput.value);
    const enteredMonth = parseInt(monthInput.value) - 1;
    const enteredYear = parseInt(yearInput.value);
    if (
      enteredDate >= 1 &&
      enteredDate <= daysInMonth &&
      enteredMonth >= 0 &&
      enteredMonth <= 11 &&
      enteredYear >= 1960 &&
      enteredYear <= 2600
    ) {
      setSelectedDate(enteredDate);
      setSelectedMonth(enteredMonth);
      setSelectedYear(enteredYear);

      console.log(
        `Selected Date: ${enteredYear}-${enteredMonth + 1}-${enteredDate}`
      );
      receivePlannerData();
      sendPlannerData();
    } else {
      toast({
        title: "Error Notification!",
        description: "An error occurred",
        status: "error",
        position: "top-centre",
        duration: 3000,
        isClosable: true,
        render: () => (
          <Box p={3} color="white" bg="red.500" borderRadius="md">
            <WarningIcon mr={3} />
            {"Invalid Date"}
          </Box>
        ),
      });
      console.log("Invalid date, month, or year entered");
    }
  };
  const handleGoalChange = (event) => {
    setGoal(event.target.value);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };
  const sendPlannerData = async () => {
    const apiUrl = "https://pro-go.onrender.com/api/planner/add";

    try {
      const response = await axios.post(
        apiUrl,
        {
          date: `${selectedDate}-${selectedMonth + 1}-${selectedYear}`,
          taskList: taskList,
          goals: goal,
          note: note,
        },
        {
          headers: {
            "auth-token": authToken,
          },
        }
      );
      console.log(selectedDate, selectedMonth + 1, selectedYear);
      if (response.status === 201) {
        setSelectedMonth(null);
        setSelectedYear(null);
        setSelectedDate(null);

        console.log("Planner data added successfully:", response.data);
      } else {
        console.error("Failed to add planner data:", response.data);
      }
    } catch (error) {
      console.error("Error while making API call:", error);
    }
  };
  const receivePlannerData = async () => {
    // const apiUrl = "https://pro-go.onrender.com/api/planner/";
    const formattedDate = `${selectedDate}-${
      selectedMonth + 1
    }-${selectedYear}`;
    const apiUrl = `https://pro-go.onrender.com/api/planner/${formattedDate}`;
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "auth-token": authToken,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="workspaceContainer">
      <Sidebar2 selected="calender" />
      <div className="dashMainContainer">
        <DashNav />
        <div className="calMain">
          <div className="calendarButtons">
            <h2>Calender</h2>
            <input
              type="number"
              className="calendarButton"
              placeholder="Date"
            ></input>
            <input
              className="calendarButton"
              placeholder="Month"
              type="number"
              max={12}
              min={1}
            ></input>
            <input
              className="calendarButton"
              placeholder="Year"
              type="number"
              min={1960}
              max={2600}
              pattern="\d{4}"
            ></input>

            <button className="calendarButton" onClick={handleNotifyMe}>
              Notify Me
            </button>
          </div>
          <div className="calendarContainer">
            <div>
              <div>
                <h3>
                  Year{" "}
                  <span>
                    <select
                      onChange={handleYearChange}
                      value={selectedYear || 2023}
                    >
                      {Array.from(
                        { length: endYear - startYear + 1 },
                        (_, i) => (
                          <option key={i} value={startYear + i}>
                            {startYear + i}
                          </option>
                        )
                      )}
                    </select>
                  </span>
                </h3>
              </div>
              <div>
                <ul>
                  {Array.from({ length: 6 }, (_, i) => (
                    <li key={i} onClick={() => handleMonthChange(i)}>
                      {new Date(2023, i, 1).toLocaleString("default", {
                        month: "short",
                      })}
                    </li>
                  ))}
                </ul>
                <ul>
                  {Array.from({ length: 6 }, (_, i) => (
                    <li key={i} onClick={() => handleMonthChange(i + 6)}>
                      {new Date(2023, i + 6, 1).toLocaleString("default", {
                        month: "short",
                      })}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div>
                <h1>Monthly </h1>
                <h1>Planner</h1>
                <h4>TO DO LIST</h4>
                <div className="toDoList">
                  <ToDoList onTaskListChange={handleTaskListChange} />
                </div>
                <div className="goalContainer">
                  <h3>GOALS</h3>
                  <textarea
                    type="textarea"
                    maxLength={200}
                    style={{ height: "9rem", width: "20vw", resize: "none" }}
                    value={goal}
                    onChange={handleGoalChange}
                  />
                </div>
              </div>
              <div>
                <div className="daysOfWeek">
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                  <div className="sundayName">Sun</div>
                </div>
                <div className="calendarGrid">
                  {[...Array(firstDay)].map((_, index) => (
                    <div key={index} className="calendarDay"></div>
                  ))}

                  {daysArray.map((day) => (
                    <div
                      key={day}
                      className={`calendarDay ${
                        (day + firstDay) % 7 === 0 ? "sunday" : ""
                      } ${day === selectedDate ? "selectedDate" : ""}`}
                      onClick={() => handleDateChange(day)}
                    >
                      {day}
                      <input type="checkbox"></input>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="notesContainer">
              <label>Notes</label>
              <input
                className="notes"
                type="text"
                maxLength={80}
                value={note}
                onChange={handleNoteChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
