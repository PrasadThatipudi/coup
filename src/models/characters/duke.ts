import { Character } from "./character.ts";

export class Duke implements Character {
  id: number;
  name = "Duke";

  constructor(id: number) {
    this.id = id;
  }
}
