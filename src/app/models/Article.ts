export class Article {
    _id?: string;
    type?: string;
    name?: string;
    filename?: string;
    content?: string;
    timestamp?: string;
    owner: string;
    public: boolean;
    constructor() {
        this.type = 'md';
        this.content = '';
    }
}