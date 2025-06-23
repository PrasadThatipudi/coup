import { Character } from "./character.ts";

export class Contessa implements Character {
  id: number;
  name = "Contessa";

  constructor(id: number) {
    this.id = id;
  }
}
