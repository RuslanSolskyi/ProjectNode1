// const fs = require('fs');
// const dbFile = 'bd.json';
//
//
// function validateUser(user) {
//     if (user.name.length < 3) {
//         throw new Error('Імя користувача повинно бути більше 3 символів.');
//     }
//     if (user.age < 0) {
//         throw new Error('Вік користувача повинен бути не менше нуля.');
//     }
// }
//
// // Функція для отримання масиву користувачів з файлу bd.json
// function getUsersFromDB() {
//     if (fs.existsSync(dbFile)) {
//         const data = fs.readFileSync(dbFile, 'utf-8');
//         return JSON.parse(data);
//     } else {
//         return [];
//     }
// }
//
// // Функція для збереження масиву користувачів у файл bd.json
// function saveUsersToDB(users) {
//     fs.writeFileSync(dbFile, JSON.stringify(users, null, 2));
// }
//
// // Функція для додавання нового користувача до бази даних
// function addUser(newUser) {
//     try {
//         // Валідуємо ім'я та вік користувача
//         validateUser(newUser);
//
//         // Отримуємо поточний список користувачів
//         const users = getUsersFromDB();
//
//         //  максимальне значення ідентифікатора серед існуючих користувачів
//         const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
//
//         // Створюємо нового користувача з ідентифікатором, розташованим спочатку
//         const userWithId = {
//             id: maxId + 1,
//             ...newUser // Копіюємо всі інші властивості користувача
//         };
//
//         // Додаємо нового користувача до списку
//         users.push(userWithId);
//
//         // Зберігаємо оновлений список користувачів у файл bd.json
//         saveUsersToDB(users);
//
//         console.log('Нового користувача додано до бази даних.');
//     } catch (error) {
//         console.error('Помилка при додаванні користувача:', error.message);
//     }
// }
//
// // Приклад використання функції addUser для додавання нового користувача
// const newUser = {
//     name: 'Іван',
//     email: 'ivan@example.com',
//     age: 30,
//     gender: 'чоловік',
// };
//
// // addUser(newUser);
//
// //----------------------------------------
// const express = require('express');
//
//
// const app = express();
//
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
//
// // Шлях до файлу bd.json (повний шлях або відносний до директорії, де знаходиться app.js)
// const dbFilePath = './bd.json';
//
// // Функція для отримання даних із файлу bd.json
// function readDataFromFile() {
//     try {
//         const data = fs.readFileSync(dbFilePath, 'utf-8');
//         return JSON.parse(data);
//     } catch (error) {
//         console.error('Помилка при зчитуванні даних з файлу bd.json:', error.message);
//         return [];
//     }
// }
//
// // Функція для запису даних у файл bd.json
// function writeDataToFile(data) {
//     try {
//         fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
//     } catch (error) {
//         console.error('Помилка при записі даних у файл bd.json:', error.message);
//     }
// }
//
// // Зчитування даних при старті сервера
// let users = readDataFromFile();
//
// // Отримання списку користувачів
// app.get('/users', (req, res) => {
//     res.json({ data: users });
// });
//
// // Отримання користувача за ID
// app.get('/users/:id', (req, res) => {
//     const { id } = req.params;
//     const user = users.find((user) => user.id === +id);
//
//     if (!user) {
//         return res.status(404).json({ message: 'Користувача не знайдено' });
//     }
//
//     res.json({ data: user });
// });
//
// // Додавання нового користувача
// app.post('/users', (req, res) => {
//     const newUser = req.body;
//
//     try {
//         validateUser(newUser);
//         newUser.id = getNextUserId(); // Генерування нового ID
//         users.push(newUser);
//         writeDataToFile(users); // Запис даних у файл
//         res.status(201).json({ message: 'Користувача створено', data: newUser });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });
//
// // Оновлення користувача за ID
// app.put('/users/:id', (req, res) => {
//     const { id } = req.params;
//     const updatedUser = req.body;
//
//     const userIndex = users.findIndex((user) => user.id === +id);
//
//     if (userIndex === -1) {
//         return res.status(404).json({ message: 'Користувача не знайдено' });
//     }
//
//     try {
//         validateUser(updatedUser);
//         users[userIndex] = { ...users[userIndex], ...updatedUser };
//         writeDataToFile(users); // Запис даних у файл
//         res.json({ message: 'Користувача оновлено', data: users[userIndex] });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });
//
// // Видалення користувача за ID
// app.delete('/users/:id', (req, res) => {
//     const { id } = req.params;
//     const userIndex = users.findIndex((user) => user.id === +id);
//
//     if (userIndex === -1) {
//         return res.status(404).json({ message: 'Користувача не знайдено' });
//     }
//
//     users.splice(userIndex, 1);
//     writeDataToFile(users); // Запис даних у файл
//     res.sendStatus(204);
// });
//
// // Функція для валідації імені та віку користувача
// function validateUser(user) {
//     if (user.name.length < 3) {
//         throw new Error('Ім\'я користувача повинно бути більше 3 символів.');
//     }
//     if (user.age < 0) {
//         throw new Error('Вік користувача повинен бути не менше нуля.');
//     }
// }
//
// // Функція для генерації нового ID для користувача
// function getNextUserId() {
//     const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
//     return maxId + 1;
// }
//
// const PORT = 5001;
//
// app.listen(PORT, () => {
//     console.log(`Server has successfully started on PORT ${PORT}`);
// });
const express = require('express');
const fs = require('fs').promises;
const app = express();
const PORT = 5001;

app.use(express.json());

// Валідація користувача
function validateUser(user) {
    if (user.name.length < 3) {
        throw new Error('Ім\'я користувача повинно бути більше 3 символів.');
    }
    if (user.age < 0) {
        throw new Error('Вік користувача повинен бути не менше нуля.');
    }
}

// GET - Отримати всіх користувачів
app.get('/users', async (req, res) => {
    try {
        const data = await fs.readFile('bd.json', 'utf8');
        const users = JSON.parse(data);
        res.json({ data: users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error reading data" });
    }
});

// GET - Отримати користувача за ID
app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fs.readFile('bd.json', 'utf8');
        const users = JSON.parse(data);
        const index = +id - 1;
        if (index >= 0 && index < users.length) {
            res.json({ data: users[index] });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error reading data" });
    }
});

// POST - Створити нового користувача
app.post('/users', async (req, res) => {
    try {
        const data = await fs.readFile('bd.json', 'utf8');
        const users = JSON.parse(data);
        const newUser = req.body;

        // Валідація нового користувача перед додаванням
        validateUser(newUser);

        users.push(newUser);
        await fs.writeFile('bd.json', JSON.stringify(users));
        res.status(201).json({ message: "User created" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message }); // Повертаємо помилку валідації
    }
});

// PUT - Оновити існуючого користувача за ID
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fs.readFile('bd.json', 'utf8');
        const users = JSON.parse(data);
        const index = +id - 1;
        if (index >= 0 && index < users.length) {
            const updatedUser = req.body;

            // Валідація оновленого користувача перед збереженням
            validateUser(updatedUser);

            users[index] = updatedUser;
            await fs.writeFile('bd.json', JSON.stringify(users));
            res.json({ message: 'User updated' });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message }); // Повертаємо помилку валідації
    }
});

// DELETE - Видалити користувача за ID
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fs.readFile('bd.json', 'utf8');
        const users = JSON.parse(data);
        const index = +id - 1;
        if (index >= 0 && index < users.length) {
            users.splice(index, 1);
            await fs.writeFile('bd.json', JSON.stringify(users));
            res.sendStatus(204);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error writing data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
