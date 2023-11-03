<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <?php
        if (isset($_GET['share'])) {
            echo '
            <meta name="description" content="кто-то поделился расходами =)">
            <meta name="author" content="stul">
            <meta property="og:site_name" content="stul кошель | расходы">
            <meta name="og:title" content="stul кошель | расходы">
            <meta name="og:description" content="кто-то поделился расходами =)">
            ';
        } else {
            echo '
            <meta name="description" content="добовление/отслеживание расходов и доходов by stul (удобно очень)">
            <meta name="author" content="stul">
            <meta property="og:site_name" content="stul кошель | расходы">
            <meta name="og:title" content="stul кошель | расходы">
            <meta name="og:description" content="добовление/отслеживание расходов и доходов by stul (удобно очень)">
            ';
        }
    ?>
        <meta name="keywords" content="отслеживаниен расходов ">
        <meta name="og:image" content="https://smski.site/fav/apple-touch-icon.png">
        <meta name="og:url" content="https://smski.site/w">
        <!-- bootstrap -->
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-fQybjgWLrvvRgtW6bFlB7jaZrFsaBXjsOMm/tB9LTS58ONXgqbR9W8oWht/amnpF" crossorigin="anonymous"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <title>stul кошель</title>
        <link rel="stylesheet" href="./css/style.css">
        <link rel="apple-touch-icon" sizes="180x180" href="./fav/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="./fav/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="./fav/favicon-16x16.png">
        <link rel="manifest" href="./fav/site.webmanifest">
        <link rel="mask-icon" href="./fav/safari-pinned-tab.svg" color="#5bbad5">
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="theme-color" content="#ffffff">

</head>

<body>
    <main>
        <div class="main_con rounded-4 shadow">
            <div class="tabs">
                <a href="https://smski.site" class="home_btn">
                    <img src="./fav/favicon-32x32.png" alt="favicon">
                </a>
                <a id="reload_btn" class="tab active">home</a>
                <a href="./add/" class="tab">add spend</a>
                <a href="./earnings/" class="tab">earnings</a>
            </div>
            <div class="modal-content">
                <div class="month">
                    <div class="left row btn btn-primary btn-sm">➤</div>
                    <select id="month_select">
                        <!-- <option value="все время" disabled>все время</option> -->
                    </select>
                    <div class="right row btn btn-primary btn-sm">➤</div>
                </div>
                <div class="top">
                    <div class="round_info_block">
                        <div class="title"></div>
                        <canvas id="round_info"></canvas>
                    </div>
                    <div class="cats_block"></div>
                </div>
                <div class="all_info"></div>
                <div class="sharemodel_btn_block">
                    <div class="btns_block">
                        <a href="./add" class="btn btn-primary btn-sm none" id="potratit_btn">потратить</a>
                        <div class="btn btn-primary btn-sm" id="clearw">reset</div>
                        <div class="btn btn-primary btn-sm" id="getalltime">all time</div>
                        <div class="btn btn-primary btn-sm" id="sharemodal" data-toggle="modal" data-target="#share">share</div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <!-- popup -->
    <div id="share" class="modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="close">
                    <h1 class="modal-title fs-6">Поделись или перенеси все данные</h1>
                    <button type="button" class="btn btn-secondary btn-sm" id="closecatpopup" data-dismiss="modal">X</button>
                </div>
                <div class="mb-2">
                    <div class="time_select_block">
                        <p>ссылка действительна </p>
                        <select id="time">
                            <option value="10 minutes">10 минут</option>
                            <option value="1 hour" selected>1 час</option>
                            <option value="1 day">1 день</option>
                            <option value="1 week">1 неделю</option>
                            <option value="1 months">1 месяц</option>
                            <option value="6 months">6 месяцев</option>
                            <option value="1 year">1 год</option>
                        </select>
                    </div>
                    <p class="fs-10 mb-2">ссылка доступна всия инета</p>
                    <button id="regenqr" class="btn btn-primary btn-sm">Регенерировать ссылку и QR</button>
                </div>
                <div class="form-floating mb-3">
                    <img src="./fav/goodday.jpg" class="qrshare" alt="qrcode">
                </div>
                <button id="btn_share" class="btn btn-primary btn-sm mb-2">Поделиться</button>
                <button id="copyshare" class="btn btn-primary btn-sm">Скопировать ссылку</button>
            </div>
        </div>
    </div>
    <div id="line_edit" class="modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="close mb-2">
                    <h1 class="modal-title fs-6">Изменить расход</h1> 
                </div>
                <div class="mb-2">
                    <p>Скок потратил ₽:</p>
                    <input type="number" maxlength="30" class="form-control rounded-3 mb-3" id="summa" data-id="" inputmode="numeric" placeholder="Скок потратил ₽ ?">
                    <p>Смс/оправдание (не обязон):</p>
                    <input type="text" maxlength="100" class="form-control rounded-3 mb-3" id="sms" data-id="" placeholder="Смс/оправдание (не обязон)">
                    <div class="form-group when_block">
                        <input type="date" id="inputDate"  data-id="" class="form-control">
                        <label for="inputDate">-дата</label>
                    </div>
                </div>
                <button id="save_new_line" class="btn btn-primary btn-sm">Сохранить</button>
            </div>
        </div>
    </div>
    <div class="ms_block"></div>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="./js/jquery-3.6.1.min.js"></script>
    <script src="./js/main.js"></script>
    <script>
        loadmain_page();
    </script>
</body>

</html>