const def = [
    ["доставка", []],
    ["кафе", []],
    ["магаз", []],
    ["такса", []],
    ["ежемесячные", []]
];

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

if (localStorage.db == undefined) {
    localStorage.setItem('db', JSON.stringify(def));
}

var link = '?site_sloman)))))))_ili_not_xz_=)';

function formatDate(date) {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

$("#inputDate").val(formatDate(new Date()));

function loadcategories() {
    $('#categoriesselector').html(' <option selected disabled>На че потратил ? (категория)</option>');
    JSON.parse(localStorage.db).forEach(element => {
        let option = document.createElement('option');
        option.value = element[0];
        option.innerHTML = element[0];
        $('#categoriesselector').append(option);
    });
}

$('#addcategori').click(() => {
    let text = $('#pluscat').val();
    if (text != '') {
        let db = JSON.parse(localStorage.db);
        db.push([text, []]);
        localStorage.db = JSON.stringify(db);
        loadcategories();
        good('добавили категорию');
        $('#closecatpopup').click();
    } else {
        error('впиши чето в поле')
    }
});

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
                let db = JSON.parse(localStorage.db);
                db.forEach(element => {
                    if (element[0] === cat) {
                        element[1].push({ text: sms, rub: summa, date: date });
                        localStorage.db = JSON.stringify(db);
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

$('#delet_btn').click(function() {
    if (confirm('Все данные будут удалены без возможности восстановления. Делаем ?')) {
        localStorage.removeItem('db');
        localStorage.removeItem('earning');
        good('все данные удалены');
    } else {
        good('удаление всего отменено');
    }
});

$('#sharemodal').click(function() {
    generate_link("1 hour")
    if (categori_name == '') {
        $('#share .form-floating').remove();
        $('#share .modal-title').html('нечем делиться');
        $('#btn_share').remove();
        $('#copyshare').remove();
    }
});

$("#copyshare").click(function() {
    var tempTextarea = $("<textarea>").val(link).appendTo("body").select();
    document.execCommand("copy");
    tempTextarea.remove();
    good('ссылка скопирована');
});

$('#btn_share').click(function() {
    if (navigator.share) {
        navigator.share({
                title: 'Поделиться/перенести stul кошель',
                text: 'Ссылка чтобы поделиться или перенести данные из stul кошель',
                url: link
            })
            .then(() => good('Можешь делиться!'))
            .catch((error) => error('ошибка при отправки'));
        good(link);
    } else {
        error('Ваш браузер не поддерживает функцию поделиться. Пожалуйста, вручную скопируйте ссылку и поделитесь ею.');
    }
});

$('#month_select').change(() => {
    loadmain_page();
});

$('#reload_btn').click(() => {
    var url = window.location.href;
    if (url.indexOf("?") !== -1) {
        url = url.substring(0, url.indexOf("?"));
    }
    url = url.replace("js", "");
    $('#savenewdb').remove();
    setLocation(url);
    loadmain_page()
});

$('.month .right').click(() => {
    slider_date('+');
});

$('.month .left').click(() => {
    slider_date('-');
});

$('#getalltime').click(() => {
    loadmain_page('all');
    $('#month_select').val('все время')
    console.log($('#month_select').val());
    if ($('#month_select').val() != 'все время') {
        let alltime = document.createElement('option');
        alltime.value = 'все время';
        alltime.innerHTML = 'все время';
        $('#month_select').append(alltime);
        $('#month_select').val('все время')
    }
});

$('#clearw').click(() => {
    loadmain_page();
});

$('#regenqr').click(() => {
    let time = $('#time').val();
    if (time == '10 minutes' || time == '1 hour' || time == '1 day' || time == '1 week' || time == '1 months' || time == '6 months' || time == '1 year') {
        generate_link(time, "ms")
    } else {
        error('чето с таймингом не то')
    }
});

$('#save_new_line').click(() => {
    var summa = Number($('#summa').val());
    var sms = $('#sms').val();
    var date = $('#inputDate').val();
    var old_summa = Number($('#summa').attr('data-id'));
    var old_sms = $('#sms').attr('data-id');
    var old_date = $('#inputDate').attr('data-id');


    var dateParts = date.split('-');
    date = dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0];
    var dateParts = old_date.split('-');
    old_date = dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0];
    console.log(old_sms)
    console.log(old_summa)
    console.log(old_date)
    if (sms == '') {
        sms = "-";
    }
    var date_for_check = dateParts[1] + '/' + dateParts[0];
    var last_year = main_date_array[main_date_array.length - 1].year;
    var last_month = main_date_array[main_date_array.length - 1].month_num;
    var first_year = main_date_array[0].year;
    var first_month = main_date_array[0].month_num;
    if (typeof summa === 'number' && !isNaN(summa) && summa != '') {
        if (checkDate(`${first_month}/${first_year}`, `${last_month}/${last_year}`, date_for_check)) {
            let db = JSON.parse(localStorage.db);
            var check = 0;
            db.forEach(trati => {
                trati[1].forEach(element => {
                    if (element.text == old_sms && element.rub == old_summa && element.date == old_date) {
                        check = 1;
                        element.text = sms;
                        element.rub = summa;
                        element.date = date;
                        localStorage.db = JSON.stringify(db)
                        good('данные обновлены')
                        loadmain_page();
                        $('#line_edit').click()
                    }
                });
            });
            if (check == 0) {
                error('данных для замены нету (((')
            }
        } else {
            error('выбери норм дату <br> чтож ты тогда то мог купить негодяй ??? ')
        }
    } else {
        error("трата не является числом или ее нету");
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
    $('.all_info').html('');
    $('.cats_block').html('');
    $('#round_info').remove();
    let can = document.createElement('canvas');
    can.setAttribute('id', 'round_info')
    $('.round_info_block').append(can);
    var parts = window.location.href.split('?');
    if (parts.length > 1) {
        var params = parts[1].split('&');
        for (var i = 0; i < params.length; i++) {
            var param = params[i].split('=');
            if (param[0] === 'share') {
                $('#sharemodal').css('display', 'none');
                var shareValue = param[1];
                $('#savenewdb').remove();
                let up = document.createElement('div');
                up.classList = 'btn btn-primary btn-sm';
                up.setAttribute('id', 'savenewdb');
                up.innerHTML = 'Сохранить эти данные вместо своих';
                $('.sharemodel_btn_block').append(up);
                var share_db;
                console.log(shareValue)
                $.ajax({
                    url: "./share/show.php",
                    method: "post",
                    dataType: 'json',
                    data: {
                        "token": shareValue,
                    },
                    success: function(data) {
                        loadmain_page_mini(data);
                    },
                    error: function(data) {
                        loadmain_page_mini(data);
                    }
                });

                function loadmain_page_mini(data) {
                    let token = data.responseText.split('|');
                    if (token[0] == 'TOKEN') {
                        let res_token = token[1];
                        if (res_token == 'ссылка устарела' || res_token == 'ссылка не найдена') {
                            error('ссылка устарела')
                            window.history.pushState({}, document.title, window.location.href.split('?')[0]);
                            loadmain_page();
                            $('#savenewdb').css('display', 'none');
                        } else {
                            var base64Url = res_token.split('.')[1];
                            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                            var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
                                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                            }).join(''));
                            share_db = JSON.parse(jsonPayload);
                            loadwastes(share_db, time);
                        }
                    } else {
                        error(data.responseText);
                    }
                }
                $('#savenewdb').click(function() {
                    if (confirm('Все ваши данные будут заменены. Делаем ?')) {
                        localStorage.db = JSON.stringify(share_db);
                        good('данные обновлены');
                        loadmain_page();
                    } else {
                        good('замена отменена');
                    }
                });
                break;
            } else {
                $('#sharemodal').css('display', 'block');
                loadwastes(JSON.parse(localStorage.db), time);
            }
        }
    } else {
        $('#sharemodal').css('display', 'block');
        loadwastes(JSON.parse(localStorage.db), time);
    }
}

function loadwastes(db, time) {
    var select_month = $('#month_select').val();
    if (select_month == 'все время' && time != 'all') {
        loadmain_page('all')
        return;
    }
    var all_price = 0;
    var check_price = 0;
    db.forEach(cat => {
        var price = 0;
        var cat_name = cat[0];
        var catlength = 0;
        var block_info = document.createElement('div');
        block_info.className = 'block_info';
        cat[1].forEach(element => {
            let proebal = document.createElement("div");
            proebal.className = "proebal";
            proebal.innerHTML = `<p>${element.text} <span>${d(element.date)}</span> <span data-toggle="modal" data-target="#line_edit" id="line_edit_btn" data-date="${element.date}" data-text="${element.text}" data-rub="${element.rub}" class="btn btn-primary btn-sm">ред.</span></p><p>${n(element.rub)}&nbsp;₽</p>`;
            if (time == 'all') {
                price += element.rub;
                block_info.append(proebal);
                check_month += 1;
                catlength += 1;
                check_price += element.rub;
            } else if (element.date.slice(3) == select_month) {
                price += element.rub;
                block_info.append(proebal);
                check_month += 1;
                catlength += 1;
                check_price += element.rub;
            }
        });
        let tit = document.createElement('div');
        tit.className = "cat_title";
        var tab_price = '';
        console.log(check_price)
        console.log(price)
        console.log(cat[1][0])
        if (cat[1][0] != undefined && price == cat[1][0].rub) {
            var tab_price = '↙';
        } else if (price != 0) {
            var tab_price = price + "&nbsp;₽";
        }
        all_price += price;
        tit.innerHTML = `<p>${cat_name} [${catlength}]</p><p>${n(tab_price)}</p>`;
        block_info.prepend(tit);
        if (cat[1][0] != undefined && catlength != 0) {
            $('.all_info').append(block_info);
        }
        let btn_cat = document.createElement('div');
        btn_cat.className = "btn_cat";
        btn_cat.innerHTML = `<span class="cat_name">${cat_name}</span><span> ${n(price)}&nbsp;₽</span> `;
        if (price != 0) {
            let color = randomizeColor();
            count.push(price);
            categori_name.push(cat_name);
            colorsfochart.push(color);
            btn_cat.style.background = color;
            $('.cats_block').append(btn_cat);
        }
    });
    if (categori_name == '') {
        $('#sharemodal').css('display', 'none');
        $('#clearw').css('display', 'none');
        $('#potratit_btn').removeClass('none')
        $('.top').html(`<p class="niche_netu"> <span>за ${ formatMonthYear($('#month_select').val())} расходов не наблюдается </span> <br>PS: данные хранятся у тебя в браузере</p>`)
    } else {
        getchart(count, categori_name, colorsfochart, `<span>все траты</span><span>${n(all_price)}&nbsp;₽</span>`);
    }
    if ($('#savenewdb').css('display') == 'block') {
        $('#potratit_btn').css('display', 'none')
    }
    $('.btn_cat').click(function() {
        let cat = $(this).find('span.cat_name').text()
        showcat(cat, db, time);
    });
    edit_line()

}

function showcat(cat, db, time) {
    var select_month = $('#month_select').val();
    $('.all_info').html('');
    $('#round_info').remove();
    let can = document.createElement('canvas');
    can.setAttribute('id', 'round_info')
    $('.round_info_block').append(can);
    var check_price = 0;
    var catlength = 0;
    count = [];
    categori_name = [];
    db.forEach(element => {
        if (element[0] === cat) {
            var price = 0;
            var block_info = document.createElement('div');
            var cat_name = element[0];
            block_info.className = 'block_info';
            element[1].forEach(element => {
                let proebal = document.createElement("div");
                proebal.className = "proebal";
                proebal.innerHTML = `<p>${element.text} <span>${d(element.date)}</span> <span  data-toggle="modal" data-target="#line_edit" id="line_edit_btn" data-date="${element.date}" data-text="${element.text}" data-rub="${element.rub}" class="btn btn-primary btn-sm">ред.</span></p><p>${n(element.rub)}&nbsp;₽</p>`;
                if (time == 'all') {
                    price += element.rub;
                    count.push(element.rub);
                    categori_name.push(element.text);
                    block_info.append(proebal);
                    check_month += 1;
                    catlength += 1;
                    check_price += element.rub;
                } else if (element.date.slice(3) == select_month) {
                    price += element.rub;
                    count.push(element.rub);
                    categori_name.push(element.text);
                    block_info.append(proebal);
                    check_month += 1;
                    catlength += 1;
                    check_price += element.rub;
                }
            });
            let tit = document.createElement('div');
            tit.className = "cat_title";
            if (price == element[1][0].rub) {
                itog_price = '↙';
            } else {
                itog_price = price + "&nbsp;₽";
            }
            tit.innerHTML = `<p>${cat_name} [${catlength}]</p><p>${n(itog_price)}</p>`;
            block_info.prepend(tit);
            $('.all_info').append(block_info);
            getchart(count, categori_name, colors, `<span>${cat}</span><span>${n(price)}&nbsp;₽</span>`);
        }
    });
    $('.proebal').click(function() {
        console.log(1)
            // console.log($(this).attr('btn-data'))
    });
    edit_line()
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

function base64UrlEncode(str) {
    var bytes = new TextEncoder().encode(str);
    var base64 = btoa(String.fromCharCode.apply(null, bytes));
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function createJwt(payloadArray) {
    var header = {
        alg: 'HS256',
        typ: 'JWT',
    };
    var encodedHeader = base64UrlEncode(JSON.stringify(header));
    var encodedPayload = base64UrlEncode(JSON.stringify(payloadArray));
    var signature = base64UrlEncode(unescape(encodeURIComponent(encodedHeader + '.' + encodedPayload)));
    var jwtToken = encodedHeader + '.' + encodedPayload + '.' + signature;
    return jwtToken;
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

function setLocation(curLoc) {
    try {
        history.pushState(null, null, curLoc);
        return;
    } catch (e) {
        console.error(e);
    }
}

function generate_link(time, ms) {
    let token = createJwt(JSON.parse(localStorage.db))
    $.ajax({
        url: "./share/add.php",
        method: "post",
        dataType: 'json',
        data: {
            "token": token,
            "time": time
        },
        success: function(data) {
            let id = data.responseText.split('|');
            if (id[0] == 'ID') {
                let token = id[1];
                link = `${location.protocol}//${location.host+ location.pathname}?share=${token}`;
                $('.qrshare').attr('src', `https://api.qrserver.com/v1/create-qr-code/?data=${link}&size=700x700&margin=0`)
                if (ms == 'ms') good('ссылка/QR сгенерированы');
            } else {
                error(data.responseText);
            }
        },
        error: function(data) {
            let id = data.responseText.split('|');
            if (id[0] == 'ID') {
                let token = id[1];
                link = `${location.protocol}//${location.host+ location.pathname}?share=${token}`;
                $('.qrshare').attr('src', `https://api.qrserver.com/v1/create-qr-code/?data=${link}&size=700x700&margin=0`)
                if (ms == 'ms') good('ссылка/QR сгенерированы');
            } else {
                error(data.responseText);
            }
        }
    });
}

function edit_line() {
    $('.proebal .btn').click(function() {
        var date = $(this).attr('data-date');
        var rub = $(this).attr('data-rub');
        var text = $(this).attr('data-text');
        var parts = date.split("/");
        var day = parts[0];
        var month = parts[1];
        var year = parts[2];
        var newDate = year + "-" + month + "-" + day;
        $('#summa').val(rub)
        $('#inputDate').val(newDate)
        $('#sms').val(text)
        $('#summa').attr('data-id', rub)
        $('#inputDate').attr('data-id', newDate)
        $('#sms').attr('data-id', text)
    });
}