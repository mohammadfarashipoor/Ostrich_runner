var show_ground;
var jump_interval, down_interval, score_interval, forward_interval, speed_interval;
var show;
var player, player_img, player_img2, player_y = -7,
    player_x = 0;
var show_speed = 1.2;
var jump_speed = 1.85,
    down_speed = 1,
    player_speed = 0.5;
var show_x = 0;
var is_hover = true,
    s = true;
var j = true,
    time;
var wall_count = 0,
    wall_speed = 1.1,
    last_wall = 0,
    generate_cacus = 7000;
var score = 0;

function spin_ground() {
    time = new Date().getTime();

    show = document.getElementById("area-game");

    show.style.backgroundPositionX = show_x + "px";



    show_x -= show_speed;
    if (last_wall == 0 && wall_count == 0) {
        last_wall = time;
    }

    if (time > last_wall + generate_cacus) {
        generate_wall();

        last_wall = time;
        generate_cacus = generate_between(1800, 2000);
    }
    if (wall_count != 0) {
        for (var i = 0; i < wall_count; i++)
            move_wall(i);
    }


}


function generate_between(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
document.onkeydown = function(g) {

    var key = g.keyCode;

    if (is_hover && (key == 32 || key == 38)) {
        jump_interval = setInterval(jump, 1);
        player_img2 = document.getElementById("player2");
        player_img = document.getElementById("player");

        player_img2.style.display = "none";
        player_img.style.display = "block";

        if (j) {
            show_ground = setInterval(spin_ground, 1);

        }
        j = false;
    }

}

function jump() {
    player = document.getElementById("player-area");
    is_hover = false;
    if (player_y < 100) {
        player.style.bottom = player_y + "px";

        player_y += jump_speed;
    } else {
        clearInterval(jump_interval);
        down_interval = setInterval(down, 1);

    }
}

function down() {
    player = document.getElementById("player-area");
    if (player_y >= -9) {
        player.style.bottom = player_y + "px";

        player_y -= down_speed;
    } else {
        clearInterval(down_interval);
        is_hover = true;
        forward_interval = setInterval(move_forward, 1);
    }
}

function score_game() {
    score += 1;
    var score_manage = score.toString().padStart(5, 0);

    document.getElementById("score").innerHTML = score_manage;
}


function move_forward() {
    if (player_x < 30) {
        player.style.left = player_x + "px";
        player_x += player_speed;
    } else {
        clearInterval(forward_interval);
        speed_interval = setInterval(speed_increes, 15000);
        if (s) {
            score_interval = setInterval(score_game, 100);
        }
    }
}

function generate_wall() {
    var random_size = generate_between(33, 38);
    var random_rotat = generate_between(0, 1);
    if (random_rotat == 1)
        random_rotat = 180;
    var wall = "<img src='./image/1.jpg' class='wall' id='t" + wall_count + "' style='right:-4px;width:" + random_size + "px;transform:rotateY(" + random_rotat + "deg);'>";
    wall_count += 1;
    document.getElementById("barrier").innerHTML += wall;
}

function move_wall(nth) {
    var wall_i = document.getElementById("t" + nth);
    var x_pos = parseFloat(wall_i.style.right.split("px")[0]);

    if (x_pos < 700) {
        x_pos += wall_speed;
        wall_i.style.right = x_pos + "px";
    } else {
        for (var i = nth + 1; i < wall_count; i++)
            document.getElementById("t" + i).id = "t" + (i - 1);

        wall_count -= 1;
        wall_i.remove();

    }
    if (x_pos > 500) {
        if (is_collide("#collisine_area", "#t" + nth)) {
            gameover();
        }
    }
}


function speed_increes() {
    show_speed += 0.07;
    wall_speed += 0.07;
}

function is_collide(main_obj, other_obj) {
    var hit = $(main_obj).collision(other_obj);


    if (hit.length == 0)
        return false;
    else
        return true;
}

function gameover() {
    player_img2.style.display = "block";
    player_img.style.display = "none";
    score = 0;
    s = false;
    clearInterval(score_interval);
    clearInterval(show_ground);
    clearInterval(jump_interval);
    clearInterval(down_interval);
    clearInterval(forward_interval);

    document.getElementById("gameover").style.display = "block";
}

function reset() {
    location.reload();

}