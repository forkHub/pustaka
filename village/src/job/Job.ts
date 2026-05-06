import { store } from "../Data.js";
import { JobData, jobStateTypeConst } from "./JobData.js";

export class Job extends JobData {
	
	constructor() {
		super();
		// ID is now assigned by JobFactory
	}

	cancel(): void {
		this.state = jobStateTypeConst.FINISH;
	}

	isFinished(): boolean {
		return this.state === jobStateTypeConst.FINISH;
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
		// Produce resources
		this.produce.forEach((item) => {
			let res = store.getResourceByType(item.resType)
			res.amount.value += item.amount.value;
		});

		this.state = jobStateTypeConst.COOL_DOWN;
		this.coolDownCtr = this.COOL_DOWN_MAX;
	}

	private tryStart(): void {
		let canStart = true;

		// Check if we have required resources
		this.requiredResource.forEach((item) => {
			if (store.getResourceByType(item.resType).amount < item.amount) {
				canStart = false;
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
