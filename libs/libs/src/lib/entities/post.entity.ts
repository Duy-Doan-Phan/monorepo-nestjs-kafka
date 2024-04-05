import { Expose } from 'class-transformer'

export class PostEntity {
  id: number
  title: string
  @Expose({ name: 'post_content' })
  content: string
}
