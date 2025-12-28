import { Container, ContainerOptions, inject, Newable } from "inversify";

export const returnTypesafeAutowired = <T extends string>() => ({
  Autowired: (beanName: T) => inject(beanName)
});

export class ApplicationContext<Config extends Record<string, Newable<unknown>>> {
  private container: Container;

  /**
   * @param beanConfig Bean Configuration
   * @param options Container Options. default: { defaultScope: "Singleton" }
   * 
   * @example
   * ```typescript
   * const beanConfig = {
   *   userService: UserService,
   * }
   * // Explicit second parameter when you need to change default options.
   * const context = new ApplicationContext(beanConfig); 
   * ```
   */
  constructor(beanConfig: Config, options?: ContainerOptions) {
    // Singleton is default of Spring
    const defaultOptions: Pick<ContainerOptions, "defaultScope"> = {
      defaultScope: "Singleton"
    }

    this.container = new Container({ ...defaultOptions, ...options });

    Object.entries(beanConfig).forEach(([name, service]) => {
      this.container.bind(name).to(service);
    });
  }

  public get<T extends keyof Config>(beanName: T): InstanceType<Config[T]> {
    return this.container.get(beanName as string);
  }
}