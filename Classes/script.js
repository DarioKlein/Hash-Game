class Hash {
  square = {
    a1: "",
    a2: "",
    a3: "",
    b1: "",
    b2: "",
    b3: "",
    c1: "",
    c2: "",
    c3: "",
  }

  player = ""
  warning = ""
  playing = false

  start(allSquareElements, resetElement) {
    this.reset()

    allSquareElements.forEach((item) => {
      item.addEventListener("click", (e) => {
        this.itemClick(e)
      })
    })

    resetElement.addEventListener("click", () => {
      this.reset()
    })
  }

  itemClick(e) {
    const item = e.target.getAttribute("data-item")
    if (this.playing) {
      if (this.square[item] === "") {
        this.square[item] = this.player
        this.renderSquare()
        this.togglePlayer()
      }
    }
  }
  reset() {
    this.warning = ""
    const random = Math.floor(Math.random() * 2)
    this.player = random === 0 ? "X" : "O"

    for (let i in this.square) {
      this.square[i] = ""
    }

    this.playing = true
    this.renderSquare()
    this.renderInfo()
  }

  togglePlayer() {
    if (this.player === "X") {
      this.player = "O"
    } else {
      this.player = "X"
    }
    this.renderInfo()
  }

  renderSquare() {
    for (let i in this.square) {
      const item = document.querySelector(`div[data-item=${i}]`)
      item.innerHTML = this.square[i]
    }
    this.checkGame()
  }

  renderInfo() {
    document.querySelector(".vez").innerHTML = this.player
    document.querySelector(".resultado").innerHTML = this.warning
  }

  checkGame() {
    if (this.checkWinnerFor("X")) {
      this.warning = "X se sagrou campeão"
      this.playing = false
    } else if (this.checkWinnerFor("O")) {
      this.warning = "O se sagrou campeão"
      this.playing = false
    } else if (this.isFull()) {
      this.warning = "Deu velha"
      this.playing = false
    }
  }

  checkWinnerFor(player) {
    const resultsWin = [
      ["a1", "a2", "a3"],
      ["b1", "b2", "b3"],
      ["c1", "c2", "c3"],
      ["a1", "b1", "c1"],
      ["a2", "b2", "c2"],
      ["a3", "b3", "c3"],
      ["a1", "b2", "c3"],
      ["a3", "b2", "c1"],
    ]
    for (let w in resultsWin) {
      const [a, b, c] = resultsWin[w]
      if (
        this.square[a] === player &&
        this.square[b] === player &&
        this.square[c] === player
      ) {
        return true
      }
    }

    return false
  }

  isFull() {
    for (let i in this.square) {
      if (this.square[i] === "") {
        return false
      }
    }
    return true
  }
}
