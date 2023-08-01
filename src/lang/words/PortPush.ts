import { Net } from "../graph"
import { findPortInActiveEdge } from "../graph/findPortInActiveEdge"
import { Mod } from "../mod"
import { disconnect } from "../run/disconnect"
import { Span } from "../span"
import { Word, WordOptions } from "../word"

export class PortPush implements Word {
  constructor(
    public nodeName: string,
    public portName: string,
    public span: Span,
  ) {}

  compose(mod: Mod, net: Net, options?: WordOptions): void {
    const { activeEdge } = options || {}

    if (activeEdge === undefined) {
      throw new Error(`[PortPush.compose] expect current activeEdge`)
    }

    const found = findPortInActiveEdge(this.nodeName, this.portName, activeEdge)

    if (found === undefined) {
      throw new Error(
        `[PortPush.compose] can not find port: ${this.portName} in active edge`,
      )
    }

    if (found.connection === undefined) {
      throw new Error(
        `[PortPush.compose] I expect the found port to have connection`,
      )
    }

    disconnect(net, found.connection.edge)

    net.ports.push(found)
  }
}
