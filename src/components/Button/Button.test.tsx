import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  test("should render different button hierarchies", () => {
    render(<Button hierarchy="primary">primary</Button>);
    render(<Button hierarchy="secondary">secondary</Button>);
    render(<Button hierarchy="secondary color">secondary color</Button>);
    render(<Button hierarchy="tertiary">tertiary</Button>);
    render(<Button hierarchy="tertiary color">tertiary color</Button>);

    expect(screen.getByText("primary").className).toContain(
      "border-primary-600 bg-primary-600",
    );
    expect(screen.getByText("secondary").className).toContain(
      "text-gray-700 border-gray-300",
    );
    expect(screen.getByText("secondary color").className).toContain(
      "text-primary-700 border-primary-50 bg-primary-50",
    );
    expect(screen.getByText("tertiary").className).toContain("text-gray-500");
    expect(screen.getByText("tertiary color").className).toContain(
      "text-primary-700",
    );
  });

  test("should render an icon only button", () => {
    render(<Button icon="only" />);

    expect(screen.getByRole("button").className).not.toContain("px-4");
    expect(screen.getByRole("button").className).toContain("h-10");
  });

  test("should render different button sizes", () => {
    render(<Button size="sm">sm</Button>);
    render(<Button size="md">md</Button>);
    render(<Button size="lg">lg</Button>);
    render(<Button size="xl">xl</Button>);
    render(<Button size="2xl">2xl</Button>);

    expect(screen.getByText("sm").className).toContain("h-9");
    expect(screen.getByText("md").className).toContain("h-10");
    expect(screen.getByText("lg").className).toContain("h-11");
    expect(screen.getByText("xl").className).toContain("h-12");
    expect(screen.getByText("2xl").className).toContain("h-14");
  });

  test("should prevent default click when the button is disabled", async () => {
    const onClick = jest.fn();

    render(
      <Button disabled onClick={onClick}>
        Button
      </Button>,
    );

    await userEvent.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        defaultPrevented: true,
      }),
    );
  });

  test("should prevent default click when the button is aria-disabled", async () => {
    const onClick = jest.fn();

    render(
      <Button aria-disabled="true" onClick={onClick}>
        Button
      </Button>,
    );

    await userEvent.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        defaultPrevented: true,
      }),
    );
  });
});
