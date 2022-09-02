import { rwClient } from './twitterClient.js';
import { firebaseConfig } from './config.js';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, push, update } from "firebase/database";
import { CronJob } from 'cron';

const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());

async function getTypes() {
    const response = await get(child(dbRef, 'reminders/not_tweeted'));
    const typesObject = await response.val();
    const types = Object.keys(typesObject);
    return types;
}

async function getRemindersFromType(type) {
    const responseReminders = await get(child(dbRef, `reminders/not_tweeted/${type}`));
    const reminders = await responseReminders.val();
    return reminders;
}

async function tweet(reminders, type) {
    const random = Math.floor(Math.random() * reminders.length);
    const randomKey = Object.keys(reminders)[random];
    try {
        await rwClient.v2.tweet(reminders[randomKey]);
        const newKey = push(child(dbRef, `reminders/tweeted/${type}`)).key;
        const updates = {};
        updates[`reminders/tweeted/${type}/${newKey}`] = reminders[randomKey];
        updates[`reminders/not_tweeted/${type}/${randomKey}`] = null;
        update(dbRef, updates);
    } catch(e) {
        console.error(e);
    }
}

function updateTypeID(typeID) {
    const updates = {};
    updates['id_type'] = typeID;
    update(dbRef, updates);
}

async function startReminders() {
    const types = await getTypes();
    const responseTypeID = await get(child(dbRef, 'id_type'));
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
