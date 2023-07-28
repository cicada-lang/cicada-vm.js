import { Mod } from "."
import * as Definitions from "../definitions"
import { Port } from "../graph"
import { netConnect } from "../graph/netConnect"
import { createTrivialTypes } from "../type"

export function defineBuiltInOperators(mod: Mod): void {
  mod.defineOperator("swap", (net) => {
    const x1 = net.portStack.pop() as Port
    const x0 = net.portStack.pop() as Port
    net.portStack.push(x1, x0)
  })

  mod.defineOperator("rot", (net) => {
    const x2 = net.portStack.pop() as Port
    const x1 = net.portStack.pop() as Port
    const x0 = net.portStack.pop() as Port
    net.portStack.push(x1, x2, x0)
  })

  mod.defineOperator("connect", (net) => {
    const start = net.portStack.pop() as Port
    const end = net.portStack.pop() as Port
    netConnect(net, start, end)
  })

  mod.defineOperator("wire", (net) => {
    const def = new Definitions.NodeDefinition(
      mod,
      "Cons",
      "wire",
      [],
      createTrivialTypes(2),
    )

    const node = def.build()

    net.portStack.push(...node.output)
    net.nodes.push(node)

    const [start, end] = node.output

    net.wires.push({ start, end })
  })
}