* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary-color: #0088cc;
    --secondary-color: #00aaff;
    --accent-color: #ff6b6b;
    --success-color: #00ff88;
    --warning-color: #ffa500;
    --background-dark: #0a0a0a;
    --background-light: #1a1a2e;
    --surface-color: rgba(255, 255, 255, 0.05);
    --border-color: rgba(255, 255, 255, 0.1);
    --text-primary: #ffffff;
    --text-secondary: #cccccc;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    background: linear-gradient(135deg, var(--background-dark), var(--background-light));
    color: var(--text-primary);
    min-height: 100vh;
    font-size: 16px;
    overflow-x: hidden;
}

.mobile-container {
    max-width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--background-dark);
}

/* Верхняя панель с балансом */
.header {
    background: var(--surface-color);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border-color);
    padding: 12px 16px;
    position: sticky;
    top: 0;
    z-index: 100;
}

.balance-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.user-balance, .casino-balance {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.balance-label {
    font-size: 0.75rem;
    color: var(--text-secondary);
    font-weight: 500;
}

.balance-amount {
    font-size: 1rem;
    font-weight: bold;
    color: var(--success-color);
}

.casino-balance .balance-amount {
    color: var(--secondary-color);
}

/* Основной контент */
.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 16px;
    gap: 16px;
    overflow-y: auto;
}

/* Игровая секция */
.game-section {
    background: var(--surface-color);
    border-radius: 16px;
    padding: 20px;
    border: 1px solid var(--border-color);
    backdrop-filter: blur(10px);
}

.game-header {
    text-align: center;
    margin-bottom: 16px;
}

.game-header h1 {
    font-size: 2rem;
    margin-bottom: 8px;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
}

.coefficient-badge {
    background: linear-gradient(45deg, var(--accent-color), var(--warning-color));
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 600;
}

.game-board {
    margin: 20px 0;
}

.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin: 0 auto;
    max-width: 300px;
}

.cell {
    aspect-ratio: 1;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    min-height: 70px;
}

.cell:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: scale(1.05);
}

.cell.selected {
    background: rgba(0, 170, 255, 0.3);
    border-color: var(--secondary-color);
}

.cell.mine {
    background: rgba(255, 68, 68, 0.3);
    border-color: var(--accent-color);
}

.cell.safe {
    background: rgba(0, 170, 255, 0.3);
    border-color: var(--secondary-color);
}

.current-selection {
    text-align: center;
    margin-top: 16px;
}

.selection-info {
    font-size: 1rem;
    font-weight: 600;
}

#selectedCell {
    color: var(--secondary-color);
    font-weight: bold;
}

/* Секция ставок */
.bets-section {
    background: var(--surface-color);
    border-radius: 16px;
    padding: 20px;
    border: 1px solid var(--border-color);
    backdrop-filter: blur(10px);
}

.bets-panel, .players-panel {
    margin-bottom: 20px;
}

.bets-panel h3, .players-panel h3 {
    margin-bottom: 12px;
    color: var(--text-primary);
    font-size: 1.125rem;
}

.bet-input-group {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
    flex-wrap: wrap;
}

.bet-input-group input {
    flex: 1;
    min-width: 120px;
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    font-size: 16px;
    min-height: 44px;
}

.quick-bet {
    padding: 12px 16px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--surface-color);
    color: var(--text-primary);
    cursor: pointer;
    font-weight: 600;
    min-height: 44px;
    transition: all 0.2s ease;
}

.quick-bet:hover {
    background: rgba(255, 255, 255, 0.1);
}

.place-bet-btn, .add-bot-btn {
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 8px;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 8px;
}

.place-bet-btn:hover, .add-bot-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 170, 255, 0.3);
}

.players-list {
    max-height: 200px;
    overflow-y: auto;
    margin-bottom: 12px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 8px;
}

.player {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    margin-bottom: 4px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    border-left: 4px solid var(--secondary-color);
}

.player.winner {
    border-left-color: var(--success-color);
}

.player.loser {
    border-left-color: var(--accent-color);
}

.player-info {
    flex: 1;
}

