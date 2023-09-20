

const fs = require('fs');

const users = [
    { id: 1, name: 'Іван', email: 'ivan@example.com', age: 30, gender: 'чоловік' },
    { id: 2, name: 'Марія', email: 'maria@example.com', age: 25, gender: 'жінка' },
    { id: 3, name: 'Петро', email: 'petro@example.com', age: 35, gender: 'чоловік' },
    { id: 4, name: 'Ольга', email: 'olga@example.com', age: 28, gender: 'жінка' },
    { id: 5, name: 'Андрій', email: 'andriy@example.com', age: 32, gender: 'чоловік' },
    { id: 6, name: 'Наталія', email: 'natalia@example.com', age: 27, gender: 'жінка' },
    { id: 7, name: 'Максим', email: 'maxim@example.com', age: 29, gender: 'чоловік' },
    { id: 8, name: 'Софія', email: 'sofia@example.com', age: 26, gender: 'жінка' },
    { id: 9, name: 'Анна', email: 'anna@example.com', age: 31, gender: 'жінка' },
    { id: 10, name: 'Олександр', email: 'oleksandr@example.com', age: 33, gender: 'чоловік' }
];

// Перетворюємо об'єкт `users` в рядок JSON
const usersJSON = JSON.stringify(users, null, 2);

// Записуємо рядок JSON у файл db.json
fs.writeFileSync('db.json', usersJSON);

console.log('Дані успішно збережено у файл db.json');
