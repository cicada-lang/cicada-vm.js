import { Exp } from "../exp"
import { Module } from "../module"
import { Net } from "../net"

export class Let extends Exp {
  apply(mod: Module, net: Net): void {
    throw new Error("TODO")
  }
}
