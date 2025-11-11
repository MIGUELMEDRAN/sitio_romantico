export type Photo = {
  id: string
  src: string
  alt: string
  width?: number
  height?: number
  thumb?: string
}

export type Video = {
  id: string
  src: string
  poster?: string
  title?: string
}

export type MediaItem = Photo | Video

export const isPhoto = (m: MediaItem): m is Photo => 'alt' in m
export const isVideo = (m: MediaItem): m is Video => 'poster' in m || 'title' in m
