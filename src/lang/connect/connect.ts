import { Env } from "../env"
import { Mod } from "../mod"
import { lookupRule } from "../mod/lookupRule"
import { Port } from "../port/Port"
import { Rule } from "../rule"

export function connect(env: Env, first: Port, second: Port): void {
  const rule = lookupRuleByPorts(env.mod, first, second)

  if (first.connection !== undefined) {
    throw new Error(`[connect] The first port is already connected.`)
  }

  if (second.connection !== undefined) {
    throw new Error(`[connect] The second port is already connected.`)
  }

  if (rule !== undefined) {
    const edge = { first, second, rule }
    first.connection = { edge, port: second }
    second.connection = { edge, port: first }
    env.activeEdges.push(edge)
  } else {
    const edge = { first, second }
    first.connection = { edge, port: second }
    second.connection = { edge, port: first }
    env.edges.push(edge)
  }
}

function lookupRuleByPorts(
  mod: Mod,
  first: Port,
  second: Port,
): Rule | undefined {
  if (first.isPrincipal && second.isPrincipal) {
    return lookupRule(mod, first.node.name, second.node.name)
  }
}
