import { findInputPorts } from "../net/findInputPorts.ts"
import { findOutputPorts } from "../net/findOutputPorts.ts"
import { findPortEntry } from "../net/findPortEntry.ts"
import { type Net } from "../net/index.ts"
import { type Node } from "../node/index.ts"
import { type Port } from "../port/index.ts"
import { type ComposeOptions } from "./compose.ts"

export function findCurrentPortOrFail(
  net: Net,
  nodeName: string,
  portName: string,
  options?: ComposeOptions,
): Port {
  const who = "findCurrentPortOrFail"

  const { current } = options || {}

  if (current === undefined) {
    throw new Error(
      [
        `[${who}] I expect current first and second nodes in ComposeOptions.`,
        ``,
        `  port name: ${portName}`,
        `  node name: ${nodeName}`,
      ].join("\n"),
    )
  }

  const found = findPortInNodes(net, nodeName, portName, [
    current.first,
    current.second,
  ])

  if (found === undefined) {
    throw new Error(
      [
        `[${who}] I can not find port in node.`,
        ``,
        `  node name: ${nodeName}`,
        `  port name: ${portName}`,
      ].join("\n"),
    )
  }

  return found
}

function findPortInNodes(
  net: Net,
  nodeName: string,
  portName: string,
  nodes: Array<Node>,
): Port | undefined {
  for (const node of nodes) {
    if (nodeName === node.name) {
      return findPortInNode(net, portName, node)
    }
  }
}

function findPortInNode(
  net: Net,
  portName: string,
  node: Node,
): Port | undefined {
  for (const port of findInputPorts(net, node)) {
    if (port.name === portName) {
      const portEntry = findPortEntry(net, port)
      return portEntry?.connection?.port
    }
  }

  for (const port of findOutputPorts(net, node)) {
    if (port.name === portName) {
      const portEntry = findPortEntry(net, port)
      return portEntry?.connection?.port
    }
  }
}
