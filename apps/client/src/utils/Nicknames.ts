const listOfAnimals = [
  "pes",
  "kočka",
  "králík",
  "kůň",
  "kráva",
  "prase",
  "ovce",
  "kohout",
  "kachna",
  "husa",
  "krůta",
  "lev",
  "tygr",
  "medvěd",
  "žirafa",
  "slon",
  "krokodýl",
  "aligátor",
  "opice",
  "gorila",
  "orangutan",
  "pavouk",
  "mravenec",
  "brouk",
  "motýl",
  "vepř",
  "ježek",
  "rys",
  "vlk",
  "liška",
  "jelen",
  "srna",
  "zajíc",
  "bobr",
  "nutrie",
  "mys",
  "krysa",
  "hraboš",
  "víceřitý",
  "sysel",
  "jezevec",
  "lasice",
  "nork",
  "tchoř",
  "skunk",
  "mýval",
  "koala",
  "klokan",
  "vačice",
  "opossum",
  "dingo",
  "vombat",
  "tasman",
  "kiwi",
  "emu",
  "kazuár",
  "labuť",
  "flamingo",
  "pelikán",
  "tučňák",
  "albatros",
  "kondor",
  "sup",
  "jestřáb",
  "sokol",
  "orl",
  "sova",
  "kakadu",
  "papoušek",
  "kolibřík",
  "straka",
  "vrána",
  "sojka",
  "kos",
  "sýkora",
  "vlaštovka",
  "racci",
  "čáp",
  "volavka",
  "kormorán",
  "tučňák",
  "pingvin",
  "albatros",
  "kondor",
  "sup",
  "jestřáb",
  "sokol",
  "orel",
  "sova",
  "kakadu",
  "papoušek",
  "kolibřík",
  "straka",
  "vrána",
  "sojka",
  "kos",
  "sýkora",
  "vlaštovka",
  "racci",
  "čáp",
  "volavka",
  "kormorán",
  "losos",
  "pstruh",
  "kapr",
  "sumec",
  "úhoř",
  "sleď",
  "makrela",
  "tuňák",
  "mečoun",
  "marlin",
  "barrakuda",
  "žralok",
  "delfín",
  "velryba",
  "morž",
  "tuleň",
  "lachtan",
  "mrož",
  "krab",
  "homár",
  "kreveta",
  "chobotnice",
  "sépie",
  "krakatice",
  "medúza",
  "korál",
  "anémona",
  "hroznyň",
  "hvězdice",
  "mořský ježek",
  "mořská okurka",
  "plankton",
  "zooplankton",
  "fitoplankton",
];

