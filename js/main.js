document.getElementById("mainTitle").innerText = "Point and Click adventure game";

//Game window reference
const gameWindow = document.getElementById("gameWindow");

//Game state
gameState = {
    "door2locked": true,
    "inventory": [
    ]
}

const sec = 1000;
//game over
const gameover = document.getElementById("gameover");
const tilemap = document.getElementById("tilemap");
//Main Character
const mainCharacter = document.getElementById("mainCharacter");
const offsetCharacter = 16;

//speech bubbles
const mainCharacterSpeech = document.getElementById("mainCharacterSpeech");
const counterSpeech = document.getElementById("counterSpeech");
const counterAvatarImg = document.getElementById("counterAvatarImg");
const counterAvatarImg2 = document.getElementById("counterAvatarImg2");
const counterAvatarImg3 = document.getElementById("counterAvatarImg3");
const mcAudio = document.getElementById("mcAudio");
const cAudio = document.getElementById("cAudio");
//Inventory
const inventoryBox = document.getElementById("inventoryBox"); //div
const inventoryList = document.getElementById("inventoryList"); //ul

//Foreground Items
const door1 = document.getElementById("door1");
const sign = document.getElementById("sign");


gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    if (e.target.id !== "mcImage") {
        mainCharacter.style.left = x - offsetCharacter + "px";
        mainCharacter.style.top = y - offsetCharacter + "px";
    }

    console.log(e.target.id);
    switch (e.target.id) {

        case "door1":
            showMessage(mainCharacterSpeech, mcAudio, "Hey I heard there was a torch here?");
            setTimeout(function () { counterAvatarImg2.style.opacity = 1; }, 4 * sec);
            setTimeout(showMessage, 4 * sec, counterSpeech, cAudio, "hmm did that weird mushroom guy send you here?");
            setTimeout(showMessage, 8 * sec, mainCharacterSpeech, mcAudio, "Yeah but can you give the torch to me");
            setTimeout(showMessage, 12 * sec, counterSpeech, cAudio, "Fine fine I owe him one so ill give it to ya");
            setTimeout(function () { counterAvatarImg2.style.opacity = 0; }, 16 * sec);
            changeInventory('Torch', 'delete');
            changeInventory('Torch', 'add');
            break;
        

            break;
        case "door2":
            if (gameState.door2locked == true) {
                // check if we have key
                if (document.getElementById("inv-Torch") !== null) {
                    //yes -> unlock door?
                    gameState.door2locked = false;
                    changeInventory('Torch', 'delete');
                    showMessage(mainCharacterSpeech, mcAudio, "Time to find out if theres any treasure in here");
                    setTimeout(function () { counterAvatarImg.style.opacity = 1; }, 4 * sec);
                    setTimeout(showMessage, 4 * sec, counterSpeech, cAudio, "Who dares to wake me up");
                    setTimeout(showMessage, 8 * sec, mainCharacterSpeech, mcAudio, "Hello sir may I take the treasure that is in this cave?");
                    setTimeout(showMessage, 12 * sec, counterSpeech, cAudio, "You foolish human you will now die!");
                    setTimeout(function () { counterAvatarImg.style.opacity = 0; }, 16 * sec);
                    setTimeout(function () { gameover.style.opacity = 1; }, 17 * sec);
                    setTimeout(function () { tilemap.style.opacity = 0; }, 17 * sec);

                } else {
                    //no -> alert 'door locked'
                    alert("Its dark lets turn back!");
                }
            } else {
                console.log('enter building');
            }

            break;


        case "mush":
            showMessage(mainCharacterSpeech, mcAudio, "Hey anyone there?");
            setTimeout(function () { counterAvatarImg.style.opacity = 1; }, 4 * sec);
            setTimeout(showMessage, 4 * sec, counterSpeech, cAudio, "Stop shouting were sleeping here");
            setTimeout(showMessage, 8 * sec, mainCharacterSpeech, mcAudio, "Fine fine any hints on where to find a torch?");
            setTimeout(showMessage, 12 * sec, counterSpeech, cAudio, "You should check the southern clocktower..");
            setTimeout(function () { counterAvatarImg.style.opacity = 0; }, 16 * sec);
            break;

        default:
           


            
            break;

    }

}

/**
 * function to change inventory
 * @param {string} itemName 
 * @param {string} action "add", "delete"
 * @returns 
 */
function changeInventory(itemName, action) {
    if (itemName == null || action == null) {
        console.log('wrong parameters given to changeInventory()');
        return
    }

    switch (action) {
        case 'add':
            gameState.inventory.push(itemName);
            break
        case 'delete':
            gameState.inventory.find(function (item, index) {
                if (item == itemName) {
                    var index = gameState.inventory.indexOf(item);
                    if (index !== -1) {
                        gameState.inventory.splice(index, 1);
                    }
                }
            })
            break

        default:
            break;
    }
    updateInventory(gameState.inventory, inventoryList);
}

/**
 * update inventoryList
 * @param {Array} inventory array of items 
 * @param {HTMLElement} inventoryList html <ul> element 
 */
function updateInventory(inventory, inventoryList) {
    inventoryList.innerHTML = '';
    inventory.forEach(function (item) {
        const inventoryItem = document.createElement("li");
        inventoryItem.id = "inv-" + item;
        inventoryItem.innerText = item;
        inventoryList.appendChild(inventoryItem);
    })
}

/**
 * Shows a message in a speech bubble
 * @param {getElementById} targetBalloon 
 * @param {getElementById} targetSound 
 * @param {string} message 
 */
function showMessage(targetBalloon, targetSound, message) {
    targetSound.currentTime = 0;
    targetSound.play();
    targetBalloon.style.opacity = "1";
    targetBalloon.innerText = message;
    setTimeout(hideMessage, 4 * sec, targetBalloon, targetSound);
}

/**
 * Set the opacity to 0
 * @param {getElementById} targetBalloon 
 * @param {getElementById} targetSound 
 */
function hideMessage(targetBalloon, targetSound) {
    targetSound.pause();
    targetBalloon.style.opacity = "0";
}