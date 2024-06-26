export interface Interaction {
  id: string;
  name: string;
  stage: string;
  age: number;
}

export interface Row {
  id: string;
  [key: string]: any;
}
