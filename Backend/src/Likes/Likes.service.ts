import { Like } from './Likes.entity';
import { User } from '../User/User.entity';
import { Post } from '../Posts/Post.entity';

export class LikeService {

    async toggleLike(userId: number, postId: number) {

        const user = await User.findOne({ where: { id: userId } })
        if (!user) {
            throw new Error('Usuario no existe')
        }
        const post = await Post.findOne({ where: { id: postId } })
        if (!post) {
            throw new Error('Post no existe')
        }
        const existingLike = await Like.findOne({where: {user: { id: userId },post: { id: postId }}})
        if (existingLike) {
            await existingLike.remove()
            post.likes_count = Math.max(0, post.likes_count - 1)
            await post.save()

            return { liked: false }
        }
        const newLike = new Like()
        newLike.user = user
        newLike.post = post

        await newLike.save()

        post.likes_count += 1
        await post.save()

        return { liked: true }
    }
}