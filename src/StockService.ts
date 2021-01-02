

export class StockService {
        intervalProcess: NodeJS.Timeout | null;

        constructor(){
            this.intervalProcess = null
        }

        init(msInterval: number){
            console.log(`Starting service with a ${msInterval} ms interval`);
            this.intervalProcess = setInterval(() => {
                
            }, msInterval);
        };


}
    