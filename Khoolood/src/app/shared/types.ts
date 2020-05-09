export interface ApiData {
  error: string;
  session_id: string;
  data: any;
  message?: string;
}

export interface RecentObituaryData extends ApiData {
  type: string;
  object: SingleObituaryData;
}

export interface ObituariesData extends ApiData {
  type: string;
  object: SingleObituaryData;
}

export interface FeedData extends ApiData {
  type: string;
  object: ReactionData | SingleObituaryData;
}

export interface ReactionData extends ApiData {
  actionId: string;
  obituaryId: string;
  categoryId: string;
  timestamp: string;
  userName: string;
  userPhoto: string;
  deceasedName: string;
  thanked: string;
  community: CommunityData;
  obituarySponsorId: string;
}

export interface CommunityData extends ApiData {
  id: number;
  name_en: string;
  place: number;
  membersCount: string;
  image: string;
  type?: string;
  lat?: string;
  long?: string;
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
  contents: string;
  relatives: RelativesData;
}

export interface FuneralData extends ApiData {
  communityId: number;
  funeralDate: string;
  funeralTime: string;
  lat: number;
  long: number;
  place: string;
}

export interface RelativesData extends ApiData {
  brothers: string;
  children: string;
  father: string;
  husband: string;
  mother: string;
  relatives: string;
  sisters: string;
  wife: string;
}

export interface AuthResponseData extends ApiData {
  userId: string;
  displayName: string;
  email: string;
  _token: string;
}
