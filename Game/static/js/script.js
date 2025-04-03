var gold = 0;
var diamonds = 0;

if (window.location.pathname !== '/battle') {
    function onstart() {
        document.getElementById("gold").innerHTML = "Gold " + gold;
        document.getElementById("diamonds").innerHTML = "Diamonds " +  diamonds;
    }

    onstart();
}

var EquipedTorso = "Loading"
var EquipedLegs = "Loading"
var EquipedWeapon = "Loading"


if (window.location.pathname === '/battle') {
    initiateBattle();

    updateBattleStats();
}

function initiateBattle() {
    fetch('/static/json/items.json')
    .then(response => response.json()) // Parse the JSON data
    .then(items => {
        console.log(items); // Log the items to the console

        EquipedTorso = items[3];
        EquipedWeapon = items[0];
        EquipedLegs = items[6];

        console.log(EquipedTorso.name); // Log the equipped torso item to the console
        console.log(EquipedWeapon.name); // Log the equipped torso item to the console
        console.log(EquipedLegs.name); // Log the equipped torso item to the console

        document.getElementById("playerTorso").innerHTML = EquipedTorso.name;
        document.getElementById("playerWeapon").innerHTML = EquipedWeapon.name;
        document.getElementById("playerLegs").innerHTML = EquipedLegs.name;


        maxHealth = parseInt(EquipedTorso.health) + parseInt(EquipedLegs.health);
        health = maxHealth;
        console.log(maxHealth)



        document.getElementById("playerHealthCounter").innerHTML = health + "/" + maxHealth;
    })
    .catch(error => console.error("Error fetching items.json:", error));
}

function updateBattleStats() {
    fetch('/static/json/items.json')
    .then(response => response.json()) // Parse the JSON data
    .then(items => {

        //health -= 15;

        document.getElementById("playerHealthCounter").innerHTML = health + "/" + maxHealth;
    })
    .catch(error => console.error("Error fetching items.json:", error));
}