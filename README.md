# Coding Quiz

## Introduction:

This quiz was formed by creating HTML, CSS and Javascript files to provide the user with a series of questions and rank their performance against other users. The provided user story and acceptance criteria were considered while creating the website.  

The Coding Quiz can be accessed with the following link: https://shash833.github.io/Coding-Quiz/

## Acceptance Criteria:
```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
```
As shown below, the quiz begins with an introduction page explaining details of the quiz to the user. The "Start Quiz" button will start the timer and reveal a series of questions. 

The navigation bar (which remains visible throughout the quiz and score pages) includes the timer and an option to access the history of highscores.
```
![introduction-image](/Assets/README-images/introduction.PNG)
```
------
```
WHEN I answer a question
THEN I am presented with another question
```
The user will have to answer each question to move onto the next question. The result will be revealed (as shown below) after the answer is selected before moving to the next question. 

```
![CorrectAnswer-image](/Assets/README-images/question-correct.PNG)
```
----
```
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
```
If the user answers selects an incorrect answer, 10 seconds will be deducted from the timer.
```
![IncorrectAnswer-image](/Assets/README-images/question-incorrect.PNG)
```
----
```
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score
```
If all questions are answered or the timer reaches 0, a score page which includes the user's result and a form to provide their intials will be revealed as shown below. 
```
![ScorePage-image](/Assets/README-images/Quiz-score.PNG)
```
After the user enters their details, they can view their rank against others who have compleeted the quiz on the highscore page:

```
![HighscorePage-image](/Assets/README-images/highscore.PNG)
```