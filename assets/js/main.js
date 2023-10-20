(function () {
    function random_num(min, max) {
    max++
    return Math.floor(Math.random() * (max - min) + min)
}

class Game {
    constructor() {
        this.players = ["O", "X"]
        this.colors = {"O": "green", "X": "red"}
        this.wins = {"O": 0, 'X': 0}
        
        this.emoji_win = ["\u{1F601}", "\u{1F60E}", "\u{1F633}", "\u{1F973}", "\u{1F976}"]
        this.emoji_draw = ["\u{1F62D}", "\u{1F614}", "\u{1F480}", "\u{1F921}", "\u{1F916}"]

        this.element_player = document.querySelector("#player")

        this.element_show_winner = document.querySelector("#show-winner")
        this.element_winner = document.querySelector("#winner")
        this.element_wins_x = document.querySelector("#wins-x")
        this.element_wins_o = document.querySelector("#wins-o")

        this.win = null
        this.starter_player = null
        this.player = null

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

        this.element_blocks = document.querySelectorAll(".blocks")

        this.blocks_validated = new Array()

        this.o = new Array()
        this.x = new Array()
        
    }

    init() {
        this.random_player()
    
        document.addEventListener("click" , e => {
            const el = e.target
            const name = el.getAttribute("name")
            
            if  (this.numbers_blocks.includes(name) && !this.blocks_validated.includes(name) && !this.win) {
                this.blocks_validated.push(name)
                this.set_click(el, name)
                this.check_win()
            }

            if (this.win) {
                this.splash_winner(this.win, this.element_winner)
                this.score()
            }

        }) 
    }

    set_player(p) {
        this.player = p
        this.element_player.innerText = p
        this.element_player.style.color = this.colors[p]
    }

    set_click(el, name) {
        const id = el.getAttribute("id")
        const el_text = el.querySelector(`#${id}-text`)

        if (this.player == this.players[0]){
            el_text.innerText = this.players[0]
            el_text.style.color = this.colors.O
            this.o.push(name)
            this.set_player(this.players[1])

        }
        else if (this.player == this.players[1]){
            el_text.innerText = this.players[1]
            el_text.style.color = this.colors.X
            this.x.push(name)
            this.set_player(this.players[0])
        }

    }

    check_win() {
        this.condition_win.forEach((win) => {
            let cont_x = 0
            let cont_o = 0
            win.forEach((n) => {
                if (this.o.includes(n) && !this.win) {
                    cont_o++
                    if (cont_o == 3) {
                        this.wins.O++
                        this.win = this.players[0]
                        this.element_winner.innerText = this.win
                    }
                }  

                if (this.x.includes(n) && !this.win) {
                    cont_x++
                    if (cont_x == 3) {
                        this.wins.X++
                        this.win = this.players[1]
                        this.element_winner.innerText = this.win
                    }
                }  
            })
        })

        if (this.blocks_validated.length == 9 && !this.win) {
            this.win = "Ninguém"
        }
    }

    restart_game() {
        this.element_blocks.forEach((el) => {
            const id = el.getAttribute("id")
            const el_position = el.querySelector(`#${id}-text`)
            el_position.innerText= ""
        })
        this.win = null
        this.blocks_validated = new Array()
        this.o = new Array()
        this.x = new Array()

    }

    random_player() {
        const random = random_num(0, 1)  
        this.player = this.players[random]
        this.starter_player = this.player
        this.element_player.innerText = this.player
        this.element_player.style.color = this.colors[this.player]
    }

    splash_winner() {
        const modal_blur = document.querySelector(".modal-blur-winner")
    
        if (this.win == this.players[0] || this.win == this.players[1]){
            this.element_winner.style.color = this.colors[this.win]
            this.element_winner.innerText = `${this.emoji_win[random_num(0, 3)]} ${this.win} ` 
            
        } else {
            this.element_winner.style.color = "#36D399"
            this.element_winner.innerText = `${this.emoji_draw[random_num(0, 3)]} ${this.win} `
        }
        
        if (modal_blur.classList.contains("hide")){
            modal_blur.classList.remove("hide")
        }

        modal_blur.addEventListener("click", (e) => {
            if (!modal_blur.classList.contains("hide")){
                modal_blur.classList.add("hide")
            }
        })


        if (this.starter_player == this.players[0]) {
            this.set_player(this.players[1])
            this.starter_player = this.players[1]
        } else {
            this.set_player(this.players[0])
            this.starter_player = this.players[0]
        }

        this.restart_game()

    }

    score(){
        this.element_wins_x.innerText = this.wins.X
        this.element_wins_o.innerText = this.wins.O
    }

}
const game = new Game()
game.init()
}())
