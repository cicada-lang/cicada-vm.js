import { Port } from "../graph"
import { connect } from "../graph/connect"
import { createNode } from "../graph/createNode"
import { Mod } from "../mod"
import { defineOperator } from "./defineOperator"

export function defineBuiltInOperators(mod: Mod): void {
  defineOperator(mod, "swap", (net) => {
    const x1 = net.ports.pop() as Port
    const x0 = net.ports.pop() as Port
    net.ports.push(x1, x0)
  })

  defineOperator(mod, "rot", (net) => {
    const x2 = net.ports.pop() as Port
    const x1 = net.ports.pop() as Port
    const x0 = net.ports.pop() as Port
    net.ports.push(x1, x2, x0)
  })

  defineOperator(mod, "connect", (net) => {
    const start = net.ports.pop() as Port
    const end = net.ports.pop() as Port
    connect(net, start, end)
  })

  defineOperator(mod, "wire", (net) => {
    const node = createNode(
      mod,
      "wire",
      [],
      [
        { name: "left", isPrincipal: false },
        { name: "right", isPrincipal: true },
      ],
    )

    net.ports.push(...node.output)

    net.nodes.push(node)

    const [start, end] = node.output

    net.wires.push({ start, end })
  })
}
