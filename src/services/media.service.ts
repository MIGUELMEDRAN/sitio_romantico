import type { Photo, Video } from '@/domain/media.types'

export type ContentConfig = {
  names: { you: string; her: string }
  welcomeMessage: string
  story: Array<{ date: string; text: string; photoId?: string }>
  photos: Photo[]
  videos: Video[]
  poems: string[]
}

export class MediaService {
  constructor(private content: ContentConfig) {}

  getPhotos(): Photo[] { return this.content.photos }
  getVideos(): Video[] { return this.content.videos }
  getStory() { return this.content.story }
  getPoems() { return this.content.poems }
  getNames() { return this.content.names }
  getWelcome() { return this.content.welcomeMessage }
}
