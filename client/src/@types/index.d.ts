export interface IProfile {
  id: string,
  firstName: string,
}

export interface IPoll {
  id: string,
  title: string,
  slug: string,
  questions: IQueation[]
}

export interface IQueation {
  id: string,
  title: string,
  answers: IAnswer[]
}

export interface IAnswer {
  id: string,
  title: string,
}
