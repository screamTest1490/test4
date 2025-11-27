class MobileMinesGame {
    constructor() {
        this.players = [];
        this.mine = null;
        this.casinoBalance = 10000;
        this.userBalance = 1000;
        this.gameHistory = [];
        this.currentPlayerCell = null;
        this.isGameActive = false;
        this.userStats = {
            gamesPlayed: 0,
            totalWins: 0,
            totalProfit: 0
        };
        
        this.init();
    }

    init() {
        this.createGrid();
        this.setupEventListeners();
        this.updateUI();
        this.loadStats();
    }

    createGrid() {
        const grid = document.getElementById('gameGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        for (let i = 1; i <= 9; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.innerHTML = `<span>${i}</span>`;
            cell.dataset.cell = i;
            cell.addEventListener('click', () => this.selectCell(i));
            grid.appendChild(cell);
        }
    }

    selectCell(cellNumber) {
        if (this.isGameActive) return;
        
        this.currentPlayerCell = cellNumber;
        this.updateCellSelectionUI();
    }

    updateCellSelectionUI() {
        const selectedCellElement = document.getElementById('selectedCell');
        if (selectedCellElement) {
            selectedCellElement.textContent = this.currentPlayerCell ? this.currentPlayerCell : '-';
        }
        
        document.querySelectorAll('.cell').forEach(cell => {
            const cellNum = parseInt(cell.dataset.cell);
            cell.classList.toggle('selected', cellNum === this.currentPlayerCell);
        });
    }

    placeBet() {
        if (this.isGameActive) {
            alert('Игра уже началась! Дождитесь окончания раунда.');
            return;
        }
        
        const betInput = document.getElementById('playerBet');
        const bet = parseInt(betInput.value);
        
        if (!bet || bet < 1) {
            alert('Минимальная ставка 1 TON');
            return;
        }
        
        if (bet > this.userBalance) {
            alert('Недостаточно средств на балансе');
            return;
        }
        
        if (!this.currentPlayerCell) {
            alert('Выберите ячейку для ставки!');
            return;
        }
        
        // Проверяем, не сделал ли уже пользователь ставку в этом раунде
        const userAlreadyBet = this.players.some(player => player.isUser);
        if (userAlreadyBet) {
            alert('Вы уже сделали ставку в этом раунде!');
            return;
        }
        
        const player = {
            id: Date.now(),
            bet: bet,
            cell: this.currentPlayerCell,
            order: this.players.length + 1,
            isUser: true,
            name: 'Вы'
        };
        
        this.players.push(player);
        this.userBalance -= bet; // Списываем ставку с баланса пользователя
        betInput.value = '';
        this.updateCellSelectionUI();
        this.updatePlayersList();
        this.updateUI();
    }

    addBot() {
        if (this.isGameActive) {
            alert('Нельзя добавлять ботов во время игры!');
            return;
        }
        
        const availableCells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const usedCells = this.players.map(p => p.cell);
        const freeCells = availableCells.filter(cell => !usedCells.includes(cell));
        
        if (freeCells.length === 0) {
            alert('Все ячейки уже заняты!');
            return;
        }
        
        const randomCell = freeCells[Math.floor(Math.random() * freeCells.length)];
        const botBets = [10, 20, 50, 100];
        const randomBet = botBets[Math.floor(Math.random() * botBets.length)];
        const botNames = ['Бот-1', 'Бот-2', 'Бот-3', 'Бот-4', 'Бот-5'];
        
        const bot = {
            id: Date.now(),
            bet: randomBet,
            cell: randomCell,
            order: this.players.length + 1,
            isUser: false,
            name: botNames[Math.floor(Math.random() * botNames.length)]
        };
        
        this.players.push(bot);
        this.updatePlayersList();
        this.updateUI();
    }

    updatePlayersList() {
        const list = document.getElementById('playersList');
        if (!list) return;
        
        list.innerHTML = '';
        
        this.players.forEach(player => {
            const playerEl = document.createElement('div');
            playerEl.className = `player ${player.isUser ? 'user' : ''}`;
            playerEl.innerHTML = `
                <div class="player-info">
                    <strong>${player.name}</strong>
                    <div>Ячейка: ${player.cell}</div>
                </div>
                <div class="player-bet">${player.bet} TON</div>
            `;
            list.appendChild(playerEl);
        });
    }

    startGame() {
        if (this.players.length < 1) {
            alert('Добавьте хотя бы одного игрока!');
            return;
        }
        
        this.isGameActive = true;
        this.userStats.gamesPlayed++;
        this.generateMine();
        this.calculateResults();
        this.updateUI();
        this.saveStats();
        
        const startGameBtn = document.getElementById('startGame');
        const nextRoundBtn = document.getElementById('nextRound');
        if (startGameBtn) startGameBtn.disabled = true;
        if (nextRoundBtn) nextRoundBtn.disabled = false;
    }

    generateMine() {
        const cellStats = {};
        for (let i = 1; i <= 9; i++) {
            cellStats[i] = { totalBet: 0, players: 0 };
        }
        
        this.players.forEach(player => {
            cellStats[player.cell].totalBet += player.bet;
            cellStats[player.cell].players += 1;
        });
        
        const usedCells = Object.entries(cellStats)
            .filter(([cell, stats]) => stats.players > 0)
            .map(([cell, stats]) => ({
                cell: parseInt(cell),
                totalBet: stats.totalBet,
                players: stats.players
            }));
        
        if (usedCells.length === 1) {
            this.mine = usedCells[0].cell;
        } else if (usedCells.length === 2) {
            const cell1 = usedCells[0];
            const cell2 = usedCells[1];
            
            const ratio1 = cell1.totalBet / cell2.totalBet;
            const ratio2 = cell2.totalBet / cell1.totalBet;
            
            if (ratio1 <= 2 && ratio2 <= 2) {
                this.mine = cell1.totalBet < cell2.totalBet ? cell1.cell : cell2.cell;
            } else {
                this.mine = cell1.totalBet > cell2.totalBet ? cell1.cell : cell2.cell;
            }
        } else {
            const minPlayers = Math.min(...usedCells.map(cell => cell.players));
            const leastPopularCells = usedCells.filter(cell => cell.players === minPlayers);
            
            const randomIndex = Math.floor(Math.random() * leastPopularCells.length);
            this.mine = leastPopularCells[randomIndex].cell;
        }
    }

    calculateResults() {
        const totalBank = this.players.reduce((sum, player) => sum + player.bet, 0);
        
        const winners = this.players.filter(player => player.cell !== this.mine);
        const losers = this.players.filter(player => player.cell === this.mine);
        
        const lostAmount = losers.reduce((sum, player) => sum + player.bet, 0);
        const totalBonus = winners.reduce((sum, player) => sum + (player.bet * 0.25), 0);
        
        winners.forEach(winner => {
            const bonus = winner.bet * 0.25;
            winner.payout = winner.bet + bonus;
            winner.netResult = bonus;
            
            if (winner.isUser) {
                this.userBalance += winner.payout;
                this.userStats.totalProfit += bonus;
                if (bonus > 0) this.userStats.totalWins++;
            }
        });
        
        losers.forEach(loser => {
            loser.payout = 0;
            loser.netResult = -loser.bet;
        });
        
        this.casinoIncome = lostAmount - totalBonus;
        this.casinoBalance += this.casinoIncome;
        
        this.saveToHistory(totalBank, this.casinoIncome, winners.length);
        this.displayResults();
    }

    displayResults() {
        const resultsDiv = document.getElementById('roundResults');
        if (!resultsDiv) return;
        
        resultsDiv.innerHTML = '';
        
        const coefficientInfo = document.createElement('div');
        coefficientInfo.className = 'algorithm-info';
        coefficientInfo.innerHTML = `<strong>🎯 Коэффициент для всех игроков:</strong> <span class="coefficient-badge">1.25x</span>`;
        resultsDiv.appendChild(coefficientInfo);
        
        const algorithmInfo = document.createElement('div');
        algorithmInfo.className = 'algorithm-info';
        algorithmInfo.innerHTML = `<strong>🤖 Алгоритм выбора мины:</strong> ${this.getAlgorithmExplanation()}`;
        resultsDiv.appendChild(algorithmInfo);
        
        const mineInfo = document.createElement('div');
        mineInfo.className = 'result-item';
        mineInfo.innerHTML = `<strong>💣 Мина в ячейке:</strong> ${this.mine}`;
        resultsDiv.appendChild(mineInfo);
        
        const losers = this.players.filter(player => player.cell === this.mine);
        const lostAmount = losers.reduce((sum, player) => sum + player.bet, 0);
        const fundInfo = document.createElement('div');
        fundInfo.className = 'result-item';
        fundInfo.innerHTML = `<strong>💰 Фонд проигравших:</strong> ${lostAmount.toFixed(2)} TON`;
        resultsDiv.appendChild(fundInfo);
        
        this.players.forEach(player => {
            const result = document.createElement('div');
            const isWinner = player.payout > player.bet;
            result.className = `result-item ${isWinner ? 'winner' : 'loser'}`;
            
            const resultClass = isWinner ? 'win-text' : 'lose-text';
            const resultSymbol = isWinner ? '+' : '';
            
            if (isWinner) {
                const bonus = player.bet * 0.25;
                result.innerHTML = `
                    <strong>${player.name}</strong> (Выиграл)<br>
                    Ставка: ${player.bet} TON + Выигрыш: ${bonus.toFixed(2)} TON = <strong>${player.payout.toFixed(2)} TON</strong><br>
                    Результат: <span class="${resultClass}">${resultSymbol}${player.netResult.toFixed(2)} TON</span>
                `;
            } else {
                result.innerHTML = `
                    <strong>${player.name}</strong> (Проиграл)<br>
                    Ставка: ${player.bet} TON | Выплата: 0 TON<br>
                    Результат: <span class="${resultClass}">${resultSymbol}${player.netResult.toFixed(2)} TON</span>
                `;
            }
            resultsDiv.appendChild(result);
        });
        
        const casinoResult = document.createElement('div');
        casinoResult.className = 'result-item';
        casinoResult.innerHTML = `<strong>🏦 Доход казино:</strong> ${this.casinoIncome.toFixed(2)} TON`;
        resultsDiv.appendChild(casinoResult);
        
        this.highlightCells();
    }

    getAlgorithmExplanation() {
        const cellStats = {};
        for (let i = 1; i <= 9; i++) {
            cellStats[i] = { totalBet: 0, players: 0 };
        }
        
        this.players.forEach(player => {
            cellStats[player.cell].totalBet += player.bet;
            cellStats[player.cell].players += 1;
        });
        
        const usedCells = Object.entries(cellStats)
            .filter(([cell, stats]) => stats.players > 0)
            .map(([cell, stats]) => ({
                cell: parseInt(cell),
                totalBet: stats.totalBet,
                players: stats.players
            }));
        
        if (usedCells.length === 1) {
            return "Все игроки поставили на одну ячейку → мина там";
        } else if (usedCells.length === 2) {
            const cell1 = usedCells[0];
            const cell2 = usedCells[1];
            const ratio1 = cell1.totalBet / cell2.totalBet;
            const ratio2 = cell2.totalBet / cell1.totalBet;
            
            if (ratio1 <= 2 && ratio2 <= 2) {
                return `Разница ставок ≤ 2x → мина в ячейке с меньшей суммой (${this.mine})`;
            } else {
                return `Разница ставок > 2x → мина в ячейке с большей суммой (${this.mine})`;
            }
        } else {
            return `Много ячеек → мина в наименее популярной ячейке (${this.mine})`;
        }
    }

    highlightCells() {
        document.querySelectorAll('.cell').forEach(cell => {
            const cellNum = parseInt(cell.dataset.cell);
            if (cellNum === this.mine) {
                cell.classList.add('mine');
                cell.innerHTML = '💣<br><small>' + cellNum + '</small>';
            } else {
                cell.classList.add('safe');
                cell.innerHTML = '💰<br><small>' + cellNum + '</small>';
            }
        });
    }

    saveToHistory(totalBank, casinoIncome, winnersCount) {
        const historyItem = {
            date: new Date().toLocaleString(),
            players: this.players.length,
            totalBank,
            casinoIncome,
            winnersCount,
            mine: this.mine
        };
        
        this.gameHistory.unshift(historyItem);
        this.updateHistory();
    }

    updateHistory() {
        const historyDiv = document.getElementById('gameHistory');
        if (!historyDiv) return;
        
        historyDiv.innerHTML = '';
        
        this.gameHistory.slice(0, 10).forEach(game => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `
                <strong>${game.date}</strong><br>
                Игроков: ${game.players} | Банк: ${game.totalBank} TON<br>
                Казино: ${game.casinoIncome.toFixed(2)} TON | Победителей: ${game.winnersCount}<br>
                Мина: ${game.mine}
            `;
            historyDiv.appendChild(item);
        });
    }

    nextRound() {
        this.players = [];
        this.mine = null;
        this.currentPlayerCell = null;
        this.isGameActive = false;
        
        this.createGrid();
        this.updatePlayersList();
        this.updateUI();
        
        const resultsDiv = document.getElementById('roundResults');
        const startGameBtn = document.getElementById('startGame');
        const nextRoundBtn = document.getElementById('nextRound');
        
        if (resultsDiv) resultsDiv.innerHTML = '';
        if (startGameBtn) startGameBtn.disabled = false;
        if (nextRoundBtn) nextRoundBtn.disabled = true;
    }

    updateUI() {
        const userBalanceElement = document.querySelector('.user-balance .balance-amount');
        const casinoBalanceElement = document.querySelector('.casino-balance .balance-amount');
        const totalBankElement = document.getElementById('totalBank');
        const playersCountElement = document.getElementById('playersCount');
        const gamesPlayedElement = document.getElementById('gamesPlayed');
        const totalWinsElement = document.getElementById('totalWins');
        const winRateElement = document.getElementById('winRate');
        
        if (userBalanceElement) userBalanceElement.textContent = `${this.userBalance.toFixed(2)} TON`;
        if (casinoBalanceElement) casinoBalanceElement.textContent = `${this.casinoBalance.toFixed(2)} TON`;
        
        const totalBank = this.players.reduce((sum, player) => sum + player.bet, 0);
        
        if (totalBankElement) totalBankElement.textContent = `${totalBank} TON`;
        if (playersCountElement) playersCountElement.textContent = this.players.length;
        
        if (gamesPlayedElement) gamesPlayedElement.textContent = this.userStats.gamesPlayed;
        if (totalWinsElement) totalWinsElement.textContent = `${this.userStats.totalProfit.toFixed(2)} TON`;
        
        const winRate = this.userStats.gamesPlayed > 0 
            ? ((this.userStats.totalWins / this.userStats.gamesPlayed) * 100).toFixed(1) 
            : 0;
        if (winRateElement) winRateElement.textContent = `${winRate}%`;
    }

    setupEventListeners() {
        // Быстрые ставки
        document.querySelectorAll('.quick-bet').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bet = parseInt(e.target.dataset.bet);
                document.getElementById('playerBet').value = bet;
            });
        });
        
        // Навигация
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.closest('.nav-btn').dataset.tab;
                this.switchTab(tab);
            });
        });
        
        // Загрузка статистики
        this.loadStats();
    }

    switchTab(tab) {
        // Обновляем активную кнопку навигации
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        
        // Показываем соответствующий модальный экран
        if (tab === 'game') {
            // Игра уже видна
            return;
        }
        
        this.closeAllModals();
        document.getElementById(`${tab}Modal`).classList.add('active');
    }

    closeAllModals() {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.classList.remove('active');
        });
    }

    saveStats() {
        localStorage.setItem('minesUserStats', JSON.stringify(this.userStats));
        localStorage.setItem('minesUserBalance', this.userBalance.toString());
    }

    loadStats() {
        const savedStats = localStorage.getItem('minesUserStats');
        const savedBalance = localStorage.getItem('minesUserBalance');
        
        if (savedStats) {
            this.userStats = JSON.parse(savedStats);
        }
        
        if (savedBalance) {
            this.userBalance = parseFloat(savedBalance);
        }
        
        this.updateUI();
    }

    resetStats() {
        if (confirm('Вы уверены, что хотите сбросить статистику?')) {
            this.userStats = {
                gamesPlayed: 0,
                totalWins: 0,
                totalProfit: 0
            };
            this.userBalance = 1000;
            this.saveStats();
            this.updateUI();
            this.closeModal('profileModal');
        }
    }
}

// Глобальные функции
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    // Переключаемся обратно на вкладку "Игра"
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('[data-tab="game"]').classList.add('active');
}

// Создаем глобальные функции для кнопок
let game;

document.addEventListener('DOMContentLoaded', function() {
    game = new MobileMinesGame();
    
    // Добавляем обработчики для глобальных функций
    window.placeBet = () => game.placeBet();
    window.addBot = () => game.addBot();
    window.startGame = () => game.startGame();
    window.nextRound = () => game.nextRound();
    window.resetStats = () => game.resetStats();
    window.closeModal = (modalId) => closeModal(modalId);
});
