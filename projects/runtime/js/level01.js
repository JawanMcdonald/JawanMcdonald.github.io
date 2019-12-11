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
                {type: 'enemy',x:3100,y:groundY-50},
                {type: 'enemy',x:1930,y:groundY-50},
                {type: 'enemy',x:1290,y:groundY-50},
                {type: 'reward',x:2500,y:groundY-20},
                {type: 'reward',x:3629,y:groundY - 47},
                {type: 'reward',x:2110,y:groundY - 138}
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
            var redSquare = draw.bitmap("https://gamepedia.cursecdn.com/smite_gamepedia/thumb/c/cb/Enemy_eSports_logo.png/250px-Enemy_eSports_logo.png?version=cd11b74e68d84dbd96ba628f530e5577");
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            enemy.velocityX = -1;
            //rotationalVelocity =10;
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
    var rewardImage = draw.bitmap("https://i1.wp.com/freepngimages.com/wp-content/uploads/2015/10/gold-trophy-transparent-background.png?fit=486%2C598");
    rewardImage.x = -25;
    rewardImage.y = -25;
    rewardImage.scaleX = .3;
    rewardImage.scaleY = .3;
    reward.addChild(rewardImage);
    reward.x = x;
    reward.y = y;
    reward.velocityX = -1;
    game.addGameItem(reward);
    
    reward.onProjectileCollision =function(){
        console.log("Hallebot has destroyed the reward");
        //reward.fadeOut();
    };
    reward.onPlayerCollision = function() {
      console.log('Hallebot got points!');
      game.increaseScore(1000);
      reward.fadeOut();
    };
    

 //reward.onProjectileCollision = function() {

 //};
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