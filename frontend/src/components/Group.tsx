"use client";

import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styles from "../app/page.module.css";
import List from "./List";

interface GroupProps {
  title: string;
  id: string;
  data: any[];
  add: (data: any) => undefined;
}

export default function Group({ title, id, data = [], add }: GroupProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <button
        id={id}
        type="button"
        className={styles.plusList}
        onClick={(e) => add(e)}
      >
        <h1>+</h1>
      </button>
      <Droppable droppableId={id}>
        {(provided, snapshot) => {
          return (
            <div
              className={styles.taskList}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {data.map((dt, index) => {
                return <List key={dt.id} index={index} data={dt} />;
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}
