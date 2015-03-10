(function(){
  var Snakes = window.Snakes = window.Snakes || {};

  var Coord = Snakes.Coord = function(pos) {
    this.row = pos[0];
    this.col = pos[1];
    // this.apple = apple;
  };

  Coord.prototype = {
    plus : function(coord) {
      this.row += coord.row;
      this.col += coord.col;
    }
  };

  var Snake = Snakes.Snake = function() {
    this.dir = "E";
    this.segments = [new Coord([5, 5])];
    this.apples = [new Coord([20, 13])];
    this.size = 1;
    setInterval(this.apple.bind(this), 5000);
    // setInterval(function(){this.size += 1}.bind(this), 2000);
  };

  Snake.DIRS = ["N", "E", "S", "W"];

  Snake.prototype = {
    move : function() {
      var currentDir = this.dir
      var that = this;
      var segment = this.segments[this.segments.length-1];
      // this.segments.map(function(segment) {
        switch (currentDir) {
          case "N":
            var newSegment = new Coord([segment.row, segment.col]);
            newSegment.plus({row: -1, col: 0});
            that.segments.push(newSegment);
            if (that.segments.length > that.size)
              that.segments.shift();
            break;
          case "S":
            var newSegment = new Coord([segment.row, segment.col]);
            newSegment.plus({row: 1, col: 0});
            that.segments.push(newSegment);
            if (that.segments.length > that.size)
              that.segments.shift();
            break;
          case "W":
            var newSegment = new Coord([segment.row, segment.col]);
            newSegment.plus({row: 0, col: -1});
            that.segments.push(newSegment);
            if (that.segments.length > that.size);
              that.segments.shift();
            break;
          case "E":
            var newSegment = new Coord([segment.row, segment.col]);
            newSegment.plus({row: 0, col: 1});
            that.segments.push(newSegment);
            if (that.segments.length > that.size)
              that.segments.shift();
            break;
          default:
            console.log("Snake is moving!");
        }
      // });
    },

    turn : function(newDir) {
      this.dir = newDir;
    },

    apple : function() {
      if (this.apples.length === 0){
        var uniqueSegment = false
        var that = this;
        // console.log(this.segments);
        while (!uniqueSegment) {
          uniqueSegment = true
          var x = Math.floor((Math.random() * 24) + 1);
          var y = Math.floor((Math.random() * 39) + 1);
          that.segments.map(function(segment){
            if (segment.row === x && segment.col === y)
              uniqueSegment = false;
          });
        }
        var appleSegment = new Coord([x, y]);
        // console.log(appleSegment);
        this.apples.push(appleSegment);
      }
    },

    grow : function() {
      if (this.apples.length > 0){
        var segment = this.segments[this.segments.length-1];
        var apple = this.apples[0];
        if (segment.row === apple.row && segment.col === apple.col){
          this.size += 1;
          this.apples.shift();
        }
      }
    },

    collision : function() {
      var snakeHead = this.segments[this.segments.length-1];
      var trueOrFalse = false;
      this.segments.map(function(segment){
        if (segment !== snakeHead && segment.row === snakeHead.row && segment.col === snakeHead.col){
          // console.log("collision");
          trueOrFalse = true;
        }
        if (segment.row < 0 || segment.col < 0 || segment.row > 25 || segment.col > 40){
          // console.log("collision!");
          trueOrFalse = true
        }
      });
      return trueOrFalse;
    },
  };


  var Board = Snakes.Board = function(snake) {
    this.snake = snake;
    this.grid = [];
    setInterval(this.step, 100);
  };

  Board.SIZE = {rows: 25, cols: 40};

  Board.prototype = {
    setGrid : function() {
        var grid = this.grid;
        var snake = this.snake;
        for (var row = 0; row < Board.SIZE.rows; row++) {
          var currentRow = [];
          for (var col = 0; col < Board.SIZE.cols; col++) {
            var currentCell = "";
            // snake.segments.map(function(segment){
            //   if (segment.row === row && segment.col === col) {
            //     currentRow.push("S");
            //     currentCell = "S";
            //   }
            // });
            // if (currentCell !== "S") {
            //   currentRow.push(".");
            // }
          }
          grid.push(currentRow);
        }
    },

    step : function() {
      // console.log("running");
      this.snake.move();
      // add collision test
      this.snake.grow();
      this.snake.collision();
      // this.render;
    },

    render : function() {

    }
  };

})();
