import { nodeKeyWithoutId } from "../node/nodeKeyWithoutId"
import { Word } from "../word"
import { Mod } from "./Mod"
import { lookupDefinitionOrFail } from "./lookupDefinitionOrFail"

export function defineRule(
  mod: Mod,
  firstName: string,
  secondName: string,
  words: Array<Word>,
): void {
  const firstDefinition = lookupDefinitionOrFail(mod, firstName)
  const secondDefinition = lookupDefinitionOrFail(mod, secondName)

  const firstKey = nodeKeyWithoutId({
    url: firstDefinition.mod.url,
    name: firstDefinition.name,
  })

  const secondKey = nodeKeyWithoutId({
    url: secondDefinition.mod.url,
    name: secondDefinition.name,
  })

  const key = `${firstKey} ${secondKey}`

  mod.rules.set(key, { mod, words })
}
