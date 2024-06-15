"use client";

import { useEffect, useState } from "react";
import styles from "../app/page.module.css";
import { DragDropContext } from "react-beautiful-dnd";
import Group from "./Group";
import {
  Authantication,
  List,
  createList,
  deleteList,
  findList,
  updateList,
} from "@/services/api";

export default function Kanban() {
  const [pending, setPending] = useState<List[]>([]);
  const [inProgress, setInProgress] = useState<List[]>([]);
  const [completed, setCompleted] = useState<List[]>([]);
  const [username, setUsername] = useState("Lucas");
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("123456");

  const handleUpdateKanban = () => {
    findList().then((json: List[]) => {
      setPending(json.filter((d) => d.status == "pending"));
      setInProgress(json.filter((d) => d.status == "inprogress"));
      setCompleted(json.filter((d) => d.status == "completed"));
    });
  };

  const handleAuth = async () => {
    Authantication(username, password).then(async () => {
      await handleUpdateKanban();
      setOpen(true);
    });
  };

  useEffect(() => {
    handleUpdateKanban();
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

  function deletePreviousState(sourceDroppableId: string, taskId: string) {
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

  function setNewState(destinationDroppableId: any, task: List | undefined) {
    if (!task) return;
    let updatedTask: List | undefined;
    switch (destinationDroppableId) {
      case "1":
        updatedTask = { ...task, status: "pending" };
        setPending([updatedTask, ...pending]);
        break;
      case "2":
        updatedTask = { ...task, status: "inprogress" };
        setInProgress([updatedTask, ...inProgress]);
        break;
      case "3":
        updatedTask = { ...task, status: "completed" };
        setCompleted([updatedTask, ...completed]);
        break;
    }
    if (!!updatedTask) {
      updateList(updatedTask);
    }
  }

  function findItemById(id: string, array: List[]) {
    return array.find((item) => item.id == id);
  }

  function removeItemById(id: string, array: List[]) {
    return array.filter((item) => item.id != id);
  }

  const handleAdd = async (e: string) => {
    let updatedTask: List;
    switch (e) {
      case "1":
        updatedTask = { description: "", title: "", status: "pending" };
        let temp1 = await createList(updatedTask);
        setPending([{ ...updatedTask, id: temp1 }, ...pending]);
        break;
      case "2":
        updatedTask = { description: "", title: "", status: "inprogress" };
        let temp2 = await createList(updatedTask);
        setInProgress([{ ...updatedTask, id: temp2 }, ...inProgress]);
        break;
      case "3":
        updatedTask = { description: "", title: "", status: "completed" };
        let temp3 = await createList(updatedTask);
        setCompleted([{ ...updatedTask, id: temp3 }, ...completed]);
        break;
    }
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={styles.loginContainer}>
        <h3>Cadastrar / Login</h3>
        <input
          className={styles.card}
          placeholder="Digite o Login"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          className={styles.card}
          placeholder="Digite a senha"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          onClick={() => {
            handleAuth();
          }}
        >
          Autenticar
        </button>
      </div>
      {open && (
        <>
          <h2>Board</h2>
          <div className={styles.boardContainer}>
            <Group
              title={"Pendente"}
              id={"1"}
              data={pending}
              add={(d) => {
                handleAdd(d);
              }}
              onDelete={(data) => {
                if (data != undefined) {
                  setPending(pending.filter((d) => d.id !== data));
                  deleteList(data);
                }
              }}
            />
            <Group
              title={"Em progresso"}
              id={"2"}
              data={inProgress}
              add={(d) => {
                handleAdd(d);
              }}
              onDelete={(data) => {
                if (data != undefined) {
                  setInProgress(inProgress.filter((d) => d.id !== data));
                  deleteList(data);
                }
              }}
            />
            <Group
              title={"Completo"}
              id={"3"}
              data={completed}
              add={(d) => {
                handleAdd(d);
              }}
              onDelete={(data) => {
                if (data != undefined) {
                  setCompleted(completed.filter((d) => d.id !== data));
                  deleteList(data);
                }
              }}
            />
          </div>
        </>
      )}
    </DragDropContext>
  );
}
