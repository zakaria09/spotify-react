
export interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: any;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: any;
  type: string;
  uri: string;
  artists: Artist[];
  tracks: Tracks;
};

export interface Tracks {
  href: string;
  items: any[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export interface Artist {
  external_urls: string;
  followers: any;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}