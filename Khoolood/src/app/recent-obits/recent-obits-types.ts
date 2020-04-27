export interface RecentObituaryData {
  type: string;
  object: SingleObituaryData;
}

export interface SingleObituaryData {
  categoryId: string;
  deathDay: string;
  funeral: object;
  name: string;
  obituaryId: number;
  photo: string;
}
