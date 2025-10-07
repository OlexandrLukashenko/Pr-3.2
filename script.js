// --- створюємо об'єкти для суперників ---
const character = {
  name: "Покемон 1",
  hp: 100,
  barId: "bar1",
  hpId: "hp1",

  attack(type, enemy) {
    if (this.hp <= 0 || enemy.hp <= 0) {
      alert("Гра завершена! Почніть спочатку.");
      return;
    }

    // випадковий урон
    let damage;
    if (type === "normal") {
      damage = Math.floor(Math.random() * 10) + 5;  // 5–15
    } else if (type === "strong") {
      damage = Math.floor(Math.random() * 20) + 10; // 10–30
    }

    // зменшуємо життя противника
    enemy.hp = Math.max(0, enemy.hp - damage);
    updateBars();

    // перевірка на перемогу
    if (this.hp === 0 && enemy.hp === 0) {
      alert("Нічия!");
    } else if (this.hp === 0) {
      alert(enemy.name + " переміг!");
    } else if (enemy.hp === 0) {
      alert(this.name + " переміг!");
    }
  }
};

const enemy = {
  name: "Покемон 2",
  hp: 100,
  barId: "bar2",
  hpId: "hp2",
  attack: character.attack // однакова функція через спільне посилання
};

// --- функція для оновлення стану ---
function updateBars() {
  document.getElementById(character.hpId).textContent = character.hp;
  document.getElementById(enemy.hpId).textContent = enemy.hp;

  const bar1 = document.getElementById(character.barId);
  const bar2 = document.getElementById(enemy.barId);

  bar1.style.width = character.hp + "%";
  bar2.style.width = enemy.hp + "%";

  bar1.style.background = character.hp > 50 ? "green" : character.hp > 20 ? "orange" : "red";
  bar2.style.background = enemy.hp > 50 ? "green" : enemy.hp > 20 ? "orange" : "red";
}

// --- керування грою ---
function attack(type) {
  // Хід першого покемона
  character.attack(type, enemy);

  // Якщо обидва живі — відповідь другого
  if (enemy.hp > 0 && character.hp > 0) {
    setTimeout(() => {
      enemy.attack(type, character);
    }, 500); // затримка для ефекту
  }
}

// --- стартова ініціалізація ---
updateBars();
