import { Def } from "../def"
import { Module } from "../module"
import { Net } from "../net"

export class Rule {
  constructor(
    public mod: Module,
    public disconnect: [string, string],
    public defs: Array<Def>
  ) {}

  // NOTE Do side effect on net.
  reconnect(net: Net): void {
    for (const def of this.defs) {
      def.execute(net)
    }
  }
}
