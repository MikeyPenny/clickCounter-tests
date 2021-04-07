import App from "./App";

import Enzyme, { configure, shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new EnzymeAdapter() });


test("renders without errors", () => {
  const wrapper = shallow(<App />);
  const appComponent = wrapper.find("[data-test='component-app']");
  expect(appComponent.length).toBe(1);
});

test("renders increment button", () => {

});

test("shows counter display", () => {

});

test("counter display starts at 0", () => {

});

test("button click increments counter display", () => {

});