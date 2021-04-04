interface PollFindQueryBase {
  slug?: string,
}
export interface PollFindQueryDB extends PollFindQueryBase {
  _id?: string,
}

export interface PollFindQuery extends PollFindQueryBase {
  id?: string,
}