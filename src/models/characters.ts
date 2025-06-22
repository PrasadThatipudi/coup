interface Character {
  name: string;
}

class Duke implements Character {
  name = "Duke";
}

class Assassin implements Character {
  name = "Assassin";
}

export type { Character };

export { Assassin, Duke };
