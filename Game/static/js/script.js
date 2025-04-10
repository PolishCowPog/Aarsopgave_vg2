var gold = 0;
var diamonds = 0;

if (window.location.pathname !== '/battle/') {
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


if (window.location.pathname === '/battle/') {
    initiateBattle();

    updateBattleStats();
}

function initiateBattle() {
    fetch('/static/json/items.json')
    .then(response => response.json()) // Parse the JSON data
    .then(items => {
        console.log(items); // Log the items to the console

        EquipedTorso = items[3];
        EquipedWeapon = items[2];
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

        document.getElementById("playerTorsoImage").src = "/static/images/torso/" + EquipedTorso.image;
        document.getElementById("playerWeaponImage").src = "/static/images/lowerWeapons/" + EquipedWeapon.image;
        document.getElementById("playerLegsImage").src = "/static/images/Legs/" + EquipedLegs.image;
        document.getElementById("playerLegsImage2").src = "/static/images/Legs/" + EquipedLegs.image;

        document.getElementById("enemyTorsoImage").src = "/static/images/torso/" + enemyEquipedTorso.image;
        document.getElementById("enemyWeaponImage").src = "/static/images/lowerWeapons/" + enemyEquipedWeapon.image;
        document.getElementById("enemyLegsImage").src = "/static/images/Legs/" + enemyEquipedLegs.image;
        document.getElementById("enemyLegsImage2").src = "/static/images/Legs/" + enemyEquipedLegs.image;
    })
    .catch(error => console.error("Error fetching items.json:", error));
}

function updateBattleStats() {
    fetch('/static/json/items.json')
    .then(response => response.json()) // Parse the JSON data
    .then(items => {

        document.getElementById("playerHealthCounter").innerHTML = "HP: " + health + "/" + maxHealth;
        document.getElementById("playerHeatCounter").innerHTML = "Heat: " + heat + "/" + heatCapacity;
        document.getElementById("playerEnergyCounter").innerHTML = "Energy: " + energy + "/" + energyCapacity;
        
        document.getElementById("playerHealthBarColor").style.width = (health / maxHealth) * 100 + "%";
        document.getElementById("playerHeatBarColor").style.width = (heat / heatCapacity) * 100 + "%";
        document.getElementById("playerEnergyBarColor").style.width = (energy / energyCapacity) * 100 + "%";


        document.getElementById("enemyHealthCounter").innerHTML = enemyHealth + "/" + enemyMaxHealth;
        document.getElementById("enemyHeatCounter").innerHTML = "Heat: " + enemyHeat + "/" + enemyHeatCapacity;
        document.getElementById("enemyEnergyCounter").innerHTML = "Energy: " + enemyEnergy + "/" + enemyEnergyCapacity;

        document.getElementById("enemyHealthBarColor").style.width = (enemyHealth / enemyMaxHealth) * 100 + "%";
        document.getElementById("enemyHeatBarColor").style.width = (enemyHeat / enemyHeatCapacity) * 100 + "%";
        document.getElementById("enemyEnergyBarColor").style.width = (enemyEnergy / enemyEnergyCapacity) * 100 + "%";



        
    })
    .catch(error => console.error("Error fetching items.json:", error));
}

attackButton = document.getElementById("playerAttack")
attackButton.addEventListener("click", attack)

var player_turns = 2
var enemy_turns = 0

function attack(){
    fetch('/static/json/items.json')
    .then(response => response.json()) // Parse the JSON data
    .then(items => {


        if (player_turns > 0){
            player_turns -= 1
            enemyHealth -= EquipedWeapon.physical_damage + EquipedWeapon.electric_damage + EquipedWeapon.heat_damage
            enemyHeat += EquipedWeapon.heat_damage
            enemyEnergy -= EquipedWeapon.electric_damage

            heat += EquipedWeapon.self_heat
            energy -= EquipedWeapon.self_energy_drain
        }
        if (player_turns == 0){
            if (enemyHeat >= enemyHeatCapacity*0.8){
                enemyHeat = 0
            }
        }

        updateBattleStats();
    })
    .catch(error => console.error("Error fetching items.json:", error));
}



