import { Logger } from "../Logger/Logger";
import { request } from "../Util/NetworkUtil";
import cheerio  from 'cheerio';

export async function NewEggLookup(productID: string){
    let url = `https://www.newegg.ca/p/${productID}?recaptcha=pass`;
    try {
        let response = await request(url);
        if(!response.data){
            Logger.err(`No data for ${url}`);
            return;
        }

        // console.log(response.data);

        const root = cheerio.load(response.data);
        checkStock(root, url, productID);
    } catch (err){
        Logger.err(`Fetch for ${url} went wrong`)
    }
}
/**
 * Checks if th
 */
function checkStock($: cheerio.Root, url: string, id: string){
    let soldOutText = $('#ProductBuy .btn').first().text();
    let product = $(".product-title").first().text();
    if($("body:contains(Are you a human?)").length > 0){
        Logger.logStockStatus("newegg", {name: product.substr(0, 50), id}, url, false, true);
        return;
    }
    let isSoldOut = soldOutText == "Sold Out"
    Logger.logStockStatus("newegg",{name: product.substr(0, 50), id}, url, isSoldOut);
    if(!isSoldOut){
        open(`https://secure.newegg.ca/Shopping/AddtoCart.aspx?Submit=ADD&ItemList=${id}`)
    }
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