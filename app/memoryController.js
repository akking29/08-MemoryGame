(function() {
	'use strict';

	angular
	  .module('memory')
	  .controller('mCtrl', mCtrl);

	mCtrl.$inject = ['$timeout'];

	function mCtrl($timeout) {
		var vm = this;

		var grid = 6 * 6;

		vm.cards = [];
		vm.flippedCard=[];
		//had to create duplicates for each card
		vm.names = ['Ray','Ray','Marie','Marie','Debra','Debra',
		'Mike & Jeff','Mike & Jeff','Peter','Peter','Stefania',
		'Stefania','Doug','Doug','Hank','Hank','Gianni','Gianni',
		'JoAnne','JoAnne','Janitor','Janitor','Pat','Pat',
		 'Father Husband', 'Father Husband', 'Andy', 'Andy',
		'Amy','Amy','Trina','Trina','Ally','Ally','Frank',
		'Frank','Robert','Robert'];


				//need to shuffle cards
				function shuffle(array) {
					  var m = array.length, t, i;

					  // While there remain elements to shuffle…
					  while (m) {

					    // Pick a remaining element…
					    i = Math.floor(Math.random() * m--);

					    // And swap it with the current element.
					    t = array[m];
					    array[m] = array[i];
					    array[i] = t;
					  }

					  return array;
					}
					//reset game
					vm.reset = function () {
						vm.cards=[];
						vm.flippedCard=[];
						vm.createCards();
						vm.cards = shuffle(vm.cards);
					};

		vm.createCards = function(){
			for(var i = 0; i < grid; i++){
				vm.cards.push({
					id: i,			//unique id
					flipped: false,	//ng-show/hide
					value: i % 2 == 0 ? i : i -1, //pair value
					disabled: false, //once a matching pair is found, disable this card
					names: vm.names[i]

				});

				vm.cards = shuffle(vm.cards);

			}
		}
			vm.flipCard = function(card){

				//precheck
				//check that current card has not already been selected
				var cardCurrentlyFlipped = false;
				vm.flippedCard.forEach(function(loopCard){
					if(card.id === loopCard.id){
						cardCurrentlyFlipped = true;
					}
				});
				
				if (!cardCurrentlyFlipped && vm.flippedCard.length < 2 && !card.disabled){

					//do this
				//1.flip the card over
				card.flipped = !card.flipped;
				//2. add cards to "currently flipped" array
				vm.flippedCard.push(card);
				//3.check to see if 2 cards are flipped
				if(vm.flippedCard.length === 2) {
					//True:
					//1.check if the value of the 2 currently flipped cards match
						if(vm.flippedCard[0].value === vm.flippedCard[1].value ){
							//If matched:
						//1.success a pair was found!
						//2. disable both cards so they remain flipped and cannot be clicked
						vm.flippedCard[0].disabled=true;
						vm.flippedCard[1].disabled=true;
						//3. clear the currently flipped array
						vm.flippedCard = [];

						var gameOver = vm.cards.every(function(loopCard){
							return loopCard.disabled;
						});

						if(gameOver){
							alert('game over!');
							vm.reset();
						}

					} else {
						//False
						$timeout(function(){

							vm.flippedCard[0].flipped= false;
							vm.flippedCard[1].flipped = false;

							vm.flippedCard = [];

						},1000);
					//After one second
						//set both cards in  currently flipped array to unflipped 
						//clear the currently flipped array
					}
					
				}
				
			}

		};

		vm.createCards();
		console.log(vm.cards);

	}

})();