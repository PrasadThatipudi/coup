import { Character } from "./character.ts";

export class Ambassador implements Character {
  id: number;
  name = "Ambassador";

  constructor(id: number) {
    this.id = id;
  }
}
