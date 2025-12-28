import { returnTypesafeAutowired } from "../../../src/index";
import { BeanNames } from "./BeanConfig";

export const { Autowired } = returnTypesafeAutowired<keyof BeanNames>()