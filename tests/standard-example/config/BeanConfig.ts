import { Newable } from "inversify";
import { Katana, KatanaImpl } from "../Katana";
import { Ninja, NinjaImpl } from "../Ninja";

// Map types to strings to implement typesafety.
export type BeanNames = {
  "Ninja": Ninja;
  "Katana": Katana;
};

// Since TypeScript type information is removed at runtime, interfaces cannot be used directly at runtime.
// Components cannot be injected by interface, so mapping names to implementations is necessary to inject by name.
// We enforce valid mappings using the Record type declaration so that omitting an implementation for a name causes a type error.
export const beanConfig = {
  "Ninja": NinjaImpl,
  "Katana": KatanaImpl,
} satisfies Record<keyof BeanNames, Newable<unknown>>;