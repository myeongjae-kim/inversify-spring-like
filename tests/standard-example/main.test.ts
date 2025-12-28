import { afterEach, describe, expect, it } from "vitest";
import { ApplicationContext } from "../../src";
import { beanConfig } from "./config/BeanConfig";
import { KatanaImpl } from "./Katana";
import { NinjaImpl } from "./Ninja";

describe("Standard Example Test", () => {
  afterEach(() => {
    KatanaImpl.creationCount = 0;
    NinjaImpl.creationCount = 0;
  })

  it("should create bean as singleton", () => {
    const applicationContext = new ApplicationContext(beanConfig);

    for (let i = 0; i < 2; i++) {
      expect(applicationContext.getBean("Ninja").katana.damage).toBe(10);
    }

    // Check if the bean is created only once.
    expect(KatanaImpl.creationCount).toBe(1);
    expect(NinjaImpl.creationCount).toBe(1);
  })

  it("should create bean according to options", () => {
    const applicationContext = new ApplicationContext(beanConfig, { defaultScope: "Request" });

    const times = 2;
    for (let i = 0; i < times; i++) {
      expect(applicationContext.getBean("Ninja").katana.damage).toBe(10);
    }

    // Check if the bean is created only once.
    expect(KatanaImpl.creationCount).toBe(times);
    expect(NinjaImpl.creationCount).toBe(times);
  })
})