import { type SticksData } from '$lib/components/Sticks.svelte';
import { writable } from 'svelte/store';

export type 筮法 = '大衍筮法（经典）'; // to be continued

function initSticks(method: 筮法 = '大衍筮法（经典）'): SticksData {
	const sticks: SticksData = {
		left: [[]],
		right: [[]],
		hanging: [[]],
		removed: [[]],
		none: [[]]
	};
	switch (method) {
		case '大衍筮法（经典）':
			sticks.hanging[0].push({ id: 0 });
			for (let i = 1; i <= 49; i++) {
				sticks.none[0].push({ id: i });
			}
			break;
	}
	return sticks;
}

export function 开始卜筮() {
	const count爻 = writable<0 | 1 | 2 | 3 | 4 | 5>(0);
	const count变 = writable<0 | 1 | 2>(0);
	const currentStep = writable<'分二' | '挂一' | '揲四' | '归奇' | '进行下一变'>('分二');
	const sticks = writable<SticksData>(initSticks());
	const 卦 = writable<number[]>([]);

	let timeout: NodeJS.Timeout;

	function reset() {
		clearTimeout(timeout);
		count爻.set(0);
		count变.set(0);
		currentStep.set('分二');
		sticks.set(initSticks());
		卦.set([]);
	}

	function nextStep(id: number) {
		currentStep.update((step) => {
			switch (step) {
				case '分二':
					sticks.update((sticks) => {
						// find the selected stick
						const index = sticks.none[0].findIndex((stick) => stick.id === id);
						sticks.left[0] = sticks.none[0].splice(0, index);
						sticks.right[0] = sticks.none[0];
						sticks.none[0] = [];
						return sticks;
					});
					return '挂一';
				case '挂一':
					sticks.update((sticks) => {
						// find the selected stick and move it out
						let selectedStick;
						// left
						const index = sticks.left[0].findIndex((stick) => stick.id === id);
						if (index !== -1) {
							selectedStick = sticks.left[0].splice(index, 1)[0];
						} else {
							// right
							const index = sticks.right[0].findIndex((stick) => stick.id === id);
							if (index !== -1) {
								selectedStick = sticks.right[0].splice(index, 1)[0];
							} else {
								return sticks; // should not happen
							}
						}
						sticks.hanging[1] = [selectedStick];
						// automatically trigger next step after 1000ms
						timeout = setTimeout(() => {
							nextStep(-1);
						}, 1000);
						return sticks;
					});
					return '揲四';
				case '揲四':
					// this step should be triggered by program, not by user.
					// if the id is not -1, it means the user is triggering this step.
					// so we should ignore it.
					if (id !== -1) {
						return '揲四';
					}
					sticks.update((sticks) => {
						// split left sticks into groups of 4
						const left = sticks.left[0];
						const leftGroups = [];
						while (left.length > 0) {
							leftGroups.push(left.splice(0, 4));
						}
						sticks.left = leftGroups;
						// split right sticks into groups of 4
						const right = sticks.right[0];
						const rightGroups = [];
						while (right.length > 0) {
							rightGroups.push(right.splice(0, 4));
						}
						sticks.right = rightGroups;
						return sticks;
					});
					// automatically trigger next step after 1000ms
					timeout = setTimeout(() => {
						nextStep(-1);
					}, 1000);
					return '归奇';
				case '归奇':
					// this step should be triggered by program, not by user.
					// if the id is not -1, it means the user is triggering this step.
					// so we should ignore it.
					if (id !== -1) {
						return '归奇';
					}
					sticks.update((sticks) => {
						// move the last sticks from hanging to removed
						sticks.removed[0].push(...sticks.hanging.pop() || []);
						// move the last groups from left and right to removed
						sticks.removed[0].push(...(sticks.left.pop() || []));
						sticks.removed[0].push(...(sticks.right.pop() || []));
						return sticks;
					});
					// record result if it's the last 变
					count变.update((count) => {
						if (count === 2) {
							sticks.update((sticks) => {
								卦.update((卦) => {
									// calculate the result by counting the number of subgroups in left and right
									卦.push(sticks.left.length + sticks.right.length);
									return 卦;
								});
								return sticks;
							});
						}
						return count;
					});
					return '进行下一变';
				case '进行下一变':
					step = '分二';
					count变.update((count变Value) => {
						count爻.update((count爻Value) => {
							if (count变Value < 2) {
								// move all left and right sticks to none
								sticks.update((sticks) => {
									sticks.none[0] = sticks.left.flat().concat(sticks.right.flat());
									sticks.left = [[]];
									sticks.right = [[]];
									return sticks;
								});
								count变Value++;
							} else {
								if (count爻Value < 5) {
									count爻Value++;
									// reset sticks
									sticks.set(initSticks());
									count变Value = 0;
								} else {
									// the end
									// do nothing until user resets
									step = '进行下一变';
								}
							}
							return count爻Value;
						});
						return count变Value;
					});
					return step;
			}
		});
	}

	return {
		count爻: {
			subscribe: count爻.subscribe
		},
		count变: {
			subscribe: count变.subscribe
		},
		currentStep: {
			subscribe: currentStep.subscribe
		},
		sticks: {
			subscribe: sticks.subscribe
		},
		卦: {
			subscribe: 卦.subscribe
		},
		nextStep,
		reset
	};
}
