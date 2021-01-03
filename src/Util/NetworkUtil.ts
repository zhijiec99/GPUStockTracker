import axios from 'axios'
import { Logger } from '../Logger/Logger';
export function request(url: string){
    
    return axios.get(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
            "Referer": "https://google.ca"
        }
    });
}

