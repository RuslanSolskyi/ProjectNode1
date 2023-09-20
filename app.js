const fs = require('fs');
const dbFile = 'db.json';


function validateUser(user) {
    if (user.name.length < 3) {
        throw new Error('Імя користувача повинно бути більше 3 символів.');
    }
    if (user.age < 0) {
        throw new Error('Вік користувача повинен бути не менше нуля.');
    }
}

// Функція для отримання масиву користувачів з файлу db.json
function getUsersFromDB() {
    if (fs.existsSync(dbFile)) {
        const data = fs.readFileSync(dbFile, 'utf-8');
        return JSON.parse(data);
    } else {
        return [];
    }
}

// Функція для збереження масиву користувачів у файл db.json
function saveUsersToDB(users) {
    fs.writeFileSync(dbFile, JSON.stringify(users, null, 2));
}

// Функція для додавання нового користувача до бази даних
function addUser(newUser) {
    try {
        // Валідуємо ім'я та вік користувача
        validateUser(newUser);

        // Отримуємо поточний список користувачів
        const users = getUsersFromDB();

        //  максимальне значення ідентифікатора серед існуючих користувачів
        const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);

        // Створюємо нового користувача з ідентифікатором, розташованим спочатку
        const userWithId = {
            id: maxId + 1,
            ...newUser // Копіюємо всі інші властивості користувача
        };

        // Додаємо нового користувача до списку
        users.push(userWithId);

        // Зберігаємо оновлений список користувачів у файл db.json
        saveUsersToDB(users);

        console.log('Нового користувача додано до бази даних.');
    } catch (error) {
        console.error('Помилка при додаванні користувача:', error.message);
    }
}

// Приклад використання функції addUser для додавання нового користувача
const newUser = {
    name: 'Іван',
    email: 'ivan@example.com',
    age: 30,
    gender: 'чоловік',
};

addUser(newUser);

