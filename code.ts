figma.showUI(__html__, { width: 275, height: 535 });

const companies = [
  {
    name: "Acme Consulting A/S",
    domain: "acmeconsulting.se",
  },
  {
    name: "Global Logistics AS",
    domain: "globallogistics.no",
  },
  {
    name: "Bright Ideas AB",
    domain: "brightideas.se",
  },
  {
    name: "Tech Genius ApS",
    domain: "techgenius.fi",
  },
  {
    name: "Smart Office AB",
    domain: "smartoffice.se",
  },
  {
    name: "Future Foods AS",
    domain: "futurefoods.no",
  },
  {
    name: "Apple Tree A/S",
    domain: "appletree.se",
  },
  {
    name: "Sustainable Energy ApS",
    domain: "sustainableenergy.no",
  },
  {
    name: "Virtual Worlds AB",
    domain: "virtualworlds.se",
  },
  {
    name: "Innovative Healthcare AS",
    domain: "innovativehealthcare.fi",
  },
  {
    name: "Eco-Friendly Homes AB",
    domain: "ecofriendlyhomes.se",
  },
  {
    name: "Ocean Blue A/S",
    domain: "oceanblue.no",
  },
  {
    name: "Smart Tech AB",
    domain: "smarttech.se",
  },
  {
    name: "Urban Planning AS",
    domain: "urbanplanning.no",
  },
  {
    name: "Intelligent Transportation AB",
    domain: "intelligenttransportation.se",
  },
  {
    name: "Nordic Style AS",
    domain: "nordicstyle.no",
  },
  {
    name: "Savvy Investments AB",
    domain: "savvyinvestments.se",
  },
  {
    name: "Digital Solutions AS",
    domain: "digitalsolutions.no",
  },
  {
    name: "Green Energy AB",
    domain: "greenenergy.se",
  },
  {
    name: "Wellness Center AS",
    domain: "wellnesscenter.no",
  },
  {
    name: "Tech Revolution AB",
    domain: "techrevolution.se",
  },
  {
    name: "Bright Futures AS",
    domain: "brightfutures.fi",
  },
  {
    name: "CleanTech AB",
    domain: "cleantech.se",
  },
  {
    name: "Fashionista AS",
    domain: "fashionista.no",
  },
  {
    name: "Creative Industries AB",
    domain: "creativeindustries.se",
  },
  {
    name: "Travel Adventures AS",
    domain: "traveladventures.fi",
  },
  {
    name: "Wellness Lifestyle AB",
    domain: "wellnesslifestyle.se",
  },
  {
    name: "Future Cities AS",
    domain: "futurecities.no",
  },
  {
    name: "Smart Buildings AB",
    domain: "smartbuildings.se",
  },
  {
    name: "Green Business AS",
    domain: "greenbusiness.fi",
  },
  {
    name: "Digital Marketing AB",
    domain: "digitalmarketing.se",
  },
  {
    name: "Organic Foods AS",
    domain: "organicfoods.no",
  },
  {
    name: "Next Generation Tech AB",
    domain: "nextgenerationtech.se",
  },
];
const femaleNames = [
  "Astrid",
  "Birgit",
  "Caroline",
  "Dagny",
  "Elin",
  "Frida",
  "Greta",
  "Hedvig",
  "Ingrid",
  "Johanna",
  "Karin",
  "Lena",
  "Maja",
  "Nina",
  "Olga",
  "Petra",
  "Qarin",
  "Rakel",
  "Sanna",
  "Tove",
  "Ulrika",
  "Vendela",
  "Wilhelmina",
  "Xenia",
  "Ylva",
  "Zara",
  "Åsa",
  "Älva",
  "Örjan",
  "Ada",
  "Beatrice",
  "Cecilia",
  "Diana",
  "Emilia",
  "Felicia",
  "Gabriella",
  "Hanna",
  "Ida",
  "Josefine",
  "Klara",
  "Lina",
  "Matilda",
  "Natalia",
  "Othilia",
  "Paulina",
  "Quinn",
  "Rebecca",
  "Sofia",
  "Therese",
  "Ulla",
  "Vera",
  "Wanda",
  "Xanthe",
  "Ylvi",
  "Zelda",
  "Åse",
  "Älise",
  "Örla",
  "Aina",
  "Berit",
  "Camilla",
  "Dorothea",
  "Ebba",
  "Fanny",
  "Gerd",
  "Hedda",
  "Inga",
  "Jennie",
  "Kirsten",
  "Liselotte",
  "Malin",
  "Nora",
  "Oda",
  "Pernilla",
  "Qristina",
  "Ronja",
  "Saga",
  "Sigrid",
  "Tilda",
  "Una",
  "Vigdis",
  "Wilma",
  "Xandra",
  "Yvonne",
  "Zillah",
  "Åsta",
  "Änna",
  "Ödeborg",
  "Amalie",
  "Blenda",
];
const maleNames = [
  "Anders",
  "Bjorn",
  "Casper",
  "Dag",
  "Einar",
  "Felix",
  "Gunnar",
  "Hans",
  "Ingvar",
  "Jens",
  "Karl",
  "Lars",
  "Mikael",
  "Nils",
  "Ola",
  "Per",
  "Quentin",
  "Rune",
  "Sven",
  "Thor",
  "Ulrik",
  "Vidar",
  "Wilhelm",
  "Yngve",
  "Zacharias",
  "Åke",
  "Ärvid",
  "Örjan",
  "Albin",
  "Bertil",
  "Carl",
  "David",
  "Erik",
  "Filip",
  "Gustav",
  "Hampus",
  "Isak",
  "Johan",
  "Knut",
  "Leif",
  "Mats",
  "Niklas",
  "Oskar",
  "Patrik",
  "Rasmus",
  "Svante",
  "Tomas",
  "Urban",
  "Valdemar",
  "William",
  "Xander",
  "Ymer",
  "Zebastian",
  "Adam",
  "Bjarte",
  "Cato",
  "Dan",
  "Eivind",
  "Fredrik",
  "Geir",
  "Håkon",
  "Inge",
  "Jonas",
  "Kenneth",
  "Lasse",
  "Magnus",
  "Nikolai",
  "Odd",
  "Peder",
  "Qvintus",
  "Ragnar",
  "Sigurd",
  "Torbjorn",
  "Ulf",
  "Viggo",
  "Widar",
  "Xerxes",
  "Yngvar",
  "Ziggy",
  "Øystein",
  "Åsmund",
  "Älgar",
  "Öjvind",
  "Aksel",
  "Bendik",
  "Christoffer",
  "Dennis",
  "Emil",
  "Frode",
  "Gabriel",
  "Halvard",
  "Ivar",
  "Jørgen",
  "Kaj",
  "Ludvig",
  "Marius",
  "Nicolay",
  "Ole",
  "Pål",
  "Rolf",
  "Steffen",
  "Tore",
  "Ulrikke",
  "Vidar",
  "William",
  "Xander",
  "Yngve",
  "Zacharias",
];
const surnames = [
  "Andersen",
  "Berg",
  "Christensen",
  "Dahl",
  "Eriksson",
  "Falk",
  "Gustafsson",
  "Hansen",
  "Iversen",
  "Jensen",
  "Karlsson",
  "Lind",
  "Madsen",
  "Nelson",
  "Olsen",
  "Pettersson",
  "Quist",
  "Rasmussen",
  "Svensson",
  "Thorsen",
  "Ulvsson",
  "Vik",
  "Wikström",
  "Ytterberg",
  "Zakariassen",
  "Åberg",
  "Älvgren",
  "Öberg",
  "Ahlgren",
  "Björk",
  "Carlsson",
  "Dahlberg",
  "Eklund",
  "Forsberg",
  "Gunnarsson",
  "Holm",
  "Isaksson",
  "Jansson",
  "Kvist",
  "Larsson",
  "Månsson",
  "Nilsson",
  "Olofsson",
  "Persson",
  "Rosenberg",
  "Sundberg",
  "Törnqvist",
  "Ullberg",
  "Vallgren",
  "Wahlberg",
  "Xenophontos",
  "Yngvesson",
  "Zachrisson",
  "Ødegård",
  "Åkesson",
  "Äng",
  "Öhman",
  "Aronsson",
  "Bäck",
  "Christiansen",
  "Dahlgren",
  "Engström",
  "Fransson",
  "Gustavsen",
  "Hedberg",
  "Isaksen",
  "Johansen",
  "Karlström",
  "Lindberg",
  "Magnusson",
  "Norberg",
  "Olsson",
  "Petersen",
  "Rönnqvist",
  "Sundström",
  "Tuvesson",
  "Ulfsdotter",
  "Vestergaard",
  "Westerberg",
  "Yttling",
  "Zakariasen",
  "Østergaard",
  "Åslund",
  "Ärlebäck",
  "Östlund",
  "Andersson",
  "Blomqvist",
  "Dahlström",
  "Ekström",
  "Fredriksson",
  "Gustavsson",
  "Hellström",
  "Jakobsen",
  "Karlberg",
  "Lindström",
  "Malm",
  "Nyberg",
  "Oskarsson",
  "Petterson",
  "Runeberg",
  "Söderberg",
  "Tranberg",
  "Ulrich",
  "Viklund",
  "Wallin",
  "Xiao",
  "Ytterström",
  "Zetterberg",
];
function generateName(
  femaleName: boolean,
  maleName: boolean,
  surName: boolean
) {
  const maleOrFemale = Math.floor(Math.random() * 2);

  var name = "";

  if (
    (!maleName && femaleName) ||
    (maleName && femaleName && maleOrFemale === 1)
  ) {
    name = femaleNames[Math.floor(Math.random() * (femaleNames.length - 1))];
  }
  if (
    (maleName && !femaleName) ||
    (maleName && femaleName && maleOrFemale === 0)
  ) {
    if (name) {
      name += " ";
    }
    name += maleNames[Math.floor(Math.random() * (maleNames.length - 1))];
  }
  if (surName) {
    if (name) {
      name += " ";
    }
    name += surnames[Math.floor(Math.random() * (surnames.length - 1))];
  }

  return name;
}

