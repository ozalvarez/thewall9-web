$(function () {

});
$(document).ready(function () {
    var granimInstance = new Granim({
        element: '#services-canvas',
        name: 'basic-gradient',
        direction: 'left-right',
        opacity: [1, 1],
        isPausedWhenNotInView: true,
        states: {
            "default-state": {
                gradients: [
                    ['#FF144B', '#190b27'],
                    ['#470718', '#700c1d'],
                    ['#cc0106', '#a50206']
                ]
            }
        }
    });
});