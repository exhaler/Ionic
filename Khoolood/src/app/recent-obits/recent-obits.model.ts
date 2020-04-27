export class RecentObituary {
    constructor(
        public type: string,
        public object: ObituaryObject
    ) {}
}

export class ObituaryObject {
    constructor (
        public categoryId: string,
        public deathDay: string,
        public funeral: object,
        public name: string,
        public obituaryId: number,
        public photo: string,
    ) {}
}