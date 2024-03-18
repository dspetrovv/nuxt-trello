export interface ITask {
  id: number;
  description: string;
};

export interface IColumn {
  name: string;
  tasks: ITask[];
};