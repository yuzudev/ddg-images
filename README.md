# ddg-images
Duckduckgo images wrapper for Deno


### Usage

```ts
import { search, SafetyLevels } from '...'

const duck = await search('ducks')
const nsfw = await search('hentai', SafetyLevels.STRICT), // doesn't throws any NSFW result

console.log(duck[0]?.image, nsfw[0]?.image)

```

as simple as that, I only use this as a dependency for my bot
