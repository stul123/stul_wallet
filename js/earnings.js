const def = [];

const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

const months = [
    'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
    'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
];

const colors = [
    '#FAD02E', '#F6E09D', '#F3F3F3', '#E6F0E8', '#A5D6A7', '#C1D37F', '#FFF7B1', '#F2D7EE', '#F0F0F0', '#A9E5BB',
    '#F3EFEF', '#E0EBE5', '#A3E4D7', '#D9E7E9', '#D1EEF2', '#F5DCCF', '#D7E7E7', '#F9C96F', '#E8E6C9', '#FAD48E',
    '#FAD6A2', '#BDD2B7', '#FFC6A0', '#DFE5E2', '#FFE96E', '#DEA3A3', '#C9E6F0', '#C9C9C9', '#E3E6E4', '#F4F4F4',
    '#E5D8B3', '#C6D8C6', '#E1C6C6', '#A7C8F2', '#CFD7E0', '#E1F4FC', '#E1B1B1', '#F1F9F9', '#E3EBF1', '#E5E6C9',
    '#C9E6C9', '#F3F3F3', '#A5D6A7', '#C1D37F', '#FFF7B1', '#F2D7EE', '#F0F0F0', '#A9E5BB', '#F3EFEF', '#E0EBE5',
    '#A3E4D7', '#D9E7E9', '#D1EEF2', '#F5DCCF', '#D7E7E7', '#F9C96F', '#E8E6C9', '#FAD48E', '#FAD6A2', '#BDD2B7',
    '#FFC6A0', '#DFE5E2', '#FFE96E', '#DEA3A3', '#C9E6F0', '#C9C9C9', '#E3E6E4', '#F4F4F4', '#E5D8B3', '#C6D8C6',
    '#E1C6C6', '#A7C8F2', '#CFD7E0', '#E1F4FC', '#E1B1B1', '#F1F9F9', '#E3EBF1', '#E5E6C9', '#C9E6C9', '#F3F3F3',
    '#A5D6A7', '#C1D37F', '#FFF7B1', '#F2D7EE', '#F0F0F0', '#A9E5BB', '#F3EFEF', '#E0EBE5', '#A3E4D7', '#D9E7E9',
    '#D1EEF2', '#F5DCCF', '#D7E7E7', '#F9C96F', '#E8E6C9', '#FAD48E', '#FAD6A2', '#BDD2B7', '#FFC6A0', '#DFE5E2',
    '#FFE96E', '#DEA3A3', '#C9E6F0', '#C9C9C9', '#E3E6E4', '#F4F4F4', '#E5D8B3', '#C6D8C6', '#E1C6C6', '#A7C8F2',
    '#CFD7E0', '#E1F4FC',
];

var main_date_array = [];

function getdate(date) {
    var month = date.getMonth() + 1;
    var monthString = month < 10 ? '0' + month : '' + month;
    main_date_array.push({
        month_num: monthString,
        year: date.getFullYear(),
        month: months[month - 1]
    });
    return `${monthString}/${date.getFullYear()} | ${months[month - 1]}`;
}

function generateDateRange() {
    var startDate = new Date(2023, 9);
    let date = new Date();
    var newDate = new Date(date.setMonth(date.getMonth() + 1));
    while (startDate <= newDate) {
        getdate(startDate)
        startDate.setMonth(startDate.getMonth() + 1);
    }
    main_date_array.forEach(month => {
        let options = document.createElement('option');
        options.value = `${month.month_num}/${month.year}`
        options.innerHTML = `${month.month} ${month.year}`
        let this_month = new Date().getMonth() + 1;
        if (month.month_num == this_month) {
            options.setAttribute('selected', 'selected')
        }
        $('#month_select').append(options);
    });
}

generateDateRange();

if (localStorage.earning == undefined) {
    localStorage.setItem('earning', JSON.stringify(def));
}

var link = '?site_sloman)))))))_ili_not_xz_=)';

