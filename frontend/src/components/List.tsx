"use client";
import { Draggable } from "react-beautiful-dnd";
import styles from "../app/page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { List as ListModel, updateList } from "@/services/api";

interface ListProps {
  data: ListModel;
  index: number;
  onDelete: (data: string | undefined) => void;
}

type Status = "pending" | "inprogress" | "completed";

const statusClass: Record<Status, string> = {
  pending: styles.pending,
  inprogress: styles.inprogress,
  completed: styles.completed,
};

export default function List({ data, index, onDelete }: ListProps) {
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const getStatusClass = (status: string): string => {
    if (status in statusClass) {
      return statusClass[status as Status];
    }
    return "";
  };

  useEffect(() => {
    updateList({
      description: description,
      title: title,
      status: data.status,
      id: data.id,
    });
  }, [title, description]);
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
            <textarea
              id={data.id}
              className={styles.card}
              placeholder="Digite um titulo para a tarefa"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <textarea
              id={data.id}
              className={styles.card}
              placeholder="Digite uma descrição para a tarefa"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <button
              className={`${styles.deleteButton}  ${getStatusClass(
                data.status
              )}`}
            >
              <FontAwesomeIcon
                icon={faTrash}
                className={styles.trashIcon}
                onClick={() => {
                  onDelete(data.id);
                }}
              />
            </button>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
}
