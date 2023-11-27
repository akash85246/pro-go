import "./calender.css";
import DashNav from "./dashNavbar";

import "./addMember.css";
import ToDoList from "./todo";
import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/toast";
import { Box } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import { useAuth } from "../utils/authContext";
import axios from "axios";
import Sidebar from "./sidebar";

import Button from "../utils/button";
export default function Calendar() {
  const { authToken, setAuthToken } = useAuth();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const startYear = 1960;
  const endYear = 2300;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [date, setdate] = useState();
  const [taskList, setTaskList] = useState([]);
  const handleTaskListChange = (newTaskList) => {
    setTaskList(newTaskList);
  };
  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const [goal, setGoal] = useState("");
  const [plannerId, setPlannerId] = useState("");
  const [note, setNote] = useState("");
  const handleMonthChange = (newMonth) => {
    setSelectedMonth(newMonth);
    // setSelectedDate(null);
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
    // setSelectedDate(null);
  };

  const handleDateChange = (event) => {
    const newDate = parseInt(event.currentTarget.textContent, 10);
    setSelectedDate(newDate);
    // console.log(newDate);
    receivePlannerData();
    setdate(`${newDate}-${selectedMonth + 1}-${selectedYear}`);
    // console.log("Selected Date:", date);
  };

  useEffect(() => {
    console.log("Selected Date:", date);
  }, [date]);
  const handleNotifyMe = () => {
    if (
      selectedDate >= 1 &&
      selectedDate <= daysInMonth &&
      selectedMonth >= 0 &&
      selectedMonth <= 11 &&
      selectedYear >= 1960 &&
      selectedYear <= 2600
    ) {
      sendPlannerData();
      receivePlannerData();
    } else {
      toast({
        title: "Error Notification!",
        description: "Invalid Date",
        status: "error",
        position: "top-center",
        duration: 3000,
        isClosable: true,
        render: () => (
          <Box p={3} color="white" bg="red.500" borderRadius="md">
            <WarningIcon mr={3} />
            {"Invalid Date"}
          </Box>
        ),
      });
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
    setLoading(true);
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
      // console.log(selectedDate, selectedMonth + 1, selectedYear);
      // console.log(note);
      toast({
        title: "Success",
        description: "Planner added successfully!",
        status: "success",
        position: "top-center",
        duration: 3000,
        isClosable: true,
      });
      if (response.status === 201) {
        console.log("Planner data added successfully:", response.data.data._id);
        setPlannerId(response.data.data._id);
      } else {
        console.error("Failed to add planner data:", response.data);
      }
    } catch (error) {
      toast({
        title: "Success",
        description: "Planner not added!",
        status: "success",
        position: "top-center",
        duration: 3000,
        isClosable: true,
      });
      setGoal("");
      setNote("");
      setTaskList([]);
      console.error("Error while making API call:", error);
    } finally {
      setLoading(false);
    }
  };
  const receivePlannerData = async () => {
    // const apiUrl = "https://pro-go.onrender.com/api/planner/";
    const formattedDate = date;
    const apiUrl = `https://pro-go.onrender.com/api/planner/${formattedDate}`;
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "auth-token": authToken,
        },
      });

      const responseData = response.data.data;

      const receivedTaskList = responseData.taskList || [];

      setTaskList(receivedTaskList);
      setGoal(responseData.goals);
      setNote(responseData.note);
    } catch (error) {
      setGoal("");
      setNote("");
      setTaskList([]);

      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    receivePlannerData();
  }, [date]);

  const updatePlannerData = async () => {
    const apiUrl = `https://pro-go.onrender.com/api/planner/${date}/update`;

    try {
      const response = await axios.patch(
        apiUrl,
        {
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

      console.log("Planner data updated successfully:", response.data);
    } catch (error) {
      // console.error("Error while updating planner data:", error);
    }
  };
  useEffect(() => {
    updatePlannerData();
  }, [taskList, goal, note]);
  const handleDelete = async () => {
    try {
      const apiUrl = `https://pro-go.onrender.com/api/planner/${date}/delete`;

      const response = await axios.delete(apiUrl, {
        headers: {
          "auth-token": authToken,
        },
      });

      if (response.status === 200 && response.data.success) {
        console.log(response);
        toast({
          title: "Success",
          description: "Planner deleted successfully!",
          status: "success",
          position: "top-center",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete planner",
          status: "error",
          position: "top-center",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error while deleting planner:", error);
    }
  };
  return (
    <div className="workspaceContainer">
      <Sidebar />
      <div className="dashMainContainer">
        <DashNav />
        <div className="calMain">
          <div className="calendarButtons">
            <h2>Calender</h2>
            <input
              type="number"
              className="calendarButton"
              onChange={(e) => setSelectedDate(e.target.value)}
              placeholder="Date"
            ></input>

            <input
              type="number"
              className="calendarButton"
              placeholder="Month"
              onChange={(e) => setSelectedMonth(e.target.value - 1)}
              max={12}
              min={1}
            ></input>

            <input
              type="number"
              className="calendarButton"
              placeholder="Year"
              onChange={(e) => setSelectedYear(e.target.value)}
              min={1960}
              max={2600}
              pattern="\d{4}"
            ></input>

            <button className="calendarButton" onClick={handleNotifyMe}>
              Notify Me
            </button>
            <button className="calendarButton" onClick={handleDelete}>
              Delete
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
                  <ToDoList
                    initialTaskList={taskList}
                    onTaskListChange={handleTaskListChange}
                  />
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
                      onClick={(event) => handleDateChange(event)}
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
