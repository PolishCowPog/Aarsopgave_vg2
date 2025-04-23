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
var EquipedWeapon2 = "Loading"

var enemyEquipedTorso = "Loading"
var enemyEquipedLegs = "Loading"
var enemyEquipedWeapon = "Loading"
var enemyEquipedWeapon2 = "Loading"


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
        EquipedWeapon2 = items[1];

        EquipedLegs = items[6];

        enemyEquipedTorso = items[Math.floor(Math.random() * 3) + 3];
        enemyEquipedWeapon = items[Math.floor(Math.random() * 3)];
        enemyEquipedLegs = items[Math.floor(Math.random() * 3) + 6];

        console.log(EquipedTorso.name); // Log the equipped torso item to the console
        console.log(EquipedWeapon.name); // Log the equipped torso item to the console
        console.log(EquipedLegs.name); // Log the equipped torso item to the console


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
        document.getElementById("playerWeaponImage2").src = "/static/images/lowerWeapons/" + EquipedWeapon2.image;
        document.getElementById("playerLegsImage").src = "/static/images/Legs/" + EquipedLegs.image;
        document.getElementById("playerLegsImage2").src = "/static/images/Legs/" + EquipedLegs.image;

        document.getElementById("attack1Image").src = "/static/images/lowerWeapons/" + EquipedWeapon.image;
        document.getElementById("attack2Image").src = "/static/images/lowerWeapons/" + EquipedWeapon2.image;

        document.getElementById("enemyTorsoImage").src = "/static/images/torso/" + enemyEquipedTorso.image;
        document.getElementById("enemyWeaponImage").src = "/static/images/lowerWeapons/" + enemyEquipedWeapon.image;
        document.getElementById("enemyLegsImage").src = "/static/images/Legs/" + enemyEquipedLegs.image;
        document.getElementById("enemyLegsImage2").src = "/static/images/Legs/" + enemyEquipedLegs.image;


        document.getElementById("turn1").style.backgroundColor = "#3fc43f"
        document.getElementById("turn2").style.backgroundColor = "#3fc43f"
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
        if (heat > heatCapacity){
            document.getElementById("playerHeatBarColor").style.width = 100 + "%";
        }
        if (heat <= 0){
            document.getElementById("playerHeatBarColor").style.width = 0 + "%";
        }
        document.getElementById("playerEnergyBarColor").style.width = (energy / energyCapacity) * 100 + "%";
        if (energy > energyCapacity){
            document.getElementById("playerEnergyBarColor").style.width = 100 + "%";
        }
        if (energy <= 0){
            document.getElementById("playerEnergyBarColor").style.width = 0 + "%";
        }


        document.getElementById("enemyHealthCounter").innerHTML = "HP: " + enemyHealth + "/" + enemyMaxHealth;
        document.getElementById("enemyHeatCounter").innerHTML = "Heat: " + enemyHeat + "/" + enemyHeatCapacity;
        document.getElementById("enemyEnergyCounter").innerHTML = "Energy: " + enemyEnergy + "/" + enemyEnergyCapacity;

        document.getElementById("enemyHealthBarColor").style.width = (enemyHealth / enemyMaxHealth) * 100 + "%";
        document.getElementById("enemyHeatBarColor").style.width = (enemyHeat / enemyHeatCapacity) * 100 + "%";
        if (enemyHeat > enemyHeatCapacity){
            document.getElementById("enemyHeatBarColor").style.width = 100 + "%";
        }
        if (enemyHeat <= 0){
            document.getElementById("enemyHeatBarColor").style.width = 0 + "%";
        }
        document.getElementById("enemyEnergyBarColor").style.width = (enemyEnergy / enemyEnergyCapacity) * 100 + "%";
        if (enemyEnergy > enemyEnergyCapacity){
            document.getElementById("enemyEnergyBarColor").style.width = 100 + "%";
        }
        if (enemyEnergy <= 0){
            document.getElementById("enemyEnergyBarColor").style.width = 0 + "%";
        }



        if (player_turns == 2){
            document.getElementById("turn1").style.backgroundColor = "#3fc43f"
            document.getElementById("turn2").style.backgroundColor = "#3fc43f"
        }
        if (player_turns == 1){
            document.getElementById("turn2").style.backgroundColor = "#365736"
        }
        if (player_turns == 0){
            document.getElementById("turn1").style.backgroundColor = "#365736"
            document.getElementById("turn2").style.backgroundColor = "#365736"
        }

        
    })
    .catch(error => console.error("Error fetching items.json:", error));
}

attackButton = document.getElementById("attack1")
attackButton.addEventListener("click", attack1)
attackButton2 = document.getElementById("attack2")
attackButton2.addEventListener("click", attack2)

var player_turns = 2
player_active = true
var enemy_turns = 0

function attack1(){
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



        if (player_turns == 0 && player_active == true){
            player_active = false
            enemy_turns = 2
            energy += EquipedTorso.electric_regen
            if (energy > energyCapacity){
                energy = energyCapacity
            }
            setTimeout(function (){
                enemyAttack()         
            }, 2000);
            setTimeout(function (){
                enemyAttack()
                player_active = true         
            }, 3000);
        }

        updateBattleStats();
    })
    .catch(error => console.error("Error fetching items.json:", error));
}
function attack2(){
    fetch('/static/json/items.json')
    .then(response => response.json()) // Parse the JSON data
    .then(items => {
        if (player_turns > 0){
            player_turns -= 1
            enemyHealth -= EquipedWeapon2.physical_damage + EquipedWeapon2.electric_damage + EquipedWeapon2.heat_damage
            enemyHeat += EquipedWeapon2.heat_damage
            enemyEnergy -= EquipedWeapon2.electric_damage

            heat += EquipedWeapon2.self_heat
            energy -= EquipedWeapon2.self_energy_drain
        }



        if (player_turns == 0 && player_active == true){
            player_active = false
            enemy_turns = 2
            energy += EquipedTorso.electric_regen
            if (energy > energyCapacity){
                energy = energyCapacity
            }
            setTimeout(function (){
                enemyAttack()         
            }, 2000);
            setTimeout(function (){
                enemyAttack()
                player_active = true         
            }, 3000);
        }

        updateBattleStats();
    })
    .catch(error => console.error("Error fetching items.json:", error));
}
function enemyAttack(){
    fetch('/static/json/items.json')
    .then(response => response.json()) // Parse the JSON data
    .then(items => {


        if (enemy_turns > 0){
            if (enemyHeat < enemyHeatCapacity*0.8){
                enemy_turns -= 1
                health -= enemyEquipedWeapon.physical_damage + enemyEquipedWeapon.electric_damage + enemyEquipedWeapon.heat_damage
                heat += enemyEquipedWeapon.heat_damage
                energy -= enemyEquipedWeapon.electric_damage
    
                enemyHeat += enemyEquipedWeapon.self_heat
                enemyEnergy -= enemyEquipedWeapon.self_energy_drain
            }
            else{
                enemy_turns -= 1
                enemyHeat -= enemyEquipedTorso.cooling
            }
        }
        if (enemy_turns == 0){
            player_turns = 2
            enemyEnergy += enemyEquipedTorso.electric_regen
            if (enemyEnergy > enemyEnergyCapacity){
                enemyEnergy = enemyEnergyCapacity
            }
        }

        updateBattleStats();
    })
    .catch(error => console.error("Error fetching items.json:", error));
}