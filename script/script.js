class CardGame {

    constructor(wrapperSelector, cardImages, rows, columns) {
        this.wrapper = document.querySelector(wrapperSelector);
        this.cardImages = cardImages;
        this.rows = rows;
        this.columns = columns;
        this.grid = [];
        this.createGameField();
    }

    createGameField() {
        const table = document.createElement("table");
        this.wrapper.appendChild(table);

        for (let row = 0; row < this.rows; row++) {
            const tr = document.createElement("tr");
            const gridRow = [];

            for (let col = 0; col < this.columns; col++) {
                const td = document.createElement("td");
                td.className = "card";
                td.dataset.cardType = this.getRandomCardType();
                td.dataset.opened = "false";
                const coverImg = document.createElement("img");
                coverImg.src = "images/wrapper.jpg";
                td.appendChild(coverImg);

                td.addEventListener("click", this.handleCardClick.bind(this, row, col));

                gridRow.push(td);
                tr.appendChild(td);
            }

            this.grid.push(gridRow);
            table.appendChild(tr);
        }
    }

        getRandomCardType() {
            const cardValues = Object.values(this.cardImages);
            return cardValues[Math.floor(Math.random() * cardValues.length)];
    }

    handleCardClick(row, col) {
        const td = this.grid[row][col];
        
        if (td.dataset.opened === "false") {
            this.revealConnectedCards(row, col, td.dataset.cardType);
        }
    }

    revealConnectedCards(row, col, targetType) {
        if (row < 0 || col < 0 || row >= this.rows || col >= this.columns) return;
            const td = this.grid[row][col];
        if (td.dataset.opened === "true" || td.dataset.cardType !== targetType) return;

        td.innerHTML = "";
        const img = document.createElement("img");
        img.src = td.dataset.cardType;
        td.appendChild(img);
        td.dataset.opened = "true";

        this.revealConnectedCards(row - 1, col, targetType);
        this.revealConnectedCards(row + 1, col, targetType);
        this.revealConnectedCards(row, col - 1, targetType);
        this.revealConnectedCards(row, col + 1, targetType);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const playingCardImages = {
        diamond: "images/Card_dimond.png",
        heart: "images/Card_heart.png",
        spades: "images/Card_spades.png",
        clubs: "images/Card_clubs.png",
    };

    new CardGame(".wrapper", playingCardImages, 6, 7);
});
