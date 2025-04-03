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

var enemyEquipedTorso = "Loading"
var enemyEquipedLegs = "Loading"
var enemyEquipedWeapon = "Loading"


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

        enemyEquipedTorso = items[Math.floor(Math.random() * 3) + 3];
        enemyEquipedWeapon = items[Math.floor(Math.random() * 3)];
        enemyEquipedLegs = items[Math.floor(Math.random() * 3) + 6];

        console.log(EquipedTorso.name); // Log the equipped torso item to the console
        console.log(EquipedWeapon.name); // Log the equipped torso item to the console
        console.log(EquipedLegs.name); // Log the equipped torso item to the console

        document.getElementById("playerTorso").innerHTML = EquipedTorso.name;
        document.getElementById("playerWeapon").innerHTML = EquipedWeapon.name;
        document.getElementById("playerLegs").innerHTML = EquipedLegs.name;

        document.getElementById("enemyTorso").innerHTML = enemyEquipedTorso.name;
        document.getElementById("enemyWeapon").innerHTML = enemyEquipedWeapon.name;
        document.getElementById("enemyLegs").innerHTML = enemyEquipedLegs.name;


        maxHealth = parseInt(EquipedTorso.health) + parseInt(EquipedLegs.health);
        health = maxHealth;
        console.log(maxHealth)
        heatCapacity = parseInt(EquipedTorso.heat_capacity);
        heat = 0
        console.log(heatCapacity)
        energyCapacity = parseInt(EquipedTorso.energy_capacity);
        energy = energyCapacity
        console.log(energyCapacity)

        enemyMaxHealth = parseInt(enemyEquipedTorso.health) + parseInt(enemyEquipedLegs.health);
        enemyHealth = enemyMaxHealth;
        console.log(enemyMaxHealth)
        enemyHeatCapacity = parseInt(enemyEquipedTorso.heat_capacity);
        enemyHeat = 0
        console.log(enemyHeatCapacity)
        enemyEnergyCapacity = parseInt(enemyEquipedTorso.energy_capacity);
        enemyEnergy = enemyEnergyCapacity
        console.log(enemyEnergyCapacity)



        document.getElementById("playerHealthCounter").innerHTML = "HP: " + health + "/" + maxHealth;
        document.getElementById("playerHeatCounter").innerHTML = "Heat: " + heat + "/" + heatCapacity;
        document.getElementById("playerEnergyCounter").innerHTML = "Energy: " + energy + "/" + energyCapacity;

        document.getElementById("enemyHealthCounter").innerHTML = enemyHealth + "/" + enemyMaxHealth;
        document.getElementById("enemyHeatCounter").innerHTML = "Heat: " + enemyHeat + "/" + enemyHeatCapacity;
        document.getElementById("enemyEnergyCounter").innerHTML = "Energy: " + enemyEnergy + "/" + enemyEnergyCapacity;
    })
    .catch(error => console.error("Error fetching items.json:", error));
}

function updateBattleStats() {
    fetch('/static/json/items.json')
    .then(response => response.json()) // Parse the JSON data
    .then(items => {

        health -= 0;

        document.getElementById("playerHealthCounter").innerHTML = "HP: " + health + "/" + maxHealth;
        document.getElementById("playerHeatCounter").innerHTML = "Heat: " + heat + "/" + heatCapacity;
        document.getElementById("playerEnergyCounter").innerHTML = "Energy: " + energy + "/" + energyCapacity;

        document.getElementById("enemyHealthCounter").innerHTML = enemyHealth + "/" + enemyMaxHealth;

        document.getElementById("playerHealthBarColor").style.width = (health / maxHealth) * 100 + "%";
    })
    .catch(error => console.error("Error fetching items.json:", error));
}