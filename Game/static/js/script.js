var gold = 0;
var diamonds = 0;

if (window.location.pathname !== '/battle') {
    function onstart() {
        document.getElementById("gold").innerHTML = "Gold " + gold;
        document.getElementById("diamonds").innerHTML = "Diamonds " +  diamonds;
    }

    onstart();
}



fetch('/static/json/items.json')
    .then(response => response.json()) // Parse the JSON data
    .then(items => {
        console.log(items); // Log the items to the console

        // Example: Display the first item's name
        //document.body.innerHTML += `<p>First Item: ${items[0].name}</p>`;
    })
    .catch(error => console.error("Error fetching items.json:", error));


if (window.location.pathname === '/battle') {
    console.log("hello words")
}