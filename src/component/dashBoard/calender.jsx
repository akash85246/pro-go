import "./calender.css";
import DashNav from "./dashNavbar";
import Sidebar2 from "./sidebar2";
import "./addMember.css";
import ToDoList from "./todo";
import { useState } from "react";
export default function Calendar() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const startYear = 1960;
  const endYear = 2300;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const handleMonthChange = (newMonth) => {
    setSelectedMonth(newMonth);
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  return (
    <div className="workspaceContainer">
      <Sidebar2 selected="calender" />
      <div className="dashMainContainer">
        <DashNav />
        <div className="calMain">
          <div className="calendarButtons">
            <h2>Calender</h2>
            <button className="calendarButton">Date</button>
            <button className="calendarButton">Month</button>
            <button className="calendarButton">Year</button>
            <button className="calendarButton">Notify Me</button>
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
                  <ToDoList />
                </div>
                <div className="goalContainer">
                  <h3>GOALS</h3>
                  <input type="textarea" maxLength={15} />
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
                      }`}
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
              <input className="notes" type="text" maxLength={80} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
