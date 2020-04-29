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
    public funerals: FuneralObject,
    public firstName: string,
    public obituaryId: number,
    public photo: string
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