function createEmail(element: TextNode, company: any) {
  const text = figma.createText();
  text.y = element.y;
  text.x = element.x + 200;
  text.fills = element.fills;
  text.fontSize = element.fontSize;
  text.characters =
    element.characters.replace(/\s+/g, ".").toLowerCase() +
    "@" +
    company.domain;
  if (element.parent?.type === "FRAME") {
    element.parent.appendChild(text);
  } else {
    figma.currentPage.appendChild(text);
  }
}
function createCompany(element: TextNode, company: any) {
  const text = figma.createText();
  text.y = element.y;
  text.x = element.x + 500;
  text.fills = element.fills;
  text.fontSize = element.fontSize;
  text.characters = company.name;
  if (element.parent?.type === "FRAME") {
    element.parent.appendChild(text);
  } else {
    figma.currentPage.appendChild(text);
  }
}
async function createNames(y: number, name: string) {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  const text = figma.createText();
  text.y = y;
  text.x = 0;
  text.fills = [
    {
      type: "SOLID",
      color: {
        r: 1, // Red: 1
        g: 1, // Green: 1
        b: 1, // Blue: 1
      },
      opacity: 1,
    },
  ];

  text.characters = name;
  const figmaSelected = figma.currentPage.selection;
  if (figmaSelected[0].parent?.type === "FRAME") {
    figmaSelected[0].parent.appendChild(text);
  } else {
    figma.currentPage.appendChild(text);
  }
}

