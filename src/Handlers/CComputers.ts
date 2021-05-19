import { Logger } from "../Logger/Logger";
import { request } from "../Util/NetworkUtil";
import cheerio  from 'cheerio';
import open from 'open'
export async function CCLookup(){
    //3080
    let url = `https://www.canadacomputers.com/index.php?cPath=43&sf=:3_5&mfr=&pr=`;
    // let url = `https://www.canadacomputers.com/index.php?cPath=43&sf=:&mfr=&pr=`
    try {
        let response = await request(url);
        if(!response.data){
            Logger.err(`No data for ${url}`);
            return;
        }

        // console.log(response.data);

        const root = cheerio.load(response.data);
        checkStock(root, url);
    } catch (err){
        Logger.err(`Fetch for ${url} went wrong, ${err}`)
    }
}
/**
 * Checks if th
 */
function checkStock($: cheerio.Root, url: string){
    let productsBtns = $('.btn.btn-primary.text-center.mb-1.mt-2');
    // console.log(productsBtns);
    for(var i = 0; i < productsBtns.length; i++){
        let el = productsBtns.get(i);
        let url = $(el.parent).attr('href') || "";
        let text = $(el).text();
        let name = $($(el.parent.parent.parent.parent.parent.parent).find('.text-dark.text-truncate_3')).text() || "";
        let id = getParameterByName('item_id', url) || "";
        let hasStock = !text.includes("Learn More");
        if(hasStock){
            open(url);
        }
        Logger.logCanadaComputers({name: name.substr(0, 50), id, url}, hasStock);
    }
    // let soldOutText = $('#ProductBuy .btn').first().text();
    // let product = $(".product-title").first().text();
    // if($("body:contains(Are you a human?)").length > 0){
    //     Logger.logStockStatus("newegg", {name: product.substr(0, 50), id}, url, false, true);
    //     return;
    // }
    // let isSoldOut = soldOutText == "Sold Out"
    // Logger.logStockStatus("newegg",{name: product.substr(0, 50), id}, url, isSoldOut);
    // if(!isSoldOut){
    //     open(`https://secure.newegg.ca/Shopping/AddtoCart.aspx?Submit=ADD&ItemList=${id}`)
    // }
}

function getParameterByName(name: string, url: string = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
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
        Logger.err(`Fetch for ${url} went wrong ${err}`)
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