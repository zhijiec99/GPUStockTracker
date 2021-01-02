export class Logger {
    static log(str: string){
       console.log(str); 
    }

    static logStockStatus(store: string, item: string, url: string, soldOut: boolean){
        if(soldOut){
            console.log(`(\x1b[34m ${store} \x1b[0m) - ${item}: [\x1b[31m SOLD OUT \x1b[0m]`)
        } else {
            console.log(`(\x1b[34m ${store} \x1b[0m) - ${item}: [\x1b[42m POSSIBLE STOCK \x1b[0m] - ${url}`)
        }
    }   

    static err(str: string){
        console.error("\x1b[31m%s\x1b[0m", str);
    }
}