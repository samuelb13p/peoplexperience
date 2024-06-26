export interface Interaction {
  id: string;
  delivery?: string;
  stage: string;
  age?: number;
  products?: number;
  payment?: string;
  arrived?: string;
  questions?: string;
  sales?: string;
}

export interface Row {
  id: string;
  [key: string]: any;
}
