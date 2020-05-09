export class ApiObject {
  constructor(
    public error: string,
    public session_id: string,
    public data: any
  ) {}
}

export class Feed {
  constructor(
    public type: string,
    public object: ReactionObject | ObituaryObject
  ) {}
}

export class Obituaries {
  constructor(public type: string, public object: ObituaryObject) {}
}

export class RecentObituary {
  constructor(public type: string, public object: ObituaryObject) {}
}

export class ReactionObject {
  constructor(
    public actionId: string,
    public obituaryId: string,
    public categoryId: string,
    public timestamp: string,
    public userName: string,
    public userPhoto: string,
    public deceasedName: string,
    public thanked: string,
    public community: CommunityObject,
    public obituarySponsorId: string
  ) {}
}

export class ObituaryObject {
  constructor(
    public categoryId: string,
    public deathDay: string,
    public funeral: FuneralObject,
    public name: string,
    public obituaryId: number,
    public photo: string
  ) {}
}

export class DetailedObituaryObject {
  constructor(
    public categoryId: string,
    public dateOfDeath: string,
    public firstName: string,
    public middleName: string,
    public lastName: string,
    public obituaryId: number,
    public photo: string,
    public contents: string,
    public funerals: FuneralObject,
    public relatives: RelativesObject
  ) {}
}

export class FuneralObject {
  constructor(
    public communityId: number,
    public funeralDate: string,
    public funeralTime: string,
    public lat: number,
    public long: number,
    public place: string
  ) {}
}

export class CommunityObject {
  constructor(
    public id: number,
    public name_en: string,
    public place: number,
    public membersCount: string,
    public image: string,
    public type?: string,
    public lat?: string,
    public long?: string
  ) {}
}

export class RelativesObject {
  constructor(
    public brothers: string,
    public children: string,
    public father: string,
    public husband: string,
    public mother: string,
    public relatives: string,
    public sisters: string,
    public wife: string
  ) {}
}

export class User {
  constructor(
    public userId: string,
    public displayName: string,
    public email: string,
    public _token: string
  ) {}

  get token() {
    if (!this._token) {
      return null;
    } else {
      return this._token;
    }
  }
}
