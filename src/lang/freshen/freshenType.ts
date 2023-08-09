import { stringToSubscript } from "../../utils/stringToSubscript"
import { Value } from "../value"

export function freshenType(
  typeVarCounters: Map<string, number>,
  t: Value,
  occurredNames: Map<string, string>,
): Value {
  switch (t["@kind"]) {
    case "TypeVar": {
      const foundName = occurredNames.get(t.name)
      if (foundName === undefined) {
        const subscript = tickTypeVarCounter(typeVarCounters, t.name)
        const newName = t.name + stringToSubscript(subscript.toString())
        occurredNames.set(t.name, newName)
        return {
          "@type": "Value",
          "@kind": "TypeVar",
          name: newName,
        }
      } else {
        return {
          "@type": "Value",
          "@kind": "TypeVar",
          name: foundName,
        }
      }
    }

    case "TypeTerm": {
      return {
        "@type": "Value",
        "@kind": "TypeTerm",
        name: t.name,
        args: t.args.map((arg) =>
          freshenType(typeVarCounters, arg, occurredNames),
        ),
      }
    }

    default: {
      // TODO Maybe we need to handle other values.
      return t
    }
  }
}

export function tickTypeVarCounter(
  typeVarCounters: Map<string, number>,
  name: string,
): number {
  const foundCounter = typeVarCounters.get(name)
  if (foundCounter === undefined) {
    typeVarCounters.set(name, 0)
    return 0
  } else {
    typeVarCounters.set(name, foundCounter + 1)
    return foundCounter + 1
  }
}