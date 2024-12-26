export interface Song {
  id: string;
  title: string;
  artist: string;
  category: string;
  url: string;
  thumbnailUrl: string;
  duration: string; // Consider using a more specific type like 'Duration'
}

export interface Playlist {
  title: string;
  caption: string;
  thumbnail: string;
  songs: Song[];
}
