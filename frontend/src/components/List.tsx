"use client";
import { Draggable } from "react-beautiful-dnd";
import styles from "../app/page.module.css";

function bgcolorChange(props: any) {
  return props.isDragging
    ? "lightgreen"
    : props.isDraggable
    ? props.isBacklog
      ? "#F2D7D5"
      : "#DCDCDC"
    : props.isBacklog
    ? "#F2D7D5"
    : "#EAF4FC";
}

interface ListProps {
  data: any;
  index: number;
}

export default function List({ data, index }: ListProps) {
  return (
    <Draggable draggableId={`${data.id}`} key={data.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={styles.listContainer}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          // isDragging={snapshot.isDragging}
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
