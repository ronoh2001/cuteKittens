var voter = function () {
  this.cat = [];
  this.player = [0,0];
};

voter.prototype.Contest = function() {
  $('.cat_pic').children().remove();
  this.pickPlayers();
  this.getVote();
};

voter.prototype.pickPlayers = function() {
   this.player = [0,0];
  while (this.player[0] == this.player[1]) {
    this.player[0] = Math.floor(Math.random()*14);
    this.player[1] = Math.floor(Math.random()*14);
  }
  $('#player1').append("<img id=\"left\" src=\"images/" + this.player[0] + ".jpg\"/><br><br><p>Cat " + (this.player[0] + 1) + "</p>");
  $('#player2').append("<img id=\"right\" src=\"images/" + this.player[1] + ".jpg\"/><br><br><p>Cat " + (this.player[1] + 1) + "</p>");
return this.player;
};

voter.prototype.getVote = function () {
  $('#left').on({'click': function() {
    play.cat[play.player[0]]++;
    console.log ("after click L", play.cat)
    save();
    play.Contest();
    }
  });
  $('#right').on({'click': function() {
    play.cat[play.player[1]] ++;
    console.log ("after click R", play.cat);
    save();
    play.Contest();
    }
  });
};

var chart = function() {
  var barData = {
      labels : ["Cat 1","Cat 2","Cat 3","Cat 4","Cat 5","Cat 6", "Cat 7", "Cat 8", "Cat 9", "Cat 10", "Cat 11", "Cat 12", "Cat 13", "Cat 14"],
      datasets : [
          {
              fillColor : "#48A497",
              strokeColor : "#48A4D1",
              data : play.cat
          },
      ]
  }
  var cats = $("#cats")[0].getContext("2d");
  new Chart(cats).Bar(barData);
};

var save = function() {
  var cuteCat = JSON.stringify(play.cat)
  localStorage.cuteCat = cuteCat;
  chart();
};

var play = new voter();
$('#reset').on({'click': function() {
      for (var i=0; i<14; i++) {
      play.cat[i] = 0;
    }
    save();
  }
});
if (localStorage.cuteCat) {
  play.cat = JSON.parse(localStorage.cuteCat);
} else {
  for (var i=0; i<14; i++) {
    play.cat[i] = 0;
  }
};
chart();
play.Contest();