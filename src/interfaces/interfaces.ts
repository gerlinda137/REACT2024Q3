export interface Result {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export interface DetailedCardData {
  Title: string;
  Year: string;
  Director: string;
  Plot: string;
  Poster: string;
}

export interface DetailedCardProps {
  title: string;
  year: string;
  director: string;
  description: string;
  poster: string;
}

export interface DetailedCardParams {
  id: string;
}
