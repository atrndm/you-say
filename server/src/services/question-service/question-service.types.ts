import { FindQueryFilter } from 'src/db/types';

export interface QuestionFindQuery extends FindQueryFilter {
  title?: string,
}
