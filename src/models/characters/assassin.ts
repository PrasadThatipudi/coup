import { Character } from "./character.ts";

export class Assassin implements Character {
  id: number;
  name = "Assassin";

  constructor(id: number) {
    this.id = id;
  }
}
