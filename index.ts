import {request} from './src/Util/NetworkUtil';
import cheerio from 'cheerio';
import { NewEggLookup , get3000SeriesProductIDsFromSearchQuery} from './src/Handlers/Newegg';


async function test(q: string){
    let s = await get3000SeriesProductIDsFromSearchQuery(q);
    console.log(s);
}

test("rtx 3060");
test("rtx 3070");
test("rtx 3080");
