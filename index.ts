import {request} from './src/Util/NetworkUtil';
import cheerio from 'cheerio';
import { NewEggLookup , get3000SeriesProductIDsFromSearchQuery} from './src/Handlers/Newegg';
import { NewEggStockService } from './src/NewEggStockService';


async function getProductIDs(q: string){
    let s = await get3000SeriesProductIDsFromSearchQuery(q);
    console.log(s);
}

let service = new NewEggStockService();
service.init(60*1000)
// getProductIDs("rtx 3060");
// getProductIDs("rtx 3070");
// getProductIDs("rtx 3080");
// N82E16814487530
// NewEggLookup("N82E16814932377");