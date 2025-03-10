import { envs } from "../../config";

export class DiscordService{
    private readonly discordWebhookURL = envs.DISCORD_WEBHOOK_URL;

    constructor(){}

    async notify(message:string,imageUrl?:string){
        const body = {
            content:message,
            embeds:[
                {
                    image:{url:imageUrl}
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