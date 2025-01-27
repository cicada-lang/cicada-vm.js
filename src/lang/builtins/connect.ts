import { type ComposeOptions } from "../compose/compose.ts"
import { connect } from "../connect/connect.ts"
import { type Env } from "../env/index.ts"
import { unifyTypes } from "../unify/unifyTypes.ts"
import { formatValue } from "../value/formatValue.ts"

export function compose(env: Env, options: ComposeOptions): void {
  const first = env.stack.pop()

  if (first === undefined) {
    throw new Error(
      [`[@connect] I expect first value on the stack.`].join("\n"),
    )
  }

  if (first["@kind"] !== "Port") {
    throw new Error(
      [
        `[@connect] I expect the first value on the stack to be a Port.`,
        ``,
        `  first: ${formatValue(first)}`,
      ].join("\n"),
    )
  }

  const second = env.stack.pop()

  if (second === undefined) {
    throw new Error(
      [
        `[@connect] I expect a second value on the stack.`,
        ``,
        `  first: ${formatValue(first)}`,
      ].join("\n"),
    )
  }

  if (second["@kind"] !== "Port") {
    throw new Error(
      [
        `[@connect] I expect the second value on the stack to be a Port.`,
        ``,
        `  first: ${formatValue(first)}`,
        `  second: ${formatValue(first)}`,
      ].join("\n"),
    )
  }

  connect(env.net, first, second)
  if (options.checking) {
    unifyTypes(options.checking.substitution, first.t, second.t)
  }
}
