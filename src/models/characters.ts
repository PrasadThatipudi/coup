interface Character {
  id: number;
  name: string;
}

class Duke implements Character {
  id: number;
  name = "Duke";

  constructor(id: number) {
    this.id = id;
  }
}

class Assassin implements Character {
  id: number;
  name = "Assassin";

  constructor(id: number) {
    this.id = id;
  }
}

class Captain implements Character {
  id: number;
  name = "Captain";

  constructor(id: number) {
    this.id = id;
  }
}

class Ambassador implements Character {
  id: number;
  name = "Ambassador";

  constructor(id: number) {
    this.id = id;
  }
}

class Contessa implements Character {
  id: number;
  name = "Contessa";

  constructor(id: number) {
    this.id = id;
  }
}

export type { Character };

export { Ambassador, Assassin, Captain, Contessa, Duke };
