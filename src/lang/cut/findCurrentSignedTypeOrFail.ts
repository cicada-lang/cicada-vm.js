import { SignedType } from "../ctx"
import { NodeDefinition } from "../definition"
import { CutOptions } from "./cut"

export function findCurrentSignedTypeOrFail(
  nodeName: string,
  portName: string,
  options?: CutOptions,
): SignedType {
  const who = "findCurrentTypeOrFail"

  const { current } = options || {}

  if (current === undefined) {
    throw new Error(`[${who}] I expect current start and end node definitions`)
  }

  const found = findSignedTypeInNodeDefinitions(nodeName, portName, [
    current.start,
    current.end,
  ])

  if (found === undefined) {
    throw new Error(`[${who}] I can not find port: ${portName} in nodes`)
  }

  return found
}

function findSignedTypeInNodeDefinitions(
  nodeName: string,
  portName: string,
  definitions: Array<NodeDefinition>,
): SignedType | undefined {
  for (const definition of definitions) {
    if (definition.name === nodeName) {
      return findSignedTypeInNodeDefinition(portName, definition)
    }
  }
}

function findSignedTypeInNodeDefinition(
  portName: string,
  definition: NodeDefinition,
): SignedType | undefined {
  for (const typeExp of definition.input) {
    if (typeExp.name === portName) {
      return {
        t: typeExp.t,
        sign: -1,
      }
    }
  }

  for (const typeExp of definition.output) {
    if (typeExp.name === portName) {
      return {
        t: typeExp.t,
        sign: 1,
      }
    }
  }
}