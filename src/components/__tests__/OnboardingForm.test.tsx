import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OnboardingForm } from "@/components";
import { checkCorporationNumber, submitProfileDetails } from "@/api";
import { renderWithProviders } from "@/test-utils";

jest.mock("@/api", () => ({
  checkCorporationNumber: jest.fn(),
  submitProfileDetails: jest.fn(),
}));

const checkCorp = jest.mocked(checkCorporationNumber);
const submitProfile = jest.mocked(submitProfileDetails);

describe("OnboardingForm", () => {
  beforeEach(() => {
    checkCorp.mockResolvedValue({
      valid: true,
      corporationNumber: "123456789",
    });
    submitProfile.mockResolvedValue(undefined);
  });

  it("shows required errors when submitted empty", async () => {
    const user = userEvent.setup();
    renderWithProviders(<OnboardingForm />);

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      await screen.findByText("First name is required"),
    ).toBeInTheDocument();
    expect(screen.getByText("Last name is required")).toBeInTheDocument();
    expect(screen.getByText("Phone number is required")).toBeInTheDocument();
    expect(
      screen.getByText("Corporation number is required"),
    ).toBeInTheDocument();
    expect(submitProfile).not.toHaveBeenCalled();
  });

  it("shows an error when the corporation number is invalid", async () => {
    checkCorp.mockRejectedValue(new Error("Invalid corporation number"));

    const user = userEvent.setup();
    renderWithProviders(<OnboardingForm />);

    await user.type(
      screen.getByRole("textbox", { name: "Corporation Number" }),
      "000000000",
    );
    expect(checkCorp).not.toHaveBeenCalled();

    await user.tab();

    expect(
      await screen.findByText("Invalid corporation number"),
    ).toBeInTheDocument();
    expect(checkCorp).toHaveBeenCalledTimes(1);
  });

  it("submits the profile and shows a success toast", async () => {
    const user = userEvent.setup();
    renderWithProviders(<OnboardingForm />);

    await user.type(
      screen.getByRole("textbox", { name: "First Name" }),
      "Jane",
    );
    await user.type(screen.getByRole("textbox", { name: "Last Name" }), "Doe");
    await user.type(
      screen.getByRole("textbox", { name: "Phone Number" }),
      "+14165550142",
    );
    await user.type(
      screen.getByRole("textbox", { name: "Corporation Number" }),
      "123456789",
    );
    await user.tab();

    await screen.findByLabelText("Corporation number is valid");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(await screen.findByText("Profile submitted")).toBeInTheDocument();
  });
});