figma.ui.onmessage = async (params) => {
  if (params.msg == "createNames") {
    const viewportCenter = figma.viewport.center;
    var x = viewportCenter.x;
    var y = viewportCenter.y;
    for (let i = 0; i < params.createNamesNo; i++) {
      await createNames(
        y,
        generateName(params.femaleName, params.maleName, params.surName)
      );
      y = y + 30;
    }
    return;
  }

  if (figma.currentPage.selection.length === 0) {
    return figma.notify(
      "No text selected. Please select at least one text layer.",
      {
        timeout: 5000,
        button: {
          text: "Ok, I'll do that",
          action: () => {},
        },
      }
    );
  }
  figma.currentPage.selection.map(async (element) => {
    if (element.type === "TEXT") {
      await figma.loadFontAsync(element.fontName as FontName);
    } else {
      return element;
    }
    if (params.msg == "generateNames") {
      element.characters = generateName(
        params.femaleName,
        params.maleName,
        params.surName
      );
    }

    if (params.msg == "generateEmails") {
      const company =
        companies[Math.floor(Math.random() * (companies.length - 1))];
      createEmail(element, company);
    }
    if (params.msg == "generateEmailsAndCompany") {
      const company =
        companies[Math.floor(Math.random() * (companies.length - 1))];
      createEmail(element, company);
      createCompany(element, company);
    }

    return element;
  });
};
