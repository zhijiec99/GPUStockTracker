export class Logger {
    static log(str: string){
       console.log(str); 
    }

    static logStockStatus(store: string, item: {name: string, id: string, addToCart?: string}, url: string, soldOut: boolean, captcha?: boolean){
        if(captcha){
            console.log(`(\x1b[34m ${store} \x1b[0m) - ${url} : [\x1b[31m CAPTCHA \x1b[0m]`)
        } else if(soldOut){
            console.log(`(\x1b[34m ${store} \x1b[0m) - ${item.name}: [\x1b[31m SOLD OUT \x1b[0m]`)
        } else {
                console.log(`(\x1b[34m ${store} \x1b[0m) - ${item.name}: [\x1b[42m POSSIBLE STOCK \x1b[0m] - ${url} - CART: https://secure.newegg.ca/Shopping/AddtoCart.aspx?Submit=ADD&ItemList=${item.id}`)
        }
    } 

    static logCanadaComputers(item: {id: string, name: string, url: string}, available: boolean,){
        if(available){
            console.log(`(\x1b[34m Canada Computers \x1b[0m) - ${item.name}: [\x1b[42m POSSIBLE STOCK \x1b[0m] - ADD TO CART: ${item.url}`)
        } else {
            console.log(`(\x1b[34m Canada Computers \x1b[0m) - ${item.name}: [\x1b[31m "Learn More" \x1b[0m] - ${item.url}`)
        }
    }


    static err(str: string){
        console.error("\x1b[31m%s\x1b[0m", str);
    }
}