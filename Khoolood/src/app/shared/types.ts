export interface ApiData {
  error: string;
  session_id: string;
  data: any;
}

export interface RecentObituaryData extends ApiData {
  type: string;
  object: SingleObituaryData;
}

export interface ObituariesData extends ApiData {
  type: string;
  object: SingleObituaryData;
}

export interface SingleObituaryData extends ApiData {
  categoryId: string;
  deathDay: string;
  funeral: FuneralData;
  name: string;
  obituaryId: number;
  photo: string;
}

export interface DetailedObituaryData extends ApiData {
  categoryId: string;
  dateOfDeath: string;
  funerals: FuneralData;
  firstName: string;
  middleName: string;
  lastName: string;
  obituaryId: number;
  photo: string;
}

export interface FuneralData extends ApiData {
  communityId: number;
  funeralDate: string;
  funeralTime: string;
  lat: number;
  long: number;
  place: string;
}
