/*  this is from duckduckgo-images-api
    I made a Deno version because is one of my dependencies on nodeJS
    maybe one day this will be at github
*/

import axiod from "https://deno.land/x/axiod@0.23.1/mod.ts"

// if you are in nodeJS you can do something like import axios from 'axios' idc

export const url = "https://duckduckgo.com/"

// the duckduckgo safe search
export enum SafetyLevels
{
    OFF = -2,
    MODERATE, // -1
    STRICT = 1
}

export type Result = {
    /* the width of the image */
    width: number,
    /* the height of the image */
    height: number,
    /* image thumbnail */
    thumbnail: string,
    /* the image URL */
    image: string,
    /* the title of the image */
    title: string,
    /* the site where the image was found */
    url: string,
    /* the search engine results like 'Bing' or 'Google' */
    source: string
}

                            // the search   // strict by default
export async function search(keywords: string, moderate: SafetyLevels = 1): Promise<Result[]>
{
    // constants
    const headers = {
        "authority": "duckduckgo.com",
        "accept": "application/json, text/javascript, */*; q=0.01",
        "sec-fetch-dest": "empty",
        "x-requested-with": "XMLHttpRequest",
        "user-agent": "\
              Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4)\
              AppleWebKit/537.36 (KHTML, like Gecko)\
              Chrome/80.0.3987.163 Safari/537.36\
        ",
        "sec-fetch-site": "same-origin",
        "sec-fetch-mode": "cors",
        "referer": "https://duckduckgo.com/",
        "accept-language": "en-US,en;q=0.9"
    }

    const token = await get_token(keywords);

    if (!token)
        throw new Error('No token found')

    const params = {
        "vqd": token,
        "l": "us-en",
        "f": ",,,",
        "q": keywords,
        "o": "json",
        "p": "" + (moderate) // strict by  default
    }

    // utilities
    function get_token(_keywords: string): Promise<string | undefined>
    {
        return new Promise(async (resolve, reject) =>
        {
            try
            {
                const { data } = await axiod.get<string>(url,
                    {
                        params: {
                            q: _keywords
                        }
                    }
                )
                const token = data.match(/vqd=([\d-]+)\&/)
                resolve(token?.[1])
            }
            catch (err: unknown)
            {
                if (err instanceof Error)
                    reject(err)
            }
        })
    }

    // get the image
    return new Promise<Result[]>(async (resolve, reject) =>
    {
        try
        {
            const { data } = await axiod.get<{ results: Result[]}>(
                url + 'i.js',
                {
                    params,
                    headers
                }
            )
            resolve(data.results)
        }
        catch (err: unknown)
        {
            if (err instanceof Error)
                reject(err)
        }
    })
}