.player-bet {
    font-weight: 600;
    color: var(--text-secondary);
}

/* Панель управления */
.control-section {
    background: var(--surface-color);
    border-radius: 16px;
    padding: 20px;
    border: 1px solid var(--border-color);
    backdrop-filter: blur(10px);
}

.game-controls {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
}

.start-game-btn, .next-round-btn {
    flex: 1;
    padding: 14px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    min-height: 44px;
}

.start-game-btn {
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    color: white;
}

.next-round-btn {
    background: linear-gradient(45deg, var(--accent-color), var(--warning-color));
    color: white;
}

.start-game-btn:hover, .next-round-btn:hover {
    transform: translateY(-2px);
}

.start-game-btn:disabled, .next-round-btn:disabled {
    background: #666;
    cursor: not-allowed;
    transform: none;
}

.game-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border: 1px solid var(--border-color);
}

.stat-label {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-bottom: 4px;
}

.stat-value {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
}

/* Нижняя навигация */
.bottom-nav {
    display: flex;
    background: var(--surface-color);
    backdrop-filter: blur(10px);
    border-top: 1px solid var(--border-color);
    padding: 8px 0;
    position: sticky;
    bottom: 0;
    z-index: 100;
}

.nav-btn {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px;
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.2s ease;
}

.nav-btn.active {
    color: var(--secondary-color);
}

.nav-icon {
    font-size: 1.25rem;
}

.nav-label {
    font-size: 0.75rem;
    font-weight: 500;
}

/* Модальные окна */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
}

.modal-overlay.active {
    display: flex;
}

.modal-content {
    background: var(--background-light);
    border-radius: 16px;
    border: 1px solid var(--border-color);
    width: 100%;
    max-width: 500px;
    max-height: 80vh;
    overflow-y: auto;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid var(--border-color);
}

.modal-header h3 {
    color: var(--text-primary);
    font-size: 1.25rem;
}

.close-modal {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-body {
    padding: 20px;
}

/* Стили для результатов и истории */
.result-item, .history-item {
    padding: 12px;
    margin-bottom: 8px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border: 1px solid var(--border-color);
}

.algorithm-info {
    background: rgba(0, 170, 255, 0.2);
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 12px;
    border: 1px solid rgba(0, 170, 255, 0.3);
}

.win-text {
    color: var(--success-color);
    font-weight: bold;
}

.lose-text {
    color: var(--accent-color);
    font-weight: bold;
}

.profile-info {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.profile-stat {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
}

.action-btn {
    width: 100%;
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--surface-color);
    color: var(--text-primary);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.action-btn:hover {
    background: rgba(255, 255, 255, 0.1);
}

/* Адаптация для больших экранов */
@media (min-width: 768px) {
    .mobile-container {
        max-width: 400px;
        margin: 0 auto;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        min-height: 100vh;
    }
    
    body {
        background: var(--background-dark);
        padding: 20px 0;
    }
}

/* Адаптация для очень маленьких экранов */
@media (max-width: 360px) {
    .main-content {
        padding: 12px;
    }
    
    .game-section, .bets-section, .control-section {
        padding: 16px;
    }
    
    .cell {
        min-height: 60px;
        font-size: 1.1rem;
    }
    
    .grid {
        gap: 6px;
    }
}

/* Портретная ориентация */
@media (max-width: 768px) and (orientation: portrait) {
    .main-content {
        gap: 12px;
    }
}

/* Ландшафтная ориентация на мобильных */
@media (max-width: 900px) and (orientation: landscape) {
    .main-content {
        gap: 12px;
    }
    
    .players-list {
        max-height: 120px;
    }
}

/* Улучшения для тач-интерфейса */
* {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
}

input, textarea {
    -webkit-user-select: text;
    -moz-user-select: text;
    user-select: text;
}

/* Улучшение скролла */
.players-list::-webkit-scrollbar {
    width: 4px;
}

.players-list::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
}

.players-list::-webkit-scrollbar-thumb {
    background: rgba(0, 170, 255, 0.5);
    border-radius: 2px;
}
