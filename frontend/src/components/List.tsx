"use client";
import { Draggable } from "react-beautiful-dnd";
import styles from "../app/page.module.css";

interface ListProps {
  data: List;
  index: number;
}

export interface List {
  id: string;
  title: string;
  description: string;
  status: string;
}
type Status = "pending" | "inprogress" | "completed";

const statusClass: Record<Status, string> = {
  pending: styles.pending,
  inprogress: styles.inprogress,
  completed: styles.completed,
};

export default function List({ data, index }: ListProps) {
  const getStatusClass = (status: string): string => {
    if (status in statusClass) {
      return statusClass[status as Status];
    }
    return "";
  };
  return (
    <Draggable draggableId={data.id} key={data.id} index={index}>
      {(provided) => (
        <div
          className={`${styles.listContainer} ${getStatusClass(data.status)}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div>
            <h1>{data.title}</h1>
            <p>{data.description}</p>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
}
