import { FindQueryFilter } from 'src/db/types';

export interface IAnswerFindQuery extends FindQueryFilter {
  title?: object,
}