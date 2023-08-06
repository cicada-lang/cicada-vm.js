import { createCtx } from "../ctx/createCtx"
import { cutWords } from "../cut/cutWords"
import { appendReport } from "../errors/appendReport"
import { Mod } from "../mod"
import { defineRule } from "../mod/defineRule"
import { lookupNodeDefinitionOrFail } from "../mod/lookupNodeDefinitionOrFail"
import { Span } from "../span"
import { Stmt } from "../stmt"
import { Word } from "../word"

export class DefineRule implements Stmt {
  constructor(
    public start: string,
    public end: string,
    public words: Array<Word>,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    try {
      const ctx = createCtx()

      const start = lookupNodeDefinitionOrFail(mod, this.start)
      const end = lookupNodeDefinitionOrFail(mod, this.end)

      cutWords(mod, ctx, this.words, {
        current: { start, end },
      })

      defineRule(mod, this.start, this.end, this.words)
    } catch (error) {
      throw appendReport(error, {
        message: [
          `[DefineRule.execute] I fail to define rule.`,
          ``,
          `  rule nodes: ${this.start} ${this.end}`,
        ].join("\n"),
        context: {
          span: this.span,
          text: mod.text,
        },
      })
    }
  }
}
