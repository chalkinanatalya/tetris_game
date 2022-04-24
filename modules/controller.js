import { COLUMNS, ROWS } from "../index.js";

export class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;
  }

  timer = 0;

  keyDownListener = (event) => {
    const key = event.code;

    switch (key) {
      case "ArrowLeft":
        this.game.moveLeft();
        this.view.showArea(this.game.viewArea);
        break;
      case "ArrowRight":
        this.game.moveRight();
        this.view.showArea(this.game.viewArea);
        break;
      case "ArrowDown":
        this.game.moveDown();
        this.view.showArea(this.game.viewArea);
        break;
      case "ArrowUp":
        this.game.rotateTetromino();
        this.view.showArea(this.game.viewArea);
        break;
    }
  };

  init(codeKey) {
    window.addEventListener("keydown", (event) => {
      if (event.code === codeKey && this.game.gameOver) {
        this.game.gameOver = false;
        clearTimeout(this.timer);
        window.removeEventListener("keydown", this.keyDownListener);
        this.game.resetGame();

        this.view.container.classList.remove("hidden");
        document.querySelector(".results").classList.remove("visible");

        this.view.init();
        this.start();
      }
    });
  }

  start() {
    this.view.showArea(this.game.viewArea);
    const showScore = this.view.createBlockScore();
    const showNextTetromino = this.view.createBlockNextTetromino();

    this.game.createUpdatePanels(showScore, showNextTetromino);

    const tick = () => {
      const time = 1100 - 100 * this.game.lvl;
      if (this.game.gameOver === true) {
        this.view.container.classList.add("hidden");
        this.game.showResults();
      }
      this.timer = setTimeout(
        () => {
          this.game.moveDown();
          this.view.showArea(this.game.viewArea);
          tick();
        },
        time > 100 ? time : 100
      );
    };

    tick();

    window.addEventListener("keydown", this.keyDownListener);
  }
}
