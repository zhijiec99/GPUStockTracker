import { rtx3060, rtx3070, rtx3080 } from "./data/NewEggProducts";
import { get3000SeriesProductIDsFromSearchQuery, NewEggLookup } from "./Handlers/Newegg";


export class NewEggStockService {
        intervalProcess: NodeJS.Timeout | null;
        delay = (ms: number) => new Promise (res => setTimeout(res, ms));
        delayBetweenRequests: number;
        constructor(){
            this.intervalProcess = null
            this.delayBetweenRequests = 2000;
        }

        async loop(msInterval: number){
            await this.fetchNewEgg();
            console.log(" ------------- END OF LIST ---------------");
            await this.delay(msInterval);
            this.loop(msInterval);
        }

        async fetchNewEgg(){            
            let productIDs = [...rtx3060, ...rtx3070, ...rtx3080];
            
            for(var i = 0; i < productIDs.length; i++){
                NewEggLookup(productIDs[i]);
                await this.delay(this.delayBetweenRequests);
            }
        }

        init(msInterval: number){
            console.log(`Starting service with a ${msInterval} ms interval`);
            this.loop(msInterval);
        };

        stop(){
            if(this.intervalProcess){
                clearInterval(this.intervalProcess);
            }
        }

}
    