function formatDate(date) {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

$("#inputDate").val(formatDate(new Date()));

$('#addspend_btn').click(function() {
    var summa = Number($('#summa').val());
    var cat = $('#categoriesselector').val();
    var sms = $('#sms').val();
    var date = $('#inputDate').val();
    var dateParts = date.split('-');
    date = dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0];
    if (sms == '') {
        sms = "-";
    }
    var date_for_check = dateParts[1] + '/' + dateParts[0];
    var last_year = main_date_array[main_date_array.length - 1].year;
    var last_month = main_date_array[main_date_array.length - 1].month_num;
    var first_year = main_date_array[0].year;
    var first_month = main_date_array[0].month_num;
    if (typeof summa === 'number' && !isNaN(summa) && summa != '') {
        if (cat != null && cat != 'На че потратил ? (категория)') {
            if (checkDate(`${first_month}/${first_year}`, `${last_month}/${last_year}`, date_for_check)) {
                let db = JSON.parse(localStorage.earning);
                db.forEach(element => {
                    if (element[0] === cat) {
                        element[1].push({ text: sms, rub: summa, date: date });
                        localStorage.earning = JSON.stringify(db);
                        good("трата успешно добавлена");
                        console.log(db);
                    }
                });
            } else {
                error('выбери норм дату <br> чтож ты тогда то мог купить негодяй ??? ')
            }
        } else {
            error('чето с категорией не то')
        }
    } else {
        error("трата не является числом или ее нету");
    }
});

$('#clear_earning').click(function() {
    if (confirm('Все данные о зарботке будут удалены без возможности восстановления. Делаем ?')) {
        localStorage.removeItem('earning');
        good('все данные о зарботке удалены');
    } else {
        good('удаление отменено');
    }
});

$('#month_select').change(() => {
    loadmain_page();
});

$('.month .right').click(() => {
    slider_date('+');
});

$('.month .left').click(() => {
    slider_date('-');
});

$('#all_earning_time_btn').click(() => {
    loadmain_page('all');
    $('#month_select').val('все время')
    if ($('#month_select').val() != 'все время') {
        let alltime = document.createElement('option');
        alltime.value = 'все время';
        alltime.innerHTML = 'все время';
        $('#month_select').append(alltime);
        $('#month_select').val('все время')
    }
});

$('#add_earning_btn').click(() => {
    var dolar = Number($('#input_earning').val());
    var date = $('#inputDate').val();
    var dateParts = date.split('-');
    date = dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0];
    var date_for_check = dateParts[1] + '/' + dateParts[0];
    var last_year = main_date_array[main_date_array.length - 1].year;
    var last_month = main_date_array[main_date_array.length - 1].month_num;
    var first_year = main_date_array[0].year;
    var first_month = main_date_array[0].month_num;
    if (typeof dolar === 'number' && !isNaN(dolar) && dolar != '') {
        if (checkDate(`${first_month}/${first_year}`, `${last_month}/${last_year}`, date_for_check)) {
            let db = JSON.parse(localStorage.earning);
            db.push({ summa: dolar, date: date });
            localStorage.earning = JSON.stringify(db);
            good("новый бабос зафиксирован");
            loadmain_page();
            console.log(db);
        } else {
            error('выбери норм дату')
        }
    } else {
        error("бабос не является числом или его нету");
    }
});

var count = [];
var categori_name = [];
var colorsfochart = [];
var check_month;

function loadmain_page(time) {
    $('.top').html(`<div class="round_info_block"><div class="title"></div><canvas id="round_info"></canvas></div><div class="cats_block"></div>`)
    count = [];
    categori_name = [];
    colorsfochart = [];
    check_month = 0;

    $('#round_info').remove();
    let can = document.createElement('canvas');
    can.setAttribute('id', 'round_info')
    $('.round_info_block').append(can);
    $('#sharemodal').css('display', 'block');
    loadwastes(JSON.parse(localStorage.earning), time);
}

function loadwastes(db, time) {
    var select_month = $('#month_select').val();
    if (select_month == 'все время' && time != 'all') {
        loadmain_page('all')
        return;
    }
    var all_price = 0;
    var price = 0;
    var ok;
    db.forEach(cat => {
        price += cat.summa;
        if (time == 'all') {
            let color = randomizeColor();
            count.push(cat.summa);
            categori_name.push(cat.date);
            colorsfochart.push(color);
            let line = document.createElement('div');
            line.className = 'line';
            line.innerHTML = `<p>${d(cat.date)}</p><p>${n(cat.summa)}&nbsp;$</p>`
            $('.cats_block').append(line)
            ok = 1;
            all_price += cat.summa;

        } else if (cat.date.slice(3) == select_month && price != 0) {
            let color = randomizeColor();
            count.push(cat.summa);
            categori_name.push(cat.date);
            colorsfochart.push(color);
            let line = document.createElement('div');
            line.className = 'line';
            line.innerHTML = `<p>${d(cat.date)}</p><p>${n(cat.summa)}&nbsp;$</p>`
            $('.cats_block').append(line)
            ok = 1;
            all_price += cat.summa;
        }
    });
    if (categori_name == '') {
        $('.top').html(`<p class="niche_netu"> <span>за ${ formatMonthYear($('#month_select').val())} не было бабоса </span> <br>PS: данные хранятся у тебя в браузере</p>`)
    }
    if (ok == 1) {
        getchart(count, categori_name, colorsfochart, `<span>заработок</span><span>${n(all_price)}&nbsp;$</span>`);
    }
}

