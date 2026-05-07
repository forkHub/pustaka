import { storage, store } from "../Data.js";
import { JobData, jobStateTypeConst } from "./JobData.js";

export class Job extends JobData {
	
	constructor() {
		super();
		// ID is now assigned by JobFactory
	}

	cancel(): void {
		this.state = jobStateTypeConst.FINISH;
	}

	tick(): void {
		if (this.state === jobStateTypeConst.START) {
			this.tryStart();
		}
		else if (this.state === jobStateTypeConst.PROGRESS) {
			this.tickProgress();
		}
		else if (this.state === jobStateTypeConst.COOL_DOWN) {
			this.coolDownCtr--;
			if (this.coolDownCtr <= 0) {
				this.state = jobStateTypeConst.FINISH;
			}
		}
		else if (this.state === jobStateTypeConst.FINISH) {
			this.state = jobStateTypeConst.START;
		}
		else {
			throw Error('invalid state');
		}
	}

	finish() {
		this.produce.forEach((item) => {
			let res = store.getResourceByType(item.resType)
			res.amount.value += item.amount.value;
		});

		this.state = jobStateTypeConst.COOL_DOWN;
		this.coolDownCtr = this.COOL_DOWN_MAX;
		storage.save();
	}

	private tryStart(): void {
		let canStart = true;

		// Check if we have required resources
		this.requiredResource.forEach((item) => {
			let res = store.getResourceByType(item.resType); 
			if (res.amount.value < item.amount.value) {
				canStart = false;
				// console.log("cannot start job " + this._type)
				// console.log("not enough resource: " + item.resType + "/amount: " + item.amount.value)
				// console.log("required " + "/required: " + res.amount.value);
			}
		});

		if (canStart) {
			// Consume required resources
			this.requiredResource.forEach((item) => {
				store.getResourceByType(item.resType).amount.value -= item.amount.value;
			});
			this.state = jobStateTypeConst.PROGRESS;
			this.counter = this._counterMax;
		}
		else {
		}
	}

	private tickProgress(): void {
		if (this.counter > 0) {
			this.counter--;
		}
		else {
			this.finish();
		}
	}

	remove(): void {
		this.requiredResource = [];
		this.produce = [];
	}
}