const listOfAdjectives = [
  "ulekaná",
  "huňatá",
  "veselá",
  "smutná",
  "hravá",
  "divoká",
  "domácí",
  "exotická",
  "roztomilá",
  "ostražitá",
  "plachá",
  "agresivní",
  "klidná",
  "energická",
  "lenivá",
  "rychlá",
  "pomalá",
  "silná",
  "slabá",
  "mladá",
  "stará",
  "velká",
  "malá",
  "štíhlá",
  "tlustá",
  "elegantní",
  "neohrabaná",
  "šikovná",
  "nemotorná",
  "hezká",
  "ošklivá",
  "chytřá",
  "hloupá",
  "dobrá",
  "zlá",
  "štědrá",
  "sobecká",
  "společenská",
  "osamělá",
  "odvážná",
  "zbabělá",
  "milá",
  "nepříjemná",
  "přátelská",
  "nepřátelská",
  "věrná",
  "nevěrná",
  "poslušná",
  "neposlušná",
  "čistá",
  "špinavá",
  "zdravá",
  "nemocná",
  "hlasitá",
  "tichá",
  "aktivní",
  "pasivní",
  "radostná",
  "zklamaná",
  "nadšená",
  "rozčílená",
  "spokojená",
  "nespokojená",
  "pyšná",
  "skromná",
  "sebevědomá",
  "nesmělá",
  "trpělivá",
  "netrpělivá",
  "odpovědná",
  "neodpovědná",
  "upřímná",
  "lživá",
  "tolerantní",
  "netolerantní",
  "optimistická",
  "pesimistická",
  "ambiciózní",
  "pohodlná",
  "snaživá",
  "líná",
  "kreativní",
  "nekreativní",
  "inteligentní",
  "neinteligentní",
  "vzdělaná",
  "nevzdělaná",
  "bohatá",
  "chudá",
  "štěstlivá",
  "neštěstlivá",
  "svobodná",
  "zajatá",
  "bezpečná",
  "ohrožená",
  "živá",
  "mrtvá",
  "divoká",
  "domestikovaná",
  "plodná",
  "neplodná",
  "mladistvá",
  "starobylá",
  "moderní",
  "staromódní",
  "barevná",
  "bezbarvá",
  "jasná",
  "tmavá",
  "lehká",
  "těžká",
  "měkká",
  "tvrdá",
  "teplá",
  "studená",
  "mokrá",
  "suchá",
  "hladová",
  "syta",
  "žíznivá",
  "nasytěná",
  "spící",
  "bdělá",
  "klidná",
  "rozrušená",
  "spokojená",
  "frustrovaná",
  "zvědavá",
  "lhostejná",
  "šťastná",
  "smutná",
  "zamilovaná",
  "rozčílená",
  "nadšená",
  "zklamaná",
  "překvapená",
  "vystrašená",
  "zmatená",
  "odhodlaná",
  "bezmocná",
  "nadějná",
  "beznadějná",
  "zoufalá",
  "vzrušená",
  "nudná",
  "znechucená",
  "odpudivá",
  "přitažlivá",
  "odporná",
  "oblíbená",
  "neoblíbená",
  "obyčejná",
  "neobyčejná",
  "obydlená",
  "neobydlená",
  "oživená",
  "mrtvá",
  "přirozená",
  "umělá",
  "krásná",
  "ošklivá",
  "příjemná",
  "nepříjemná",
  "přátelská",
  "nepřátelská",
  "milá",
  "nemilá",
  "sladká",
  "hořká",
  "kyselá",
  "slaná",
  "ostrá",
  "měkká",
  "tvrdá",
  "lehká",
  "těžká",
  "teplá",
  "studená",
  "mokrá",
  "suchá",
  "hladová",
  "syta",
  "žíznivá",
  "nasytěná",
  "spící",
  "bdělá",
  "klidná",
  "rozrušená",
  "spokojená",
  "frustrovaná",
  "zvědavá",
  "lhostejná",
  "šťastná",
  "smutná",
  "zamilovaná",
  "rozčílená",
  "nadšená",
  "zklamaná",
  "překvapená",
  "vystrašená",
  "zmatená",
  "odhodlaná",
  "bezmocná",
  "nadějná",
  "beznadějná",
  "zoufalá",
  "vzrušená",
  "nudná",
  "znechucená",
  "odpudivá",
  "přitažlivá",
  "odporná",
  "oblíbená",
  "neoblíbená",
  "obyčejná",
  "neobyčejná",
  "obydlená",
  "neobydlená",
  "oživená",
  "mrtvá",
  "přirozená",
  "umělá",
  "krásná",
  "ošklivá",
  "příjemná",
  "nepříjemná",
  "přátelská",
  "nepřátelská",
  "milá",
  "nemilá",
  "sladká",
  "hořká",
  "kyselá",
  "slaná",
  "ostrá",
  "měkká",
  "tvrdá",
  "lehká",
  "těžká",
  "teplá",
  "studená",
  "mokrá",
  "suchá",
  "hladová",
  "syta",
  "žíznivá",
  "nasytěná",
  "spící",
  "bdělá",
  "klidná",
  "rozrušená",
  "spokojená",
  "frustrovaná",
  "zvědavá",
  "lhostejná",
  "šťastná",
  "smutná",
  "zamilovaná",
  "rozčílená",
  "nadšená",
  "zklamaná",
  "překvapená",
  "vystrašená",
  "zmatená",
  "odhodlaná",
  "bezmocná",
  "nadějná",
  "beznadějná",
  "zoufalá",
  "vzrušená",
  "nudná",
  "znechucená",
  "odpudivá",
  "přitažlivá",
];

