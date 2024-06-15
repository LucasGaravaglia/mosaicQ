"use client";

import { useEffect, useState } from "react";
import styles from "../app/page.module.css";
import { DragDropContext } from "react-beautiful-dnd";
import Group from "./Group";
import { List } from "./List";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx1Y2FzIiwidXNlcklkIjoiZjNhZmU0MjYtZjllZC00MzFiLWEyMzUtOTMwNjI5YmNmNmZiIiwiaWF0IjoxNzE4NDYwODk5LCJleHAiOjE3MTg0NjQ0OTl9.E2NmI3jrqc8k3emWeSKoXefUWoI2-5IiZcSujQy8D5g";

export default function Kanban() {
  const [pending, setPending] = useState<List[]>([]);
  const [inProgress, setInProgress] = useState<List[]>([]);
  const [completed, setCompleted] = useState<List[]>([]);

  const updateList = (data: List) => {
    fetch("http://localhost:3333/list/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Basic ${token}`,
        Accept: "*/*",
      },
      body: JSON.stringify(data),
    });
  };

  useEffect(() => {
    fetch(
      "http://localhost:3333/list/findBy/e26780e0-8844-4c91-bb3b-54d84cf369fe",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Basic ${token}`,
          Accept: "*/*",
        },
      }
    )
      .then((response) => response.json())
      .then((json: List[]) => {
        setPending(json.filter((d) => d.status == "pending"));
        setInProgress(json.filter((d) => d.status == "inprogress"));
        setCompleted(json.filter((d) => d.status == "completed"));
      });
  }, []);

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;

    deletePreviousState(source.droppableId, draggableId);
    const task = findItemById(draggableId, [
      ...pending,
      ...inProgress,
      ...completed,
    ]);

    setNewState(destination.droppableId, task);
  };

  function deletePreviousState(sourceDroppableId: any, taskId: any) {
    switch (sourceDroppableId) {
      case "1":
        setPending(removeItemById(taskId, pending));
        break;
      case "2":
        setInProgress(removeItemById(taskId, inProgress));
        break;
      case "3":
        setCompleted(removeItemById(taskId, completed));
        break;
    }
  }

  function setNewState(destinationDroppableId: any, task: any) {
    let updatedTask;
    switch (destinationDroppableId) {
      case "1":
        updatedTask = { ...task, status: "pending" };
        console.info(updatedTask);
        setPending([updatedTask, ...pending]);
        break;
      case "2":
        updatedTask = { ...task, status: "inprogress" };
        console.info(updatedTask);
        setInProgress([updatedTask, ...inProgress]);
        break;
      case "3":
        updatedTask = { ...task, status: "completed" };
        console.info(updatedTask);
        setCompleted([updatedTask, ...completed]);
        break;
    }
    updateList(updatedTask);
  }

  function findItemById(id: string, array: List[]) {
    return array.find((item) => item.id == id);
  }

  function removeItemById(id: string, array: List[]) {
    return array.filter((item) => item.id != id);
  }
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h2>Board</h2>
      <div className={styles.boardContainer}>
        <Group
          title={"Pendente"}
          id={"1"}
          data={pending}
          add={(d) => {
            console.info(d);
          }}
        />
        <Group
          title={"Em progresso"}
          id={"2"}
          data={inProgress}
          add={(d) => {
            console.info(d);
          }}
        />
        <Group
          title={"Completo"}
          id={"3"}
          data={completed}
          add={(d) => {
            console.info(d);
          }}
        />
      </div>
    </DragDropContext>
  );
}
