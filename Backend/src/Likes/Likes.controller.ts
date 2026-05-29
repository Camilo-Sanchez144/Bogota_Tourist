import { Request, Response } from 'express';
import { LikeService } from './Likes.service';

class LikeController {

    private likeService = new LikeService()

    toggleLike = async (req: Request, res: Response) => {
        try {
            const userId = Number((req as any).user?.id)
            if (!userId || Number.isNaN(userId)) {
                return res.status(400).json({ message: 'Id inválido en el token' })
            }
            const postId = Number(req.params.postId)

            if (isNaN(userId) || isNaN(postId)) {
                return res.status(400).send('IDs inválidos')
            }

            const result = await this.likeService.toggleLike(userId, postId)

            return res.status(200).json(result)

        } catch (err) {
            if (err instanceof Error) {
                if (err.message.includes('no existe')) {
                    return res.status(404).send(err.message)
                }
                return res.status(500).send(err.message)
            }
        }
    }
}

export default new LikeController()