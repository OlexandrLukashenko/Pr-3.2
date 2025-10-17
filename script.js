// --- створюємо об'єкти для суперників ---
const createPokemon = (name, hp, barId, hpId) => ({
  name,
  hp,
  barId,
  hpId,
  attack(type, enemy) {
    if (this.hp <= 0 || enemy.hp <= 0) {
      alert("Гра завершена! Почніть спочатку.");
      return;
    }

    // випадковий урон
    const damage =
      type === "normal"
        ? Math.floor(Math.random() * 10) + 5  // 5–15
        : Math.floor(Math.random() * 20) + 10; // 10–30

    enemy.hp = Math.max(0, enemy.hp - damage);
    updateBars();

    addLog(`${this.name} атакує ${enemy.name} на ${damage} урону. У ${enemy.name} залишилось ${enemy.hp} HP.`);

    // перевірка на перемогу
    if (this.hp === 0 && enemy.hp === 0) {
      addLog("Нічия!");
    } else if (this.hp === 0) {
      addLog(`${enemy.name} переміг!`);
    } else if (enemy.hp === 0) {
      addLog(`${this.name} переміг!`);
    }
  }
});

const pokemon1 = createPokemon("Покемон 1", 100, "bar1", "hp1");
const pokemon2 = createPokemon("Покемон 2", 100, "bar2", "hp2");

// --- функція для оновлення стану ---
function updateBars() {
  const { hp: hp1, barId: bar1Id, hpId: hp1Id } = pokemon1;
  const { hp: hp2, barId: bar2Id, hpId: hp2Id } = pokemon2;

  document.getElementById(hp1Id).textContent = hp1;
  document.getElementById(hp2Id).textContent = hp2;

  const bar1 = document.getElementById(bar1Id);
  const bar2 = document.getElementById(bar2Id);

  bar1.style.width = hp1 + "%";
  bar2.style.width = hp2 + "%";

  bar1.style.background = hp1 > 50 ? "green" : hp1 > 20 ? "orange" : "red";
  bar2.style.background = hp2 > 50 ? "green" : hp2 > 20 ? "orange" : "red";
}

// --- лог бою ---
const logs = [];

function addLog(message) {
  logs.unshift(message); // додаємо зверху
  const logsDiv = document.getElementById("logs");
  logsDiv.innerHTML = logs.map(log => `<p>${log}</p>`).join("");
}

// --- керування грою ---
function attack(type) {
  const { hp: hp1 } = pokemon1;
  const { hp: hp2 } = pokemon2;

  if (hp1 <= 0 || hp2 <= 0) {
    alert("Гра завершена! Почніть спочатку.");
    return;
  }

  pokemon1.attack(type, pokemon2);

  if (pokemon2.hp > 0 && pokemon1.hp > 0) {
    setTimeout(() => pokemon2.attack(type, pokemon1), 500);
  }
}

// --- стартова ініціалізація ---
updateBars();
