import { Request, Response, Router } from "express";

import Post from "../models/Post";

class PostRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    public async getPosts(req: Request, res: Response): Promise<void> {
        const posts = await Post.find();
        res.json(posts);
    }

    public async getPost(req: Request, res: Response): Promise<void> {
        const post = await Post.findOne({url: req.params.url});
        res.json(post);
    }

    public async createPost(req: Request, res: Response): Promise<void> {
        const {title, url, content, image} = req.body;
        const newPost = new Post({title, url, content, image});
        await newPost.save();
        res.json({data: newPost});
    }

    public async updatePost(req: Request, res: Response): Promise<void> {
        const url = req.params.url;
        const post = await Post.findOneAndUpdate({url}, req.body, {new: true});
        res.json(post);
    }

    public async deletePost(req: Request, res: Response): Promise<void> {
        const url = req.params.url;
        await Post.findOneAndDelete({url});
        res.json('Post deleted Successfully');
    }

    routes() {
        this.router.get('/', this.getPosts);
        this.router.get('/:url', this.getPost);
        this.router.post('/', this.createPost);
        this.router.put('/:url', this.updatePost);
        this.router.delete('/:url', this.deletePost);
    }
}

const postRoutes = new PostRoutes();
postRoutes.routes();

export default postRoutes.router;