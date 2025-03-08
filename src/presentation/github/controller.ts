import { Request, Response } from "express";
import { GitHubService } from "../services/github.service";

export class GithubController{
    constructor(
        private readonly githubService = new GitHubService(),
    ){}

    webhookHandler=(req:Request,res:Response)=>{
        const githubEvent = req.header('x-github-event') ?? 'unknown';//Devuelve el evento que se deo en Github
        //const signature = req.header('x-gub-signature-256') ?? 'unknown';
        const payload = req.body;
        let message:string;
        switch(githubEvent){
            case 'star':
                message = this.githubService.onStar(payload);
                break;
            default:
                message = `Unknown evente => ${githubEvent}`;
        }
        console.log(message);
        res.status(202).send('Accepted');
    }
}