// Objet contenant les options disponibles (à adapter selon tes fichiers réels)
const avatarOptions = {
  accessories: ["earings.png", "flower.png", "glasses.png", "headphone.png"],
  backgrounds: ["blue50.png", "blue60.png", "blue70.png", "darkblue30.png", "darkblue50.png", "darkblue70.png",  "green50.png", "green60.png", "green70.png", "grey40.png", "grey70.png", "grey80.png", "red50.png", "red60.png", "red70.png", "yellow50.png", "yellow60.png", "yellow70.png"],
  ears: ["default.png", "tilt-backward.png","tilt-forward.png"],
  eyes: ["angry.png", "default.png","naughty.png","panda.png","smart.png","star.png"],
  hair: ["bang.png", "curls.png","default.png","elegant.png","fancy.png","quiff.png","short.png"],
  leg: ["default.png", "bubble-tea.png","cookie.png","game-console.png"],
  mouth: ["astonished.png", "default.png","eating.png","laugh.png","tongue.png"],
  neck: ["bend-backward.png", "bend-forward.png","default.png","thick.png"],
  // nose est fixe
};

function onPartChange(part, value) {
  setLayer(part, value);
}

// Fonction pour appliquer un élément sur le calque correspondant
function setLayer(part, filename) {
  document.getElementById(part).src = `assets/${part}/${filename}`;
}

// Randomisation des parties
function randomizeAvatar() {
  for (const part in avatarOptions) {
    const options = avatarOptions[part];
    const choice = options[Math.floor(Math.random() * options.length)];
    setLayer(part, choice);
  }
}

// Générer une image combinée à partir des calques
function downloadAvatar() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;

  const parts = [
    "backgrounds",
    "neck",
    "leg",
    "hair",
    "ears",
    "eyes",
    "mouth",
    "accessories",
    "nose",
  ];

  let loaded = 0;
  const images = [];

  // Charger les images une par une
  parts.forEach((id, i) => {
    const img = document.getElementById(id);
    const temp = new Image();
    temp.src = img.src;
    temp.onload = () => {
      images[i] = temp;
      loaded++;
      if (loaded === parts.length) {
        // Dessiner chaque image sur le canvas
        images.forEach((image) => {
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        });
        const link = document.createElement("a");
        link.download = "mon-alpaga.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
    };
  });
}