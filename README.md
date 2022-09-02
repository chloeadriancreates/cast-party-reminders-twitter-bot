# Cast Party reminders Twitter bot - V2

Hello! After making my first Twitter bot about *Cast Party: a Dungeons & Dragons podcast* (which you can find [here](https://github.com/chloeadriancreates/cast-party-quotes-twitter-bot)), my friend [Lexie](https://twitter.com/smileyavocado1) asked if I wanted to help make another bot that tweets a random positive reminder from the characters every six hours – and I said yes (obviously)! The account is [@cp_reminders](https://twitter.com/cp_reminders), if you want to give it a look! Lexie writes the reminders, and I keep the tech side running. I really recommend the show, it is one of the most heartfelt and funniest podcasts I know. 

## Now, for the tech stack! 
This version of the bot was made using Javascript, the twitter-api-v2 and cron packages, and Firebase. 
You can find the previous version on the v1 branch – the core is the same, but I switched from using Heroku Scheduler to another hosting service and the cron package.

### Firebase
I used a Realtime Database, because I only needed a small place to store a list of reminders and a type id. The reminders are divided by tweeted and not_tweeted, and further by category (food, water, meds...), and that's where the type id comes into play: the bot increments the type id after tweeting and resets it to 0 once at the last category, so it tweets an even spread of reminders from each category! You can see the layout of the database in reminders.json.

### Cron
You may have noticed that the Cron job in index.js is commented – this is because my bots are all hosted on the same server, and I have a single file that runs all the Cron jobs there. However, for the sake of clarity, I decided to do separate Git repositories and add the extra code in comments.

I really love making these bots, and even though having to switch from Heroku (who are sadly cancelling their free plan from November onwards) was a bummer, I really think the code for this version is cleaner, and I'm ultimately very happy about it.

Thanks for reading, and happy coding! I hope you have a great day.
Chloé x