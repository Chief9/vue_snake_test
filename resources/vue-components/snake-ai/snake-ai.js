export default {
    props: {},
    data()
    {
        return {
            pressed_key: "",
            arena_width: 15,
            value: null,
            coordinate_x: null,
            coordinate_y: null,
            snake_head_location: null,
            snake_skin: false,
            snake_length: 5,
            snake_history: [],
            dead_snake: false,
            fruit_amount: 2,
            current_fruit: null,
            snake_speed: 100,
            input_set: false,
            fruit_location: [],
            selected_fruit: null,
            closest_fruit: null,
            current_snake_length: null

        };
    },
    methods: {
        snakeStartLocation: function ()
        {
            this.coordinate_x = Math.ceil(this.arena_width / 2);

            this.coordinate_y = Math.ceil(this.arena_width / 2);
        },

        locateFruitAI: function (x, y)
        {
            var fruit_location = this.fruit_location.slice(this.fruit_location.length - this.fruit_amount, this.fruit_location.length);

            var closets_fruit = this.arena_width;

            var selected_fruit = [];

            if ( this.selected_fruit != null )
            {
                var fruit_spot = this.selected_fruit[ 0 ] + "." + this.selected_fruit[ 1 ];
                if ( this.snake_head_location === fruit_spot )
                {
                    for ( var i = 0; i < this.fruit_location.length - 1; i++ )
                    {
                        if ( this.selected_fruit === this.fruit_location[ i ] )
                        {
                            this.fruit_location.splice(i, 1);
                        }
                    }
                }
            }

            fruit_location.forEach(function (fruit)
            {
                var difference_y = Math.abs(fruit[ 1 ]) - Math.abs(y);
                var difference_x = Math.abs(fruit[ 0 ]) - Math.abs(x);

                var absolute_difference = Math.abs(difference_x) + Math.abs(difference_y);

                if ( absolute_difference < closets_fruit )
                {
                    closets_fruit = absolute_difference;

                    selected_fruit = fruit;
                }
            });

            this.selected_fruit = selected_fruit;
        },

        snakeCurrentLocation: function ()
        {
            this.input_set = false;

            this.snakeOutOfBounds();

            //snake head
            this.snake_head_location = this.coordinate_x + "." + this.coordinate_y;

            var snakeCurrently = document.getElementById(this.snake_head_location);

            this.locateFruitAI(this.coordinate_x, this.coordinate_y);


            //snake no head losestate
            if ( snakeCurrently.classList.contains("snake_skin") )
            {
                this.pressed_key = "snak heaven";

                this.dead_snake = true;

                debugger;
            }

            //snake eating
            if ( snakeCurrently.classList.contains("snake_fruit") )
            {
                this.snake_length++;

                this.current_fruit--;

                this.fruit_spawner();

                this.locateFruitAI();

                snakeCurrently.classList.remove("snake_fruit");
            }

            //snake travel history
            this.snakeHistory();

            //snake tail
            var snake_tail = this.snake_history.slice(this.snake_history.length - this.snake_length - 1, this.snake_history.length);

            this.current_snake_length = snake_tail;

            var snakeTailCurrently = document.getElementById(snake_tail[ 0 ]);

            snakeCurrently.classList.add("snake_skin");

            snakeCurrently.classList.add("snake_skull");

            var snake_body = this.snake_history[ this.snake_history.length - 2 ];

            if ( snake_body != null )
            {
                var snake_neck = document.getElementById(snake_body);

                snake_neck.classList.remove("snake_skull");
            }

            if ( this.snake_history.length > this.snake_length )
            {
                snakeTailCurrently.classList.remove("snake_skin");
            }
        },

        snakeHistory: function ()
        {
            this.snake_history.push(this.snake_head_location);
        },

        snakeOutOfBounds: function ()
        {

            if ( this.coordinate_x > this.arena_width )
            {
                this.coordinate_x = 1;
            }

            if ( this.coordinate_y > this.arena_width )
            {
                this.coordinate_y = 1;
            }

            if ( this.coordinate_x === 0 )
            {
                this.coordinate_x = this.arena_width;
            }

            if ( this.coordinate_y === 0 )
            {
                this.coordinate_y = this.arena_width;
            }
        },

        fruit_spawner: function ()
        {
            if ( this.current_fruit < this.fruit_amount )
            {
                var fruit_coordinate_x = Math.floor((Math.random() * this.arena_width) + 1);
                var fruit_coordinate_y = Math.floor((Math.random() * this.arena_width) + 1);
                var fruit_id           = fruit_coordinate_x + "." + fruit_coordinate_y;

                var fruit_location = document.getElementById(fruit_id);
                if ( !(fruit_location.classList.contains("snake_skin")) && !(fruit_location.classList.contains("snake_fruit")) )
                {
                    fruit_location.classList.add("snake_fruit");

                    this.current_fruit++;

                    this.fruit_location.push([ fruit_coordinate_x, fruit_coordinate_y ]);

                }
                this.fruit_spawner();
            }
        },

        moveSnakeAI: function ()
        {
            setInterval(() =>
            {
                var down_block  = false;
                var up_block    = false;
                var left_block  = false;
                var right_block = false;

                var coordinate_x = this.coordinate_x;
                var coordinate_y = this.coordinate_y;

                this.current_snake_length.forEach(function (location)
                {
                    if ( location === (coordinate_x + "." + (coordinate_y + 1)) )
                    {
                        down_block = true;
                    }
                    else if ( location === (coordinate_x + "." + (coordinate_y - 1)) )
                    {
                        up_block = true;
                    }
                    else if ( location === (coordinate_x - 1) + "." + coordinate_y )
                    {
                        left_block = true;
                    }
                    else if ( location === (coordinate_x + 1) + "." + coordinate_y )
                    {
                        right_block = true;
                    }
                });

                if ( this.input_set === false ) ;
                {
                    if ( this.coordinate_y < this.selected_fruit[ 1 ] && this.pressed_key !== "Up" && down_block === false )
                    {
                        this.coordinate_y = this.coordinate_y + 1;

                        this.pressed_key = "Down";
                    }
                    else if ( this.coordinate_y > this.selected_fruit[ 1 ] && this.pressed_key !== "Down" && up_block === false )
                    {
                        this.coordinate_y = this.coordinate_y - 1;

                        this.pressed_key = "Up";
                    }

                    else if ( this.coordinate_x > this.selected_fruit[ 0 ] && this.pressed_key !== "Right" && left_block === false )
                    {
                        this.coordinate_x = this.coordinate_x - 1;

                        this.pressed_key = "Left";
                    }
                    else if ( this.coordinate_x < this.selected_fruit[ 0 ] && this.pressed_key !== "Left" && right_block === false )
                    {
                        this.coordinate_x = this.coordinate_x + 1;

                        this.pressed_key = "Right";
                    }

                    else
                    {
                        this.snakeEscape(down_block, up_block, left_block, right_block);
                    }
                    this.snakeCurrentLocation();
                    this.input_set = true;
                }
            }, this.snake_speed);
        },

        snakeEscape: function (down, up, left, right)
        {
            if ( down === false )
            {
                this.coordinate_y = this.coordinate_y + 1;
            }
            else if ( up === false )
            {
                this.coordinate_y = this.coordinate_y - 1;
            }
            else if ( left === false )
            {
                this.coordinate_x = this.coordinate_x - 1;
            }
            else if ( right === false )
            {
                this.coordinate_x = this.coordinate_x + 1;
            }
        },

        moveSnake: function ()
        {
            setInterval(() =>
            {
                if ( this.pressed_key === "Down" )
                {
                    this.coordinate_y = this.coordinate_y + 1;

                    this.snakeCurrentLocation();
                }
                if ( this.pressed_key === "Up" )
                {
                    this.coordinate_y = this.coordinate_y - 1;

                    this.snakeCurrentLocation();
                }
                if ( this.pressed_key === "Left" )
                {
                    this.coordinate_x = this.coordinate_x - 1;

                    this.snakeCurrentLocation();
                }
                if ( this.pressed_key === "Right" )
                {
                    this.coordinate_x = this.coordinate_x + 1;

                    this.snakeCurrentLocation();
                }
            }, this.snake_speed);
        }
    },
    computed: {},
    mounted()
    {
        setEvent: {

            window.addEventListener("keydown", e =>
            {
                if ( !this.input_set )
                {
                    switch ( e.keyCode )
                    {
                        case 37:
                            if ( this.pressed_key === "Right" || this.dead_snake === true ) return false;
                            this.pressed_key = "Left";
                            break;
                        case 38:
                            if ( this.pressed_key === "Down" || this.dead_snake === true ) return false;
                            this.pressed_key = "Up";
                            break;
                        case 39:
                            if ( this.pressed_key === "Left" || this.dead_snake === true ) return false;
                            this.pressed_key = "Right";
                            break;
                        case 40:
                            if ( this.pressed_key === "Up" || this.dead_snake === true ) return false;
                            this.pressed_key = "Down";
                            break;
                    }
                    this.input_set = true;
                }
            });
        }
        this.snakeStartLocation();

        this.fruit_spawner();

        this.snakeCurrentLocation();

        // this.moveSnake();

        this.moveSnakeAI();
    }
};