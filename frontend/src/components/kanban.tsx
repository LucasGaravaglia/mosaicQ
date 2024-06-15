"use client";

import { useEffect, useState } from "react";
import styles from "../app/page.module.css";
import { DragDropContext } from "react-beautiful-dnd";
import Group from "./Group";

export interface List {
  id: string;
  title: string;
  description: string;
  status: string;
}
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx1Y2FzIiwidXNlcklkIjoiZjNhZmU0MjYtZjllZC00MzFiLWEyMzUtOTMwNjI5YmNmNmZiIiwiaWF0IjoxNzE4NDIxMzY2LCJleHAiOjE3MTg0MjQ5NjZ9.WTxS2xLIs_7oTR2eGdJb6g_plbD5a7P3Rac5FFffCqA";

export default function Kanban() {
  const [pending, setPending] = useState<List[]>([
    { id: "aaaaaaa", title: "teste", description: "sim", status: "pending" },
  ]);
  const [inProgress, setInProgress] = useState<List[]>([]);
  const [completed, setCompleted] = useState<List[]>([]);

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
      .then((json) => console.info(json));
  }, []);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.info(destination);
    console.info(source);
    console.info(draggableId);
    if (!destination || source.droppableId === destination.droppableId) return;

    deletePreviousState(source.droppableId, draggableId);

    const task = findItemById(draggableId, [
      ...pending,
      ...inProgress,
      ...completed,
    ]);

    setNewState(destination.droppableId, task);
  };

  function deletePreviousState(sourceDroppableId, taskId) {
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
      case "1": // TO DO
        updatedTask = { ...task, completed: false };
        setPending([updatedTask, ...pending]);
        break;
      case "2": // DONE
        updatedTask = { ...task, completed: true };
        setInProgress([updatedTask, ...inProgress]);
        break;
      case "3": // IN REVIEW
        updatedTask = { ...task, completed: false };
        setCompleted([updatedTask, ...completed]);
        break;
    }
  }

  function findItemById(id: string, array: List[]) {
    return array.find((item) => item.id == id);
  }

  function removeItemById(id: string, array: List[]) {
    return array.filter((item) => item.id != id);
  }
  return (
    <DragDropContext
      onDragEnd={(d) => {
        console.info("aaaaaaaaa");
      }}
    >
      <h2>Board</h2>
      <div className={styles.boardContainer}>
        <Group title={"Pendente"} id={"1"} data={pending} />
        <Group title={"Em progresso"} id={"2"} data={inProgress} />
        <Group title={"Completo"} id={"3"} data={completed} />
      </div>
    </DragDropContext>
  );
}
