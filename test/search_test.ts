import { assert } from "https://deno.land/std@0.123.0/testing/asserts.ts";
import { search, SafetyLevels } from "../mod.ts";

Deno.test({
  name: "Search is array",
  async fn() {
    const images = await search("Birds", SafetyLevels.STRICT);

    assert(typeof images === "object");
    assert(Array.isArray(images));
    assert(images.length > 0);
  },
});
