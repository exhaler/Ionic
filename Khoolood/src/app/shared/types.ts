export interface RecentObituaryData {
  type: string;
  object: SingleObituaryData;
}

export interface ObituariesData {
  type: string;
  object: SingleObituaryData;
}

export interface SingleObituaryData {
  categoryId: string;
  deathDay: string;
  funeral: FuneralData;
  name: string;
  obituaryId: number;
  photo: string;
}

export interface DetailedObituaryData {
  categoryId: string;
  dateOfDeath: string;
  funerals: FuneralData;
  firstName: string;
  middleName: string;
  lastName: string;
  obituaryId: number;
  photo: string;
}

export interface FuneralData {
  communityId: number;
  funeralDate: string;
  funeralTime: string;
  lat: number;
  long: number;
  place: string;
}
