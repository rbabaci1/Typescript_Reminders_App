import { useEffect, useState } from "react";
import ReminderList from "./components/ReminderList";
import Reminder from "./models/reminder";
import reminderService from "./services/reminder";
import NewReminder from "./components/NewReminder";
import "./App.css";

function App() {
	const [reminders, setReminders] = useState<Reminder[]>([]);

	const fetchReminders = async () => {
		const reminders = await reminderService.getRemindes();

		setReminders(reminders);
	};

	useEffect(() => {
		fetchReminders();
	}, []);

	const removeReminder = (id: number) => {
		setReminders(reminders.filter((reminder) => reminder.id !== id));
	};

	const addReminder = async (title: string) => {
		const newReminder = await reminderService.addReminder(title);
		setReminders([newReminder, ...reminders]);
	};

	return (
		<div className="App">
			<NewReminder onAddReminder={addReminder} />
			<ReminderList items={reminders} onRemoveReminder={removeReminder} />
		</div>
	);
}

export default App;
