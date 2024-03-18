
// Variables
var totalEnCours = 0; // Variable pour stocker le total en cours
var zero = "0"; // Tampon pour stocker la valeur affichée sur l'écran
var operateurPrecedent; // Variable pour stocker l'opérateur précédent
var etat = "allumé"; // État actuel de la calculatrice


const ecran = document.querySelector('.ecran'); // Sélectionne l'élément d'affichage sur l'écran

// Fonction pour traiter les clics sur les boutons
function clicBouton(valeur) {
  if (valeur == "F") {
    if (etat == "allumé") {
      etat = "éteint";
      ecran.innerText = "Éteint";
      // Désactive les boutons
      document.querySelector(".boutons").classList.add("désactivé");
      operateurPrecedent = null; // Réinitialise l'opérateur précédent
      totalEnCours = 0; // Réinitialise le total en cours
      zero = "0";
    } else {
      etat = "allumé";
      ecran.innerText = "0";
      // Active les boutons
      document.querySelector(".boutons").classList.remove("désactivé");
    }
    return;
  }

  if (etat == "éteint") {
    // Ignore les autres boutons si la calculatrice est éteinte
    return;
  }

  if (isNaN(valeur)) {
    // Traitement des symboles
    traiterSymbole(valeur);
  } else {
    // Traitement des nombres
    traiterNombre(valeur);
  }

  ecran.innerText = zero; // Met à jour l'affichage sur l'écran
}

// Fonction pour traiter les symboles (C, =, F, +, -, ×, ÷)
function traiterSymbole(symbole) {
  switch (symbole) {
    case "C":
      // Efface tout et réinitialise les variables
      zero = "0";
      totalEnCours = 0;
      operateurPrecedent = null;
      break;
    case "=":
      // Égal - effectue le calcul et met à jour le total en cours
      if (operateurPrecedent == null) {
        return;
      }
      effectuerOperation(parseInt(zero));
      operateurPrecedent = null;
      zero = totalEnCours;
      totalEnCours = 0;
      break;
    case "F":
      // Fonctionnalité "Éteindre" gérée dans la fonction clicBouton
      zero = "0";
      totalEnCours = 0;
      operateurPrecedent = null;
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
      // Opérateurs mathématiques - effectue le calcul si nécessaire
      traiterMath(symbole);
      break;
  }
}

// Fonction pour traiter les opérateurs mathématiques (+, -, ×, ÷)
function traiterMath(symbole) {
  if (zero == "0") {
    return;
  }

  const intZero = parseInt(zero);

  if (totalEnCours == 0) {
    // Si le total en cours est 0, initialise-le avec la valeur du Zero
    totalEnCours = intZero;
  } else {
    // Sinon, effectue l'opération en cours avec la valeur du Zero
    effectuerOperation(intZero);
  }
  operateurPrecedent = symbole;
  zero = "0";
}

// Fonction pour effectuer l'opération en cours
function effectuerOperation(intZero) {
  if (operateurPrecedent == "+") {
    totalEnCours += intZero;
  } else if (operateurPrecedent == "-") {
    totalEnCours -= intZero;
  } else if (operateurPrecedent == "×") {
    totalEnCours *= intZero;
  } else if (operateurPrecedent == "÷") {
    totalEnCours /= intZero;
  }
}

// Fonction pour traiter les nombres
function traiterNombre(chaineNombre) {
  if (zero == "0") {
    zero = chaineNombre;
  } else {
    zero += chaineNombre;
  }
}

// Fonction d'initialisation, ajoutant un écouteur d'événements aux boutons de la calculatrice
function initialiser() {
  document.querySelector(".boutons").addEventListener("click", function (event) {
      clicBouton(event.target.innerText);
    });
}

// Appelle la fonction d'initialisation au chargement de la page
initialiser();




