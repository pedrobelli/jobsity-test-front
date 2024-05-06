import { Status } from "../enums/status";

export class Task {
  id: number;
  title: string;
  status: Status;
  selected?: boolean;
}
