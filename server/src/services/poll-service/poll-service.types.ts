import { FindQueryFilter } from 'src/db/types';

export { PollStatus } from 'models/poll';
export interface PollFindQuery extends FindQueryFilter {
  slug?: string,
  createdBy?: string,
}
