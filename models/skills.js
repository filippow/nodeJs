module.exports = {
    db: require('./db'),

    /**
     * Сохранение объекта с навыками в базу данных
     * @param skills
     */
    setRecords: function (skills) {
        this.db.set('skills.age', skills.age)
            .set('skills.concerts', skills.concerts)
            .set('skills.cities', skills.cities)
            .set('skills.years', skills.years)
            .write();
    },

    /**
     * Возвращает массив записей навыков для рендеринга на главной странице
     * @returns {*[]}
     */
    getRecords: function () {
        const defaultCounter = {
                age: 120,
                concerts: 760,
                cities: 300,
                years: 200
            },
            counter = this.db.get('skills').value() || defaultCounter;

        return [
            {
                text: 'Возраст начала занятий на скрипке',
                number: counter.age
            },
            {
                text: 'Концертов отыграл',
                number: counter.concerts
            },
            {
                text: 'Максимальное число городов в туре',
                number: counter.cities
            },
            {
                text: 'Лет на сцене в качестве скрипача',
                number: counter.years
            }
        ]
    }
};