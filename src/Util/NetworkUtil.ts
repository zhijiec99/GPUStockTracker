import axios from 'axios'
import { Logger } from '../Logger/Logger';

export function request(url: string){
    return axios.get(url);
}

