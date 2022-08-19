# Cast Party reminders Twitter bot

Hello! After making my first Twitter bot about *Cast Party: a Dungeons & Dragons podcast* (which you can find [here](https://github.com/chloeadriancreates/cast-party-quotes-twitter-bot)), my friend [Lexie](https://twitter.com/smileyavocado1) asked if I wanted to help make another bot that tweets a random positive reminder from the characters every six hours – and I said yes (obviously)! The account is [@cp_reminders](https://twitter.com/cp_reminders), if you want to give it a look! Lexie writes the reminders, and I keep the tech side running. I really recommend the show, it is one of the most heartfelt and funniest podcasts I know. 

## Now, for the tech stack! 
This bot was made using Javascript, the twitter-api-v2 package, Firebase and Heroku. 

### Firebase
I used a Realtime Database, because I only needed a small place to store a list of reminders, as well as a counter (you'll see why in the next part), and a type id. The reminders are divided by tweeted and not_tweeted, and further by category (food, water, meds...), and that's where the type id comes into play: the bot increments the type id after tweeting and resets it to 0 once at the last category, so it tweets an even spread of reminders from each category!

### Heroku
Like for my previous bot, Heroku Scheduler starts the program every hour, and I added a counter that increments every hour, so it only tweets every six hours!

I had a lot of fun making another one of these! (Shhh, don't tell anyone, but I may have another bot in the works already – and this one's not Cast Party-related!)

Thanks for reading! I hope you have a great day.
Chloé x