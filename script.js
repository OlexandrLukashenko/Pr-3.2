// --- функція створення лічильника кліків із замиканням ---
const createClickCounter = (limit, buttonName) => {
  let count = 0;
  return () => {
    if (count < limit) {
      count++;
      console.log(
        `${buttonName}: натискань ${count} (залишилось ${limit - count})`
      );
      return true; // дозволяємо дію
    } else {
      console.log(`${buttonName}: ліміт ${limit} натискань досягнуто!`);
      return false; // забороняємо дію
    }
  };
};

// --- створення окремих лічильників для кнопок ---
const limit = 6;
const countNormal = createClickCounter(limit, "Звичайний удар");
const countStrong = createClickCounter(limit, "Сильний удар");

// --- зміна функції attack ---
function attack(type) {
  const { hp: hp1 } = pokemon1;
  const { hp: hp2 } = pokemon2;

  if (hp1 <= 0 || hp2 <= 0) {
    alert("Гра завершена! Почніть спочатку.");
    return;
  }

  // перевірка ліміту кліків
  const allowed =
    type === "normal" ? countNormal() : countStrong();
  if (!allowed) return; // якщо перевищено — не атакуємо

  pokemon1.attack(type, pokemon2);

  if (pokemon2.hp > 0 && pokemon1.hp > 0) {
    setTimeout(() => pokemon2.attack(type, pokemon1), 500);
  }
}
