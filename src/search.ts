/*
  this is from JorgePoblete/DuckDuckGoImages
  **no dependencies!** just Deno
*/

/** the site url */
export const url = "https://duckduckgo.com/";

/** the duckduckgo safe search */
export enum SafetyLevels {
  OFF = -2,
  MODERATE, // -1
  STRICT = 1,
}

/** The results for the image search */
export interface Result {
  /** the width of the image */
  width: number;
  /** the height of the image */
  height: number;
  /** image thumbnail */
  thumbnail: string;
  /** the image URL */
  image: string;
  /** the title of the image */
  title: string;
  /** the site where the image was found */
  url: string;
  /** the search engine results like 'Bing' or 'Google' */
  source: string;
}

/** @private */
const headers = {
  "authority": "duckduckgo.com",
  "accept": "application/json , text/javascript, */*; q=0.01",
  "Content-Type": "application/json",
  "sec-fetch-dest": "empty",
  "x-requested-with": "XMLHttpRequest",
  "user-agent":
    "\
            Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4)\
            AppleWebKit/537.36 (KHTML, like Gecko)\
            Chrome/80.0.3987.163 Safari/537.36\
      ",
  "sec-fetch-site": "same-origin",
  "sec-fetch-mode": "cors",
  "referer": "https://duckduckgo.com/",
  "accept-language": "en-US,en;q=0.9",
};

/** @private */
async function getToken(_keywords: string) {
  const data = await fetch(`${url}?${serializeParams({ q: _keywords })}`, {
    method: "GET",
  }).then((r) => r.text());
  // is this legal? idk
  const token = data.match(/vqd=([\d-]+)\&/);
  return token?.[1];
}

/** @private */
function serializeParams(params: Record<string, string>) {
  return Object.keys(params)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
    )
    .join("&");
}

/** **NOTE:** the module is strict by default */
export async function search(
  keywords: string | string[],
  moderate: SafetyLevels = SafetyLevels.STRICT
): Promise<Result[]> {
  const token = await getToken(
    typeof keywords === "string" ? keywords : keywords.join(" ")
  );

  if (!token) {
    throw new Error("No token found");
  }

  const params = {
    vqd: token,
    l: "us-en",
    f: ",,,",
    q: typeof keywords === "string" ? keywords : keywords.join(" "),
    o: "json",
    p: moderate /* number */
      .toString(), // strict by  default
  };

  // get the image!
  return fetch(url + "i.js" + `?${serializeParams(params)}`, { headers })
    .then((data) => data.json())
    .then((imgs) => imgs.results);
}
