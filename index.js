import { rwClient } from './twitterClient.js';
import { firebaseConfig } from './config.js';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, update } from "firebase/database";
import { CronJob } from 'cron';

const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());

async function getTypes() {
    const response = await get(child(dbRef, 'reminders/tweets/not_tweeted'));
    const typesObject = await response.val();
    const types = Object.keys(typesObject);
    return types;
}

async function getRemindersFromType(type) {
    const responseNotTweeted = await get(child(dbRef, `reminders/tweets/not_tweeted/${type}`));
    const notTweeted = await responseNotTweeted.val();
    const responseTweeted = await get(child(dbRef, `reminders/tweets/tweeted/${type}`));
    const tweeted = await responseTweeted.val();
    const reminders = {
        notTweeted: notTweeted,
        tweeted: tweeted
    }
    return reminders;
}

async function tweet(reminders, type) {
    const { notTweeted, tweeted } = reminders;
    const random = Math.floor(Math.random() * notTweeted.length);
    try {
        await rwClient.v2.tweet(notTweeted[random]);
        const updates = {};
        updates[`reminders/tweets/tweeted/${type}`] = [...tweeted, notTweeted[random]];
        notTweeted.splice(random, 1)
        updates[`reminders/tweets/not_tweeted/${type}`] = notTweeted;
        update(dbRef, updates);
    } catch(e) {
        console.error(e);
    }
}

function updateTypeID(typeID) {
    const updates = {};
    updates['reminders/id_type'] = typeID;
    update(dbRef, updates);
}

export async function startReminders() {
    const types = await getTypes();
    const responseTypeID = await get(child(dbRef, 'reminders/id_type'));
    const typeID = await responseTypeID.val();
    const type = types[typeID];
    const reminders = await getRemindersFromType(type);
    tweet(reminders, type);
    let newTypeID;
    if(typeID >= types.length - 1) {
        newTypeID = 0;
    } else {
        newTypeID = typeID + 1;
    }
    updateTypeID(newTypeID);
}

const job = new CronJob(
	'0 */6 * * *',
	function() {
		startReminders();
	},
	null,
	true,
	'America/Los_Angeles'
);
