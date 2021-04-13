import { FindQueryFilter } from 'src/db/types';
export interface PollFindQuery extends FindQueryFilter {
  slug?: string,
  createdBy?: string,
}