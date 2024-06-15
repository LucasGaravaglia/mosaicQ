"use client";

import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styles from "../app/page.module.css";
import List from "./List";

interface GroupProps {
  title: string;
  id: string;
  data: any[];
}

export default function Group({ title, id, data = [] }: GroupProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <Droppable droppableId={id}>
        {(provided, snapshot) => {
          return (
            <div
              className={styles.taskList}
              ref={provided.innerRef}
              {...provided.droppableProps}
              // isDraggingOver={snapshot.isDraggingOver}
            >
              {data.map((data, index) => (
                <List
                  index={123}
                  data={{ title: "teste", description: "teste" }}
                />
                // <Card key={index} index={index} task={task} />
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}
