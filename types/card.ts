export interface ITask {
  id: number;
  text: string;
};

interface IColumnCardProps {
  name: string;
};

export interface IColumn {
  name: string;
  tasks: ITask[];
};