export const generateRandomNickname: Function = (): {
  adj: string;
  animal: string;
} => {
  const randomAdj =
    listOfAdjectives[Math.floor(Math.random() * listOfAdjectives.length)];
  const randomAnimal =
    listOfAnimals[Math.floor(Math.random() * listOfAnimals.length)];

  //A regular expression that makes sure that ajective is in the correct form (feminine, masculine, neuter) for the Czech language - bad example = "veselá králík", good example = "veselý králík" etc.

  if (
    randomAdj.endsWith("á") &&
    (randomAnimal.endsWith("k") ||
      randomAnimal.endsWith("l") ||
      randomAnimal.split("").reverse().join("").startsWith("k") ||
      randomAnimal.split("").reverse().join("").startsWith("l"))
  ) {
    return { adj: randomAdj, animal: randomAnimal };
  } else if (
    randomAdj.endsWith("á") &&
    (randomAnimal.endsWith("a") ||
      randomAnimal.endsWith("e") ||
      randomAnimal.endsWith("í") ||
      randomAnimal.endsWith("o") ||
      randomAnimal.endsWith("u") ||
      randomAnimal.endsWith("y") ||
      randomAnimal.endsWith("ý") ||
      randomAnimal.endsWith("ě") ||
      randomAnimal.endsWith("ů") ||
      randomAnimal.endsWith("i") ||
      randomAnimal.endsWith("é") ||
      randomAnimal.endsWith("á") ||
      randomAnimal.endsWith("ý") ||
      randomAnimal.endsWith("é"))
  ) {
    return { adj: randomAdj, animal: randomAnimal };
  } else if (
    randomAdj.endsWith("á") &&
    (randomAnimal.endsWith("n") ||
      randomAnimal.endsWith("r") ||
      randomAnimal.split("").reverse().join("").startsWith("n") ||
      randomAnimal.split("").reverse().join("").startsWith("r"))
  ) {
    return { adj: randomAdj, animal: randomAnimal };
  } else if (
    randomAdj.endsWith("á") &&
    (randomAnimal.endsWith("d") ||
      randomAnimal.endsWith("t") ||
      randomAnimal.split("").reverse().join("").startsWith("d") ||
      randomAnimal.split("").reverse().join("").startsWith("t"))
  ) {
    return { adj: randomAdj, animal: randomAnimal };
  } else if (
    randomAdj.endsWith("á") &&
    (randomAnimal.endsWith("b") ||
      randomAnimal.endsWith("p") ||
      randomAnimal.split("").reverse().join("").startsWith("b") ||
      randomAnimal.split("").reverse().join("").startsWith("p"))
  ) {
    return { adj: randomAdj, animal: randomAnimal };
  } else if (
    randomAdj.endsWith("á") &&
    (randomAnimal.endsWith("v") ||
      randomAnimal.endsWith("z") ||
      randomAnimal.split("").reverse().join("").startsWith("v") ||
      randomAnimal.split("").reverse().join("").startsWith("z"))
  ) {
    return { adj: randomAdj, animal: randomAnimal };
  } else if (
    randomAdj.endsWith("á") &&
    (randomAnimal.endsWith("m") ||
      randomAnimal.endsWith("s") ||
      randomAnimal.split("").reverse().join("").startsWith("m") ||
      randomAnimal.split("").reverse().join("").startsWith("s"))
  ) {
    return { adj: randomAdj, animal: randomAnimal };
  } else if (
    randomAdj.endsWith("á") &&
    (randomAnimal.endsWith("g") ||
      randomAnimal.endsWith("h") ||
      randomAnimal.split("").reverse().join("").startsWith("g") ||
      randomAnimal.split("").reverse().join("").startsWith("h"))
  ) {
    return { adj: randomAdj, animal: randomAnimal };
  } else if (
    randomAdj.endsWith("á") &&
    (randomAnimal.endsWith("j") ||
      randomAnimal.endsWith("k") ||
      randomAnimal.split("").reverse().join("").startsWith("j") ||
      randomAnimal.split("").reverse().join("").startsWith("k"))
  ) {
    return { adj: randomAdj, animal: randomAnimal };
  } else if (
    randomAdj.endsWith("á") &&
    (randomAnimal.endsWith("l") ||
      randomAnimal.endsWith("r") ||
      randomAnimal.split("").reverse().join("").startsWith("l") ||
      randomAnimal.split("").reverse().join("").startsWith("r"))
  ) {
    return { adj: randomAdj, animal: randomAnimal };
  } else {
    return { adj: randomAdj, animal: randomAnimal };
  }
};
