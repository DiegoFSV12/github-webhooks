import { Request, Response } from "express";
import { GitHubService } from "../services/github.service";
import { DiscordService } from "../services/discord.service";
import { images } from "../../assets";

export class GithubController{
    constructor(
        private readonly githubService = new GitHubService(),
        private readonly discordService = new DiscordService(),
    ){}

    webhookHandler=(req:Request,res:Response)=>{
        const githubEvent = req.header('x-github-event') ?? 'unknown';//Devuelve el evento que se deo en Github
        //const signature = req.header('x-gub-signature-256') ?? 'unknown';
        const payload = req.body;
        let message:string;
        switch(githubEvent){
            case 'star':
                message = this.githubService.onStar(payload);
                this.sendNotify(message,images.star,res);
                break;
            case 'issues':
                message = this.githubService.onIssue(payload);
                this.sendNotify(message,images.issue,res);
                break;
            default:
                message = `Unknown event => ${githubEvent}`;
                this.sendNotify(message,images.unknown,res);
        }
        console.log(message);
    }

    sendNotify(message:string,type:string,res:Response){
        this.discordService.notify(message,type)
            .then(()=>res.status(202).send('Accepted'))
            .catch(()=>res.status(500).json({error:'Internal server error'}));
    }
}