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

fetch('/static/json/items.json')
    .then(response => response.json()) // Parse the JSON data
    .then(items => {
        console.log(items); // Log the items to the console

        var EquipedTorso = items[3];
        var EquipedLegs = items[6];
        var EquipedWeapon = items[0];

        console.log(EquipedTorso.name); // Log the equipped torso item to the console
        console.log(EquipedLegs.name); // Log the equipped torso item to the console
        console.log(EquipedWeapon.name); // Log the equipped torso item to the console
    })
    .catch(error => console.error("Error fetching items.json:", error));


if (window.location.pathname === '/battle') {
    initiateBattle();

    updateBattleStats();
}

function initiateBattle() {
    console.log("")
}

function updateBattleStats() {
    document.getElementById("torso").innerHTML = "asd"
}