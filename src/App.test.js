import App from "./App";

import { configure, shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new EnzymeAdapter() });

let wrapper;

const setup = () => shallow(<App />);

const findByTestAttr = (wrapper, value) =>
	wrapper.find(`[data-test='${value}']`);

test("renders without errors", () => {
  wrapper = setup();
	const appComponent = findByTestAttr(wrapper, "component-app");
	expect(appComponent.length).toBe(1);
});



describe("Increment", () => {
	test("renders increment button", () => {
		wrapper = setup();
		const button = findByTestAttr(wrapper, "increment-button");
		expect(button.length).toBe(1);
	});

	test("shows counter display", () => {
		wrapper = setup();
		const counterDisplay = findByTestAttr(wrapper, "counter-display");
		expect(counterDisplay.length).toBe(1);
	});

	test("counter display starts at 0", () => {
		wrapper = setup();
		const count = findByTestAttr(wrapper, "count").text();
		expect(count).toBe("0");
	});

	test("button click increments counter display", () => {
		const wrapper = setup();
		const button = findByTestAttr(wrapper, "increment-button");
		button.simulate("click");
		const count = findByTestAttr(wrapper, "count").text();
		expect(count).toBe("1");
	});
});

describe("Decrement", () => {
	test("renders decrement button", () => {
		const wrapper = setup();
		const button = findByTestAttr(wrapper, "decrement-button");
		expect(button.length).toBe(1);
	});

	test("clicking decrement button decreases counter if state greater than 0", () => {
		const wrapper = setup();
		const button = findByTestAttr(wrapper, "decrement-button");
		button.simulate("click");

		const count = findByTestAttr(wrapper, "count").text();
		expect(count).toBe("0");
	});
});

describe("error when counter goes below zero", () => {
	test("error not shown when not needed", () => {
		const wrapper = setup();
		const errorDiv = findByTestAttr(wrapper, "error-message");

		const errorHasHiddenClass = errorDiv.hasClass("hidden");
		expect(errorHasHiddenClass).toBe(true);
	});

	describe("counter is 0 and decrement is clicked", () => {
		let wrapper;
		beforeEach(() => {
			wrapper = setup();

			const button = findByTestAttr(wrapper, "decrement-button");
			button.simulate("click");
		});
		test("error shows", () => {
			const errorDiv = findByTestAttr(wrapper, "error-message");
			const errorHasHiddenClass = errorDiv.hasClass("hidden");
			expect(errorHasHiddenClass).toBe(false);
		});
		test("counter still displays zeero", () => {
			const count = findByTestAttr(wrapper, "count").text();
			expect(count).toBe("0");
		});
		test("clicking increment clears the error", () => {

			const incButton = findByTestAttr(wrapper, "increment-button");
			incButton.simulate("click");

			const errorDiv = findByTestAttr(wrapper, "error-message");
			const errorHasHiddenClass = errorDiv.hasClass("hidden");
			expect(errorHasHiddenClass).toBe(true);
		});
	});
});