function getchart(data, labels, colors, title) {
    $('.round_info_block .title').html(title);
    var ctx = document.getElementById('round_info').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
            }],
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: false,
                    text: 'все траты'
                }
            },
            responsive: true,
            animation: {
                animateRotate: true,
                animateScale: false,
            },
        }
    });
}

function error(ms) {
    if (ms != '') {
        let error = document.createElement('div');
        error.className = 'error';
        error.innerHTML = ms;
        $('.ms_block').prepend(error);
        setTimeout(() => {
            error.remove();
        }, 5000)
    }
}

function good(ms) {
    if (ms != '') {
        let good = document.createElement('div');
        good.className = 'good';
        good.innerHTML = ms;
        $('.ms_block').prepend(good);
        setTimeout(() => {
            good.remove();
        }, 5000)
    }

}

function randomizeColor() {
    while (true) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        if (!colorsfochart.includes(randomColor)) {
            return randomColor;
        }
    }
}

function n(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "&nbsp;");
}

function d(enterDate) {
    var dateParts = enterDate.split('/');
    if (dateParts.length !== 3) {
        error("неверный формат даты");
        return enterDate;
    }
    var day = parseInt(dateParts[0], 10);
    var month = parseInt(dateParts[1], 10) - 1;
    var year = parseInt(dateParts[2], 10);
    var shortDay = daysOfWeek[new Date(year, month, day).getDay()];
    year = year % 100;
    var date = `${day}/${month + 1}/${year} ${shortDay}`;
    return date;
}


function checkDate(startDate, endDate, targetDate) {
    var [startMonth, startYear] = startDate.split('/');
    var [endMonth, endYear] = endDate.split('/');
    var [targetMonth, targetYear] = targetDate.split('/');
    var startMonthNum = parseInt(startMonth, 10);
    var startYearNum = parseInt(startYear, 10);
    var endMonthNum = parseInt(endMonth, 10);
    var endYearNum = parseInt(endYear, 10);
    var targetMonthNum = parseInt(targetMonth, 10);
    var targetYearNum = parseInt(targetYear, 10);
    var startDateObj = new Date(startYearNum, startMonthNum - 1, 1);
    var endDateObj = new Date(endYearNum, endMonthNum, 0);
    var targetDateObj = new Date(targetYearNum, targetMonthNum - 1, 1);
    return targetDateObj >= startDateObj && targetDateObj <= endDateObj;
}

function slider_date(token) {
    let month = $('#month_select').val();
    main_date_array.forEach(function(element, index) {
        if (month == `${element.month_num}/${element.year}`) {
            switch (token) {
                case "+":
                    var new_index = main_date_array[index + 1];
                    if (new_index != undefined) {
                        console.log(`${new_index.month_num}/${new_index.year}`);
                        $("#month_select").val(`${new_index.month_num}/${new_index.year}`)
                        loadmain_page();
                    } else {
                        error("Дальше некуда листать")
                    }
                    break;
                case "-":
                    var new_index = main_date_array[index - 1];
                    if (new_index != undefined) {
                        console.log(`${new_index.month_num}/${new_index.year}`);
                        $("#month_select").val(`${new_index.month_num}/${new_index.year}`)
                        loadmain_page();
                    } else {
                        error("Меньше некуда листать")
                    }
                    break;
                default:
                    error('ошибка при смене месяца');
                    break;
            }
        }
    });
}

function formatMonthYear(input) {
    var parts = input.split('/');
    var month_format = parseInt(parts[0], 10);
    var year = parts[1];
    if (month_format >= 1 && month_format <= 12) {
        var monthName = months[month_format - 1];
        return `${monthName} ${year}`;
    } else if (input == 'все время') {
        return input;
    } else {
        error('Неверный месяц');
    }
}