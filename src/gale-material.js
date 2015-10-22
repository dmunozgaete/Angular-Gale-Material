angular.manifiest('gale-material', [
    'gale-material.templates',
    'gale-material.components'
], [
    'gale',      //ANGULAR GALE CORE LIBRARY
    'ngMaterial' //MATERIAL DESIGN DIRECTIVES
])

//------------------------------------------------------------
//ADD DEFAULT THEME STYLE'S in DOM Selected By Angular-Material
//Example Use:
//  <div class="md-primary text"         --> Change the color to primary palette
//  <div class="md-primary background"   --> Change the background color to primary palette
.config(['$mdThemingProvider', function($mdThemingProvider)
{
    setTimeout(function()
    {
        //------------------------------------------------------------
        var toRGB = function(color)
        {
            if (color.value)    //Array Format
            {
                color = color.value;
                return "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
            }
            else
            {
                return color;
            }
        };
        //------------------------------------------------------------
        var style = angular.element('<style></style>');
        document.head.appendChild(style[0]);
        stylesheet = style[0].sheet;

        var defaultTheme = (function()
        {
            for (var name in $mdThemingProvider._THEMES)
            {
                return name;
            }
        })();

        var palettes = ["primary", "accent", "warn"];
        for (var i in palettes)
        {
            var theme = palettes[i];
            var palette = $mdThemingProvider._THEMES[defaultTheme].colors[theme].name;
            var color = $mdThemingProvider._PALETTES[palette][500]; //Default color is 500

            stylesheet.insertRule(".md-" + theme + ".text { color: " + toRGB(color) + " }", 0);
            stylesheet.insertRule(".md-" + theme + ".background { background-color: " + toRGB(color) + " }", 0);
        }
        //------------------------------------------------------------

    }, 100);
}]);
