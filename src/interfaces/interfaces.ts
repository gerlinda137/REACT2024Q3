export interface Result {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export interface DetailedCardData {
  title: string;
  year: string;
  director: string;
  plot: string;
  poster: string;
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
