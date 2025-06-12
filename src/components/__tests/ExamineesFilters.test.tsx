import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import type { FilterState } from "../ExamineesFilters";
import type { Examinee, RecursiveValue } from "../../types/assessment";
import ExamineesFilters from "../ExamineesFilters";
import userEvent from "@testing-library/user-event";

describe("ExamineesFilters Component", () => {
  const mockFilters: FilterState = {
    area: "",
    group: [],
    examinee: "",
    status: "",
  };

  const mockExaminees: Examinee[] = [
    {
        id: 1, username: "User1", area: "Area1", status: "Student Submission",
        assessmentId: "",
        fullName: "",
        loginTime: "",
        startTime: "",
        groupId: "2",
        questionsSynced: 0,
        timeElapsed: ""
    },
    {
        id: 2, username: "User2", area: "Area2", status: "Absent",
        assessmentId: "",
        fullName: "",
        loginTime: "",
        startTime: "",
        groupId: "1",
        questionsSynced: 0,
        timeElapsed: ""
    },
  ];

  const mockGroups: RecursiveValue[] = [
    { id: "1", label: "Group1", children: [] },
    { id: "2", label: "Group2", children: [] },
  ];

  const mockOnChange = jest.fn();
  const mockClearFilters = jest.fn();

  const setup = () =>
    render(
      <ExamineesFilters
        filters={mockFilters}
        onChange={mockOnChange}
        examinees={mockExaminees}
        groups={mockGroups}
        clearFilters={mockClearFilters}
      />
    );

  it("renders all filter dropdowns and reset button", () => {
    setup();

    expect(screen.getByLabelText("Select Area")).toBeInTheDocument();
    expect(screen.getByLabelText("Select Group")).toBeInTheDocument();
    expect(screen.getByTestId("examinee-search")).toBeInTheDocument();
    expect(screen.getByLabelText("Select Status")).toBeInTheDocument();
    expect(screen.getByLabelText("Reset Filters")).toBeInTheDocument();
  });

  it("displays groups in the group dropdown", () => {
    setup();
    fireEvent.mouseDown(screen.getByLabelText("Select Area"));
    waitFor(() => {
      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(3);
      expect(options[1]).toHaveTextContent("Area1");
      expect(options[2]).toHaveTextContent("Area2");
      const option = screen.getByText("Area1");
      fireEvent.click(option);
      expect(mockOnChange).toHaveBeenCalledWith({ ...mockFilters, area: "Area1" });
    });
  });

  it("displays unique statuses in the status dropdown", () => {
    setup();
    fireEvent.mouseDown(screen.getByLabelText("Select Status"));
    waitFor(() => {
      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(3);
      expect(options[1]).toHaveTextContent("Student Submission");
      expect(options[2]).toHaveTextContent("Absent");
    });
  });

  it("calls onChange when examinee is searched", () => {
    setup();
    const select = screen.getByTestId("examinee-search");
    userEvent.click(select);
    waitFor(async () => {
        const option = await screen.findByText("User1");
        userEvent.click(option);
        expect(mockOnChange).toHaveBeenCalledWith({ ...mockFilters, examinee: "User1" });
    });
  });

  it("calls clearFilters when reset button is clicked", () => {
    setup();
    fireEvent.click(screen.getByLabelText("Reset Filters"));
    expect(mockClearFilters).toHaveBeenCalled();
  });

  it("simulates error when Error Test button is clicked", () => {
    setup();
    const errorButton = screen.getByLabelText("Simulate error for testing");
    expect(() => fireEvent.click(errorButton)).toThrow("This is a simulated error for testing ErrorBoundary.");
  });
});