export interface List {
  id?: string;
  title: string;
  description: string;
  status: string;
}
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikx1Y2FzIiwidXNlcklkIjoiOTJkMTBlNTgtOTAwNi00YmMwLTkzZDItMDQ2NDFjNWZiMmIzIiwiaWF0IjoxNzE4NDY5MDcwLCJleHAiOjIwNzg0NjkwNzB9.NDtAjXLifVMnjEDJw-iFHhSeh0q55kzvFs6xv0RMyOo";

export const updateList = (data: List) => {
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

export const findList = async (): Promise<List[]> => {
  return fetch("http://localhost:3333/list/find", {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Basic ${token}`,
      Accept: "*/*",
    },
  })
    .then((response) => response.json())
    .then((json: List[]) => {
      return json;
    });
};

export const deleteList = (data: string | undefined) => {
  fetch(`http://localhost:3333/list/delete/${data}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Basic ${token}`,
      Accept: "*/*",
    },
  });
};

export const createList = async (data: List): Promise<string> => {
  return fetch("http://localhost:3333/list/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Basic ${token}`,
      Accept: "*/*",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json: any) => {
      return json.listId;
    });
};

export const Authantication = async (username: string, password: string) => {
  return fetch("http://localhost:3333/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "*/*",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((d) => {
      token = d.token;
      return token;
    });
};
