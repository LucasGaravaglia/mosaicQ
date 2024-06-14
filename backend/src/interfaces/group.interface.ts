export interface GroupList {
  id: string;
  title: string;
}

export interface GroupListCreate {
  title: string;
  userId: string;
}

export interface GroupListRepository {
  create(data: GroupListCreate): Promise<GroupList>;
  delete(id: string): Promise<boolean>;
  update(data: GroupList): Promise<GroupList>;
  findAll(userId: string): Promise<GroupList[]>;
}
