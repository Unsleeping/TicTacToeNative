const game = {
    gameTable: document.querySelector('#game'),
    playing: 'playing',
    mapValues: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    phase: 'X',

    init() {
        //отрисовываем поле
        this.renderMap();
        //инициализируем обработчики
        this.initHandlers();
    },

    renderMap() {
        for (let row = 0; row < 3; row++) {
            const tr = document.createElement('tr');
            this.gameTable.appendChild(tr);

            for (let col = 0; col < 3; col++) {
                const td = document.createElement('td');
                td.dataset.row = row.toString();
                td.dataset.col = col.toString();
                tr.appendChild(td);
            }
        }
    },

    initHandlers() {
        this.gameTable.addEventListener('click', this.clickHandler.bind(this));
    },

    clickHandler(event) {
        //корректен ли клик
        if (!this.isCorrectClick(event)) return;

        //заполняем ячейку
        this.fillCell(event);

        //есть ли победитель
        if (this.isWin()) {
            //останавливаем игру
            this.setStatusToStop();

            //определяем победителя
            this.showWinner();
        }

        //сменить фазу
        this.changePhase();
    },

    fillCell(event) {
        let row = +event.target.dataset.row,
            col = +event.target.dataset.col;
        
        this.mapValues[row][col] = this.phase;
        event.target.textContent = this.phase;
    },

    isWin() {
        return this.isLineWin({x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}) || 
            this.isLineWin({x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}) ||
            this.isLineWin({x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}) ||

            this.isLineWin({x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}) ||
            this.isLineWin({x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}) ||
            this.isLineWin({x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}) ||

            this.isLineWin({x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}) ||
            this.isLineWin({x: 0, y: 2}, {x: 1, y: 1}, {x: 2, y: 0});
    },

    isLineWin(a, b, c) {
        let value = this.mapValues[a.y][a.x] + this.mapValues[b.y][b.x] + this.mapValues[c.y][c.x];
        return value === 'XXX' || value === 'OOO'
    },

    isCorrectClick(event) {
        return this.isPlaying() && this.isClickOnCell(event) && this.isCellEmpty(event)
    },

    isPlaying() {
        return this.playing === 'playing';
    },

    isClickOnCell(event) {
        return event.target.tagName === 'TD';
    },

    isCellEmpty(event) {
        let row = +event.target.dataset.row,
            col = +event.target.dataset.col;
        
        return this.mapValues[row][col] === '';
    },

    setStatusToStop() {
        this.playing = 'stopped';
    },

    showWinner() {
        let winner = this.phase === 'X' ? 'Крестики' : 'Нолики';
        alert(`${winner} выиграли`)
    },

    changePhase() {
        this.phase = this.phase === 'X' ? 'O' : 'X';
    }
};

game.init();