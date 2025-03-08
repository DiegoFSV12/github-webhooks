import { envs } from "../../config";

export class DiscordService{
    private readonly discordWebhookURL = envs.DISCORD_WEBHOOK_URL;

    constructor(){}

    async notify(message:string){
        const body = {
            content:message,
            embeds:[
                {
                    image:{url:'https://www.gifcen.com/wp-content/uploads/2021/11/hu-tao-16.gif'}
                }
            ]
        }
        const response = await fetch(this.discordWebhookURL,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(body),
        });
        if(!response.ok){
            console.log('Error sending message to discord');
            return false;
        }
        return true;
    }

}