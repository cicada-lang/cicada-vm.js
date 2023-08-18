# iNet

[ [Website](https://inet.cicada-lang.org) ]

Programming with [interaction nets](https://en.wikipedia.org/wiki/Interaction_nets).

## Usage

### Online Playground

We have an online playground.
Source code of the playground is at
[github.com/cicada-lang/inet-website](https://github.com/cicada-lang/inet-website).

**Nat**:

[ [Open in Playground](https://inet.cicada-lang.org/playground/dHlwZSBOYXQgLS0gVHlwZSBlbmQKbm9kZSB6ZXJvIC0tIE5hdCA6dmFsdWUhIGVuZApub2RlIGFkZDEgTmF0IDpwcmV2IC0tIE5hdCA6dmFsdWUhIGVuZAoKbm9kZSBhZGQgTmF0IDp0YXJnZXQhIE5hdCA6YWRkZW5kIC0tIE5hdCA6cmV0dXJuIGVuZAoKcnVsZSB6ZXJvIGFkZAogIChhZGQpLWFkZGVuZAogIHJldHVybi0oYWRkKQplbmQKCnJ1bGUgYWRkMSBhZGQKICAoYWRkKS1hZGRlbmQKICAoYWRkMSktcHJldiBhZGQKICBhZGQxIHJldHVybi0oYWRkKQplbmQKCmNsYWltIG9uZSAtLSBOYXQgZW5kCmRlZmluZSBvbmUgemVybyBhZGQxIGVuZAoKY2xhaW0gdHdvIC0tIE5hdCBlbmQKZGVmaW5lIHR3byBvbmUgb25lIGFkZCBlbmQKCnR3byB0d28gYWRkIGluc3BlY3QKcnVuIGluc3BlY3Q) ]

```inet
type Nat -- Type end
node zero -- Nat :value! end
node add1 Nat :prev -- Nat :value! end

node add Nat :target! Nat :addend -- Nat :return end

rule zero add
  (add)-addend
  return-(add)
end

rule add1 add
  (add)-addend
  (add1)-prev add
  add1 return-(add)
end

claim one -- Nat end
define one zero add1 end

claim two -- Nat end
define two one one add end

two two add inspect
run inspect
```

### Command line tool

Install it by the following command:

```
npm -g i @cicada-lang/inet
```

The command line program is called `inet`.

```sh
inet repl         # Open an interactive REPL
inet run [path]   # Run an inet program
inet help [name]  # Display help for a command
```

## Development

```sh
npm install          # Install dependencies
npm run build        # Compile `src/` to `lib/`
npm run build:watch  # Watch the compilation
npm run test         # Run test
```

## References

**Papers**:

- [Interaction Nets, Yves Lafont, 1990 (the founding paper)](./docs/references/papers/1990-interaction-nets.pdf).
- [Interaction Combinators, Yves Lafont, 1997](./docs/references/papers/1997-interaction-combinators.pdf).

**Books**:

- [Models of Computation -- An Introduction to Computability Theory, Maribel Fernández, 2009](./docs/references/books/models-of-computation--maribel-fernández.pdf).
  - Chapter 7. Interaction-Based Models of Computation.

## Contributions

To make a contribution, fork this project and create a pull request.

Please read the [STYLE-GUIDE.md](STYLE-GUIDE.md) before you change the code.

## License

[GPLv3](LICENSE)
