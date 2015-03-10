(function(){
  var Snakes = window.Snakes = window.Snakes || {};

  var View = Snakes.View = function($el, board) {
    this.$el = $el;
    this.board = board;
    this.board.setGrid();

    $("body").on("keydown", function(event){
      // var board = this.board;
      // console.log(event.keyCode);
      switch(event.keyCode) {
        case 38:
          if (board.snake.dir !== "S") {
            board.snake.turn("N");
          }
          break;
        case 39:
          if (board.snake.dir !== "W") {
            board.snake.turn("E");
          }
          break;
        case 40:
          if (board.snake.dir !== "N") {
            board.snake.turn("S");
          }
          break;
        case 37:
          if (board.snake.dir !== "E") {
            board.snake.turn("W");
          }
          break;
        default:
          console.log("Wrong Key");
      }
    });
    window.refresh = setInterval(this.render, 100);
    window.check = setInterval(function(){
      if (board.snake.collision()){
        clearInterval(window.refresh);
        clearInterval(window.check);
        this.gameover();
      }
    }.bind(this), 50);

  };

  View.prototype = {
    render : function() {
      var view = this;
      var board = this.board;
      board.setGrid();
      view.$el.empty();
      // if (board.snake.collision()){
      //   clearInterval(window.refresh);
      // }

      for (var row = 0; row < Snakes.Board.SIZE.rows; row++) {
        var $currentRow = $('<div class="row">');
        for (var col = 0; col < Snakes.Board.SIZE.cols; col++) {
          var $currentCol = $('<div class="col">');
          board.snake.segments.map(function(segment){
            if (segment.row === row && segment.col === col) {
              $currentCol.addClass("snake-segment");
            }
          });
          board.snake.apples.map(function(apple){
            if (apple.row === row && apple.col === col) {
              $currentCol.addClass("apple");
            }
          });
          // var currentCell = board.grid[row][col];
          // if (currentCell === "S") {
          //   $currentCol.addClass("snake-segment");
          // }
          $currentRow.append($currentCol);
        }
        view.$el.append($currentRow);
      }
    },

    gameover : function(){
      var view = this;
      var $gameover = $('<h2 class="gameover">')
      $gameoverSpan = $('<span>');
      $gameoverSpan.html("Game Over");
      $gameover.append($gameoverSpan);
      view.$el.append($gameover);

      $playAgain = $('<div class="button">');
      $playAgain.html("Press any key to play again!");
      view.$el.append($playAgain);
      var that = this;
      $(window).keypress(function(e){
        history.go(0);
        // delete that.board;
        // var snake = new Snakes.Snake();
        // var board = new Snakes.Board(snake);
        // // var $el = $("#snake");
        // // var view = new Snakes.View($el, board);
        // // debugger
        // that.board = board;
        // // debugger
        // that.board.setGrid();
        // // debugger
        // that.render();

        // $(window).unbind("keypress");
      });
    }
  };


})();
