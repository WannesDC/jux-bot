import { injectable } from "inversify";

@injectable()
export class Selector {
    
    constructor(){
    }

    public randomMessageSelector(inputArray : any[]) : any {
        
        let random = Math.floor(Math.random() * inputArray.length);
        if(random < 0){
            random = 0;
        }
        return inputArray[random]

    }

}