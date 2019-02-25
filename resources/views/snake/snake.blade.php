<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <script src="{{url('js/app.js')}}"></script>
        <script src="{{url('js/vuegen.js')}}"></script>
        <title>Document</title>
    </head>
    <body>
        <div id="app">
            <snake-component>

            </snake-component>
        </div>
    </body>
    <script type="text/javascript">
        var app = new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue!'
            }
        })
    </script>
</html>