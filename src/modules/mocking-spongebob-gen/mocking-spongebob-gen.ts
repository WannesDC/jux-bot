import { injectable } from "inversify";
import axios, { AxiosResponse } from "axios";
import FormData from 'form-data'

const memegenEndpoint = 'https://api.imgflip.com/caption_image';
const spongebobtemplateId = 102156234;

@injectable()
export class MockingSpongebob {

  shouldMock(){
    let mockChance = 0.05; // trigger 5% of the time
    return  Math.floor(Math.random() * 100) % (1 / mockChance) == 0; 
  }


  async mockMessage(message: string){
    try{
      let originalMessage = message;
      message = message.replace(/[\u200B-\u200D\uFEFF]/g, '');
      let mockedMessage = message.split('').map(c=>(this.coinFlip())?c.toLocaleUpperCase():c.toLocaleLowerCase()).join('');
      let payload = new FormData();
      
      payload.append('template_id', spongebobtemplateId.toString());
      payload.append('boxes[0][text]', mockedMessage);
      payload.append('username', 'ramthememer');
      payload.append('password', 'badpassword');
      let response: {data: { success: boolean, data: {url: string, page_url:string}}} = await axios.post(memegenEndpoint, payload, { headers: payload.getHeaders()});
      return response.data.data.url;
      
    }catch(e){
      console.error(e);
    }
  }

  coinFlip(){
    return Math.floor(Math.random() * 50) % 2 == 0;
  }
}