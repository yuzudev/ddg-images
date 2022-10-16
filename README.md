# ddg-images
Duckduckgo images wrapper for Deno (no dependencies)


### Usage

```ts
import { search, SafetyLevels } from "https://deno.land/x/ddgimages@v2.0.1/mod.ts"
// Node: import { search, SafetyLevels } from "ddgimages-deno"

// strict by default
const results = await search("hello world")

console.log(results[0])
```

as simple as that, I only use this as a dependency for my bot

### NodeJS!!!
`npm i ddgimages-deno`
