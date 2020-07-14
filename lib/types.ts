export interface Task {
  id: string;
  title: string;
  description: string;
}

export interface Team {
  id: string;
  name: string;
}

export interface TaskAccomplishment {
  id: string;
  task: Task;
  team: Team;
  answer: string;
}

enum StartOrEnd {
  START,
  END,
}

export interface Time {
  id: string;
  team: Team;
  type: StartOrEnd;
  time: string;
}
