export default {
    props: {},
    data()
    {
        return {
            pressed_key: "Down",
            arena_width: 20,
            value: null,
            coordinate_x: null,
            coordinate_y: null,
            snake_head_location: null,
            snake_skin: false,
            snake_length: 2,
            snake_history: [],
            dead_snake: false,
            fruit_amount: 2,
            current_fruit: null,
            snake_speed: 100

        };
    },
    methods: {
        snakeStartLocation: function ()
        {
            this.coordinate_x = Math.ceil(this.arena_width / 2);

            this.coordinate_y = Math.ceil(this.arena_width / 2);
        },

        snakeCurrentLocation: function ()
        {
            this.snakeOutOfBounds();

            //snake head
            this.snake_head_location = this.coordinate_x + "." + this.coordinate_y;

            var snakeCurrently = document.getElementById(this.snake_head_location);

            //snake no head losestate
            if ( snakeCurrently.classList.contains("snake_skin") )
            {
                this.pressed_key = "snak heaven";

                this.dead_snake = true;
            }

            //snake eating
            if ( snakeCurrently.classList.contains("snake_fruit") )
            {
                this.snake_length++;

                this.current_fruit--;

                this.fruit_spawner();

                snakeCurrently.classList.remove("snake_fruit");
            }

            //snake travel history
            this.snakeHistory();

            //snake tail
            var snake_tail = this.snake_history.slice(this.snake_history.length - this.snake_length - 1, this.snake_history.length);

            var snakeTailCurrently = document.getElementById(snake_tail[ 0 ]);

            snakeCurrently.classList.add("snake_skin");

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
                if ( !(fruit_location.classList.contains("snake_skin")) )
                {
                    fruit_location.classList.add("snake_fruit");

                    this.current_fruit++;
                }
                this.fruit_spawner();
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
                switch ( e.keyCode )
                {
                    case 37:
                        if ( this.pressed_key === "Right" || this.dead_snake === true) return false;
                        this.pressed_key = "Left";
                        break;
                    case 38:
                        if ( this.pressed_key === "Down" || this.dead_snake === true) return false;
                        this.pressed_key = "Up";
                        break;
                    case 39:
                        if ( this.pressed_key === "Left" || this.dead_snake === true) return false;
                        this.pressed_key = "Right";
                        break;
                    case 40:
                        if ( this.pressed_key === "Up" || this.dead_snake === true) return false;
                        this.pressed_key = "Down";
                        break;
                }
            });
        }
        this.snakeStartLocation();

        this.snakeCurrentLocation();

        this.moveSnake();

        this.fruit_spawner();
    }
};