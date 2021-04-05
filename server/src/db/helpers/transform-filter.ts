import { FindQueryFilter, FindQueryFilterDB } from 'src/db/types';

const transformFilter = (filter:FindQueryFilter): FindQueryFilterDB => {
  const dupFilter:FindQueryFilter = { ...filter };
  const dbFilter:FindQueryFilterDB = {};

  if (dupFilter.id) {
    dbFilter._id = dupFilter.id;
    delete dupFilter.id;
  }

  return {
    ...dupFilter,
    ...dbFilter,
  };
}

export default transformFilter;
