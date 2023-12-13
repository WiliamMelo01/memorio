export class Card {
  id: number;

  name: string;

  image: string;

  constructor(id: number, name: string, image: string) {
    this.id = id;
    this.image = image;
    this.name = name;
  }
}
