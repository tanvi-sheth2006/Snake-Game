from turtle import Screen
from snake  import Snake
from food import Food
from scoreboard import Scoreboard
import time

screen = Screen()
screen.setup(width=600,height=600)
screen.bgcolor("black")
screen.title("Snake Game")
screen.tracer(0) #turns off the animation / turn off auto-refresh

snake = Snake()
food = Food()
scoreboard = Scoreboard() 

screen.listen()
screen.onkey(snake.up,"Up")
screen.onkey(snake.down,"Down")
screen.onkey(snake.left,"Left")
screen.onkey(snake.right,"Right")

game_is_on = True
while game_is_on:
    screen.update()
    time.sleep(0.1) 
    snake.move()

    if snake.head.distance(food) <  15:
        food.refresh()
        snake.extend()
        scoreboard.increase_score()


    if snake.head.xcor() > 280 or snake.head.xcor() < -280 or snake.head.ycor() > 280 or snake.head.ycor() < -280:
        game_is_on = False
        scoreboard.goto(0,0)
        scoreboard.write("GAME OVER", align="center", font=("Arial", 24, "normal"))

    for segment in snake.segments:
        if snake.head.distance(segment) < 10 and segment != snake.head:
            game_is_on = False
            scoreboard.game_over()

            
screen.exitonclick()