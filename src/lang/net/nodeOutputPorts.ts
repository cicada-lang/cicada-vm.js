import { Node } from "../node"
import { Port } from "../port"
import { Net } from "./Net"
import { findNodePortEntriesOrFail } from "./findNodePortEntriesOrFail"

export function nodeOutputPorts(net: Net, node: Node): Array<Port> {
  const portEntries = findNodePortEntriesOrFail(net, node)
  return Object.values(portEntries)
    .filter(({ sign }) => sign === 1)
    .map((portEntry) => ({
      "@type": "Value",
      "@kind": "Port",
      node,
      name: portEntry.name,
      sign: portEntry.sign,
      t: portEntry.t,
      isPrincipal: portEntry.isPrincipal,
    }))
}