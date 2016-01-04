var options = {
    "animate": true,
    "patternWidth": 358.69,
    "patternHeight": 189.97,
    "grainOpacity": 0.23,
    "grainDensity": 1.31,
    "grainWidth": 1,
    "grainHeight": 1
}
grained("#home", options);
$(document).ready(function () {
    $('.rotate').textrotator({
        animation: "dissolve", // You can pick the way it animates when rotating through words. Options are dissolve (default), fade, flip, flipUp, flipCube, flipCubeUp and spin.
        separator: ",", // If you don't want commas to be the separator, you can define a new separator (|, &, * etc.) by yourself using this field.
        speed: 7000 // How many milliseconds until the next word show.
    });
    //$(document.body).vide("content/video/ocean");
});