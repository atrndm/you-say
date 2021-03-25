export enum PollStatus {
  draft,
  active,
  completed,
}

export interface PollModel {
  title: string,
  status: PollStatus,
  slug: string,
}
