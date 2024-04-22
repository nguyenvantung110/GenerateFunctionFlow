export class AuthorPath{
    id: number;
    title: string;
    url: string;

    constructor(_id : number, _titlle:string,_url:string)
    {
        this.id = _id;
        this.title = _titlle;
        this.url = _url
    }
}