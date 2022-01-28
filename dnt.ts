import { build } from "https://deno.land/x/dnt@0.7.4/mod.ts";

await Deno.remove("npm", { recursive: true }).catch((o_O) => {});

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  package: {
    name: "ddgimages-deno",
    version: Deno.args[0]?.replace(/^v/, ""),
    description: "Duckduckgo images wrapper for Deno with no dependencies",
    license: "GPL-3.0 License",
    repository: {
      type: "git",
      url: "git+https://github.com/yuzudev/ddg-images.git",
    },
    bugs: {
      url: "https://github.com/yuzudev/ddg-images/issues",
    },
  },
});

Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
