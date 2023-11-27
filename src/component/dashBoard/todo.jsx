import { useState, useEffect } from "react";
import "./todo.css";
import { useToast } from "@chakra-ui/toast";
import { Box } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import Button from "../utils/button";
export default function ToDoList({ initialTaskList, onTaskListChange }) {
  const [tasks, setTasks] = useState(initialTaskList || []);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  useEffect(() => {
    setTasks(initialTaskList || []);
  }, [initialTaskList]);
  const addTask = () => {
    if (newTask.trim() !== "") {
      if (editingIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[editingIndex] = newTask;
        setTasks(updatedTasks);
        setEditingIndex(null);
      } else {
        setTasks([...tasks, newTask]);
      }
      setNewTask("");

      onTaskListChange([...tasks, newTask]);
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);

    onTaskListChange(updatedTasks);
  };

  const editTask = (index) => {
    setNewTask(tasks[index]);
    setEditingIndex(index);
  };

  return (
    <>
      <div className="editTaskBar">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          maxLength={50}
        />
        <button onClick={addTask}>
          {editingIndex !== null ? "Save" : "Add"}
        </button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input type="checkbox" onChange={() => deleteTask(index)} />
            <p>{task}</p>
            <button onClick={() => editTask(index)}>Edit</button>
          </li>
        ))}
      </ul>
    </>
  );
}
