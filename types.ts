export interface Module {
  id: string;
  name: string;
  description: string;
  speakers: string;
  maxStudents: string;
  color: string;
}

export interface DraggedItem {
  moduleId: string;
  sourceCellId: string;
}

export interface SelectedModuleInfo {
  id: string;
  cellId: string;
}
