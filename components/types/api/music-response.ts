import { Alphabets } from "./alphabets.enum";

export interface MusicResponse {
  artist: string;
  artistAlphabetCategory: Alphabets;
  id: string;
  isFavorite: boolean;
  length: number;
  path: string;
  title: string;
  album: string;
}
