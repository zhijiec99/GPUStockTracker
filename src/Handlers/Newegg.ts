import { Logger } from "../Logger/Logger";
import { request } from "../Util/NetworkUtil";
import cheerio  from 'cheerio';
export async function NewEggLookup(productID: string){
    let url = `https://www.newegg.ca/p/${productID}`;
    try {
        let response = await request(url);
        if(!response.data){
            Logger.err(`No data for ${url}`);
            return;
        }

        const root = cheerio.load(response.data);
        checkStock(root, url);
    } catch (err){
        Logger.err(`Fetch for ${url} went wrong`)
    }
}

/**
 * Checks if th
 */
function checkStock($: cheerio.Root, url: string){
    let soldOutText = $('#ProductBuy .btn').first().text();
    let product = $(".product-title").first().text();

    let isSoldOut = soldOutText == "Sold Out"
    Logger.logStockStatus("newegg", product.substr(1, 50), url, isSoldOut);
}

export async function get3000SeriesProductIDsFromSearchQuery(query: string): Promise<string[]> {
    let url = `https://www.newegg.ca/p/pl?d=${encodeURI(query)}&N=601357282%20100007708&PageSize=96`;
    try {
        let response = await request(url);
        if(!response.data){
            Logger.err(`No data while searching for ${query}`);
            return [];
        }

        const root = cheerio.load(response.data);
        return parseProductIDs(root);
    } catch (err){
        Logger.err(`Fetch for ${url} went wrong`)
        return [];
    }
}

function parseProductIDs($: cheerio.Root): string[] {
    let productIDs: string[] = [];
    $(".item-features li:nth-child(6)").each((i, el) => {
        let s = $(el).text().split(" ")[2];
        productIDs.push(s);
    });

    return productIDs;
}