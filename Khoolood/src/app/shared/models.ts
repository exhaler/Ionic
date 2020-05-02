export class ApiObject {
  constructor(
    public error: string,
    public session_id: string,
    public data: any
  ) {}
}

export class Obituaries {
  constructor(public type: string, public object: ObituaryObject) {}
}

export class RecentObituary {
  constructor(public type: string, public object: ObituaryObject) {}
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
    public relatives: RelativesObject,
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

export class RelativesObject {
  constructor(
    public brothers: string,
    public children: string,
    public father: string,
    public husband: string,
    public mother: string,
    public relatives: string,
    public sisters: string,
    public wife: string,
  ) {}
}
