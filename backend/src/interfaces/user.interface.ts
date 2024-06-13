export interface User {
  id: string;
  name: string;
  password: string;
}

export interface UserCreate {
  name: string;
  password: string;
}

export interface UserRepository {
  create(data: UserCreate): Promise<User>;
  authantication(name: string, password: string): Promise<string>;
  delete(name: string, password: string): Promise<boolean>;
}
