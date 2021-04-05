import { FindQueryFilter } from 'src/db/types';

export interface IQuestionFindQuery extends FindQueryFilter {
  title?: string,
}
