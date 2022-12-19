// Third party
import { render, screen } from "@testing-library/react";

// Self
import { LoadingContent } from "./loading-content";

describe("LoadingContent", () => {
    it("should load content", () => {
        // ARRANGE/ACT
        render(<LoadingContent isReady={true} children={<div>Success</div>} />);
        const content: HTMLElement = screen.getByText("Success");

        // ASSERT
        expect(content).not.toBe(null);
        expect(content.innerHTML).toBe("Success");
    });

    it("should load loading state", () => {
        // ARRANGE/ACT
        render(<LoadingContent isReady={false} children={null} />);
        const content: HTMLElement = screen.getByRole("progressbar");

        // ASSSERT
        expect(content).not.toBe(null);
    });
});
