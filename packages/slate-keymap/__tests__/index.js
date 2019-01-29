import KeyMap from "../src";
import { keyDown } from "../../../shared/slate-test/keyboard-events";

describe("KeyMap", () => {
  it("should call a function when the key is pressed", () => {
    const enterFn = jest.fn();
    const keyMap = KeyMap({ enter: enterFn });

    keyMap.onKeyDown(keyDown({ key: "Enter" }), {}, jest.fn());

    expect(enterFn).toHaveBeenCalled();
  });

  it("should handle modifiers", () => {
    const shiftEnterFn = jest.fn();
    const keyMap = KeyMap({ "shift+enter": shiftEnterFn });

    keyMap.onKeyDown(keyDown({ key: "Enter", shiftKey: true }), {}, jest.fn());

    expect(shiftEnterFn).toHaveBeenCalled();
  });

  it("should call `next()` if unhandled", () => {
    const next = jest.fn();
    const keyMap = KeyMap({});

    keyMap.onKeyDown(keyDown({ key: "Enter" }), {}, next);

    expect(next).toHaveBeenCalled();
  });

  it("should call the function if `options.if` returns true", () => {
    const enterFn = jest.fn();
    const keyMap = KeyMap({ enter: enterFn }, { if: () => true });

    keyMap.onKeyDown(keyDown({ key: "Enter" }), {}, jest.fn());
    expect(enterFn).toHaveBeenCalled();
  });

  it("should not call the function if `options.if` returns false", () => {
    const enterFn = jest.fn();
    const keyMap = KeyMap({ enter: enterFn }, { if: () => false });

    keyMap.onKeyDown(keyDown({ key: "Enter" }), {}, jest.fn());
    expect(enterFn).not.toHaveBeenCalled();
  });
});
