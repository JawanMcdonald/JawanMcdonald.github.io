var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;
        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'sawblade',x:400,y:375},
                {type: 'sawblade',x:600,y:470},
                {type: 'sawblade',x:1200,y:470},
                {type: 'enemy',x:400,y:-10},
                {type: 'enemy',x:800,y:-100},
                {type: 'enemy',x:1200,y:-50},
                {type: 'reward',x:400,y:-10},
                {type: 'reward',x:600,y:470},
                {type: 'reward',x:530,y:330}
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
var hitZoneSize = 25;
var damageFromObstacle = 10;


function createSawBlade(x,y) {
    var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
    myObstacle.x = x;
    myObstacle.y = y;
    game.addGameItem(myObstacle);
    var obstacleImage = draw.bitmap('img/sawblade.png');
    myObstacle.addChild(obstacleImage);
    obstacleImage.x = -25;
    obstacleImage.y = -25;
    }
    function createEnemy(x, y) {
    var enemy =  game.createGameItem('enemy',25);
var redSquare = draw.rect(50,50,'red');
redSquare.x = -25;
redSquare.y = -25;
enemy.addChild(redSquare);
enemy.x = 400;
enemy.y = groundY-50;
enemy.velocityX = -1;
enemy.rotationalVelocity =10;
game.addGameItem(enemy);

enemy.onPlayerCollision = function() {
    console.log('The enemy has hit Halle');
    game.changeIntegrity(-10);
    enemy.fadeOut();
};
 enemy.onProjectileCollision = function() {
     console.log('Hallebot has hit the enemy!');
     game.increaseScore(100);
     enemy.fadeOut();
 };    
}

function createReward(x,y){
var reward = game.createGameItem('reward',25);
var rewardImage = draw.rect(50,50,'green');
rewardImage.x = -25;
rewardImage.y = -25;
reward.addChild(rewardImage);
reward.x = 400;
reward.y = groundY-50;
reward.velocityX = -1;
game.addGameItem(reward);

reward.onPlayerCollision = function() {
  console.log('Hallebot got points!');
  game.increaseScore(50);
  reward.fadeOut();
};    
}

    
    
    
    
    
    
    
    
    
    for( var j = 0; j < levelData.gameItems.length; j ++) {
        var gameItem = levelData.gameItems[j];
        if (levelData.gameItems[j].type === 'sawblade'){
            createSawBlade(gameItem.x, gameItem.y);
            }
            if (levelData.gameItems[j].type === 'enemy'){
               createEnemy(gameItem.x, gameItem.y);
            }
            if (levelData.gameItems[j].type === 'reward'){
                createReward(gameItem.x, gameItem.y);
            }
    }

   };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}