
export interface Katana {
  readonly damage: number;
}

export class KatanaImpl implements Katana {
  public static creationCount = 0;

  constructor() {
    KatanaImpl.creationCount++;
  }

  public readonly damage: number = 10;
}