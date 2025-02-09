import { fireEvent, render, screen } from "test_utils";
import { PopconfirmWithCheckbox } from ".";

const noop = () => {};
const btn = <button type="button">btn</button>;
const checkboxLabel = "a cool checkbox label";
const title = "cool title";

describe("popconfirmWithCheckbox", () => {
  it("passing in the checkboxLabel prop should display a confirmation checkbox and checkbox label", () => {
    render(
      <PopconfirmWithCheckbox
        title={title}
        checkboxLabel={checkboxLabel}
        onConfirm={noop}
      >
        {btn}
      </PopconfirmWithCheckbox>
    );
    expect(screen.queryByText(checkboxLabel)).not.toBeInTheDocument();
    fireEvent.click(screen.queryByText("btn"));
    expect(screen.getByText(checkboxLabel)).toBeInTheDocument();
    expect(screen.getByDataCy("popconfirm-checkbox")).toBeInTheDocument();
  });

  it("passing in an empty checkboxLabel prop should not render confirmation checkbox and checkbox label", () => {
    render(
      <PopconfirmWithCheckbox title={title} checkboxLabel="" onConfirm={noop}>
        {btn}
      </PopconfirmWithCheckbox>
    );
    fireEvent.click(screen.queryByText("btn"));
    expect(screen.queryByText(checkboxLabel)).not.toBeInTheDocument();
    expect(screen.queryByDataCy("popconfirm-checkbox")).not.toBeInTheDocument();
  });

  it("not providing a checkboxLabel prop should not render confirmation checkbox and checkbox label", () => {
    render(
      <PopconfirmWithCheckbox title={title} onConfirm={noop}>
        {btn}
      </PopconfirmWithCheckbox>
    );
    fireEvent.click(screen.queryByText("btn"));
    expect(screen.queryByText(checkboxLabel)).not.toBeInTheDocument();
    expect(screen.queryByDataCy("popconfirm-checkbox")).not.toBeInTheDocument();
  });

  it("ok button is enabled on initial render when no checkbox label is provided", async () => {
    const mockCb = jest.fn();
    render(
      <PopconfirmWithCheckbox title={title} onConfirm={mockCb}>
        {btn}
      </PopconfirmWithCheckbox>
    );
    fireEvent.click(screen.queryByText("btn"));
    await screen.findByText("Yes");
    fireEvent.click(screen.queryByText("Yes"));
    expect(mockCb).toHaveBeenCalledTimes(1);
  });

  it("ok button is disabled on initial render when a checkbox label is provided", async () => {
    const mockCb = jest.fn();
    render(
      <PopconfirmWithCheckbox
        checkboxLabel={checkboxLabel}
        title={title}
        onConfirm={mockCb}
      >
        {btn}
      </PopconfirmWithCheckbox>
    );
    fireEvent.click(screen.queryByText("btn"));
    await screen.findByText("Yes");
    fireEvent.click(screen.queryByText("Yes"));
    expect(mockCb).toHaveBeenCalledTimes(0);
  });

  it("ok button is enabled after checking the checkbox", async () => {
    const mockCb = jest.fn();
    render(
      <PopconfirmWithCheckbox
        checkboxLabel={checkboxLabel}
        title={title}
        onConfirm={mockCb}
      >
        {btn}
      </PopconfirmWithCheckbox>
    );
    fireEvent.click(screen.queryByText("btn"));
    await screen.findByText("Yes");

    // attempt before checking
    fireEvent.click(screen.queryByText("Yes"));
    expect(mockCb).toHaveBeenCalledTimes(0);

    fireEvent.click(screen.queryByDataCy("popconfirm-checkbox"));

    // attempt after checking
    fireEvent.click(screen.queryByText("Yes"));
    expect(mockCb).toHaveBeenCalledTimes(1);
  });
});
