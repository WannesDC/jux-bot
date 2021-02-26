import { injectable } from "inversify";

@injectable()
export class CustomParsers {

    constructor(){
    }

    public parseConstants(constant: string, ...args :(string|number)[]) : string{

        let amountOfArguments : number = 0;
        if(args){
          amountOfArguments = args.length;
        }

        for(let i = 1 ; i <= amountOfArguments ; i++){
          constant = constant.replace('$'+i, args[i-1].toString());
        }

        return constant;
      }

}