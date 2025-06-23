import { Character } from "./character.ts";

export class Captain implements Character {
  id: number;
  name = "Captain";

  constructor(id: number) {
    this.id = id;
  }
}
