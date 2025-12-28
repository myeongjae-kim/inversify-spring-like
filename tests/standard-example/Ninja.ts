import type { Katana } from "./Katana.js";
import { Autowired } from "./config/Autowired";

export interface Ninja {
  katana: Katana
}

export class NinjaImpl implements Ninja {
  public static creationCount = 0;

  constructor(
    @Autowired("Katana")
    public readonly katana: Katana,
  ) {
    NinjaImpl.creationCount++;
  }
}