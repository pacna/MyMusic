// Third party
import { render, screen } from "@testing-library/react";

// Self
import { MusicTabs } from "./music-tabs";

describe("MusicTabs", () => {
    it("should get all tabs", () => {
        // ARRANGE/ACT
        const spyUseRouter: jest.SpyInstance<any, unknown[]> = jest.spyOn(
            require("next/router"),
            "useRouter"
        );
        spyUseRouter.mockImplementation(() => ({
            pathname: "/songs",
        }));
        render(<MusicTabs />);
        const tabs: HTMLElement[] = screen.queryAllByRole("tab");

        // ASSERT
        expect(tabs).not.toBe(null);
        expect(tabs.length).toBe(2);
        expect(tabs[0].innerHTML).toContain("Songs");
        expect(tabs[1].innerHTML).toContain("Artists");
    });
});
