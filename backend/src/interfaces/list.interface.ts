export interface List {
  id: string;
  title: string;
  description: string;
  status: string;
}

export interface ListCreate {
  title: string;
  description: string;
  groupId: string;
}

export interface ListRepository {
  create(data: ListCreate): Promise<List>;
  update(data: List): Promise<List>;
  delete(id: string): Promise<boolean>;
  findById(groupId: string): Promise<List[]>;
}
