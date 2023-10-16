function random_number(min, max) {
    max++
    return Math.floor(Math.random() * (max - min) + min)
}

class Game {
    constructor() {
        this.players = ["O", "X"]
        this.el_player = document.querySelector("#player")
        this.win = null

        this.condition_win = [
            ["1", "2", "3"],
            ["4", "5", "6"],
            ["7", "8", "9"],
            ["1", "4", "7"],
            ["2", "5", "8"],
            ["3", "6", "9"],
            ["1", "5", "9"],
            ["3", "5", "7"]
        ]
        this.numbers_blocks = ["1", "2", "3" ,"4", "5" , "6", "7", "8", "9"]

        this.blocks = document.querySelectorAll(".blocks")
        this.block = document.querySelector(".blocks").getAttribute

        this.blocks_validated = new Array()

        this.o = new Array()
        this.x = new Array()
        
    }

    init() {
        this.random_player()
        document.addEventListener("load", e => {
            
        })

        document.addEventListener("click" , e => {
            const el = e.target
            const name = el.getAttribute("name")
            
            if  (this.numbers_blocks.includes(name) && !this.blocks_validated.includes(name) && !this.win) {
                this.blocks_validated.push(name)
                console.log("sim")
                this.set_click(el, name)
                this.check_win()
            }

            if (this.blocks_validated.length == 9){
                
                console.log("acabou!")
            }
        }) 
    }

    set_click(el, name) {
        const id = el.getAttribute("id")
        const square = el.querySelector(`#${id}-text`)

        if (this.player == "O"){
            square.innerText = "O"
            this.o.push(name)
            this.player = "X"
        }
        else if (this.player == "X"){
            square.innerText = "X"
            this.x.push(name)
            this.player = "O"
        }

        this.el_player.innerText = this.player
    }

    check_win() {
        this.condition_win.forEach((win) => {
            let cont_x = 0
            let cont_o = 0
            win.forEach((n) => {
                if (this.x.includes(n)) {
                    cont_x++
                    if (cont_x == 3) {
                        console.log("X ganhou!")
                        this.win = "X"
                    }
                }  
                if (this.o.includes(n)) {
                    cont_o++
                    if (cont_o == 3) {
                        console.log("O ganhou!")
                        this.win = "O"
                    }
                }  
            })
        })
    }

    random_player() {
        const random = random_number(0, 1)  
        this.player = this.players[random]
        this.el_player.innerText = this.player
    }

}
const game = new Game()
game.init()

