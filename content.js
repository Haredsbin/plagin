!function() {
    // Список стран, фильмы которых нужно блокировать
    const blockedCountries = ["TR", "JP", "KR", "CN", "IN"];  // Турция, Япония, Южная Корея, Китай, Индия

    // Функция для фильтрации карточек главного меню
    function filterMainMenu(items) {
        return items.filter(item => {
            // Проверяем, есть ли в карточке информация о стране
            if (item.country && blockedCountries.includes(item.country)) {
                return false;  // Если страна в списке заблокированных, исключаем карточку
            }
            return true;  // Оставляем карточку, если страна не в списке
        });
    }

    // Функция для отображения фильтрованных карточек
    function displayFilteredMenu(items) {
        const filteredItems = filterMainMenu(items); // Применяем фильтрацию

        if (filteredItems.length === 0) {
            plugin.notify("Нет контента", "Нет доступных фильмов после фильтрации.");
        } else {
            plugin.list(filteredItems);  // Показываем оставшиеся карточки
        }
    }

    // Основная функция плагина
    function main() {
        plugin.add_dir({
            title: 'Главное меню (без турецких и азиатских фильмов)',
            items: [
                {
                    title: 'Фильм 1 (Турция)',
                    country: 'TR',  // Турецкий фильм (будет заблокирован)
                    action: () => plugin.notify('Фильм 1', 'Описание фильма 1'),
                },
                {
                    title: 'Фильм 2 (Южная Корея)',
                    country: 'KR',  // Южнокорейский фильм (будет заблокирован)
                    action: () => plugin.notify('Фильм 2', 'Описание фильма 2'),
                },
                {
                    title: 'Фильм 3 (США)',
                    country: 'US',  // Американский фильм (не заблокирован)
                    action: () => plugin.notify('Фильм 3', 'Описание фильма 3'),
                },
                {
                    title: 'Фильм 4 (Китай)',
                    country: 'CN',  // Китайский фильм (будет заблокирован)
                    action: () => plugin.notify('Фильм 4', 'Описание фильма 4'),
                },
                {
                    title: 'Фильм 5 (Индия)',
                    country: 'IN',  // Индийский фильм (будет заблокирован)
                    action: () => plugin.notify('Фильм 5', 'Описание фильма 5'),
                },
                {
                    title: 'Фильм 6 (Франция)',
                    country: 'FR',  // Французский фильм (не заблокирован)
                    action: () => plugin.notify('Фильм 6', 'Описание фильма 6'),
                },
            ]
        });

        // Получаем текущие элементы главного меню и применяем фильтрацию
        const currentMenuItems = plugin.get_dir(); // Получаем текущие карточки
        displayFilteredMenu(currentMenuItems);  // Отображаем отфильтрованные карточки
    }

    // Запуск плагина
    plugin.run(main);
}();
