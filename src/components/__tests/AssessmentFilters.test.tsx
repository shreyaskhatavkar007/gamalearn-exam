import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import type { Assessment } from "../../types/assessment";
import AssessmentFilters, { type FilterState } from "../AssessmentFilters";
import userEvent from '@testing-library/user-event';

describe("AssessmentFilters Component", () => {
  const mockFilters: FilterState = {
    area: "",
    program: "",
    course: "",
    status: "",
  };

  const mockAssessments: Assessment[] = [
    {
      id: "1", area: "Area1", program: "Program1", course: "Course1", status: "Available",
      name: "",
      startDate: "",
      endDate: ""
    },
    {
      id: "2", area: "Area2", program: "Program2", course: "Course2", status: "Not Available",
      name: "",
      startDate: "",
      endDate: ""
    },
  ];

  const mockOnChange = jest.fn();
  const mockClearFilters = jest.fn();

  const setup = () =>
    render(
      <AssessmentFilters
        filters={mockFilters}
        onChange={mockOnChange}
        assessments={mockAssessments}
        clearFilters={mockClearFilters}
      />
    );

  it("renders all filter dropdowns and reset button", () => {
    setup();

    expect(screen.getByLabelText("Select Area")).toBeInTheDocument();
    expect(screen.getByLabelText("Select Program")).toBeInTheDocument();
    expect(screen.getByLabelText("Select Course")).toBeInTheDocument();
    expect(screen.getByLabelText("Select Status")).toBeInTheDocument();
    expect(screen.getByText("Reset Filters")).toBeInTheDocument();
  });

  it("displays unique areas in the area dropdown", () => {
    setup();
    fireEvent.mouseDown(screen.getByLabelText("Select Area"));
    waitFor(() => {
      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(3);
      expect(options[1]).toHaveTextContent("Area1");
      expect(options[2]).toHaveTextContent("Area2");
    });
  });

  it("displays unique courses in the course dropdown", () => {
    setup();
    fireEvent.mouseDown(screen.getByLabelText("Select Course"));
    waitFor(() => {
      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(3);
      expect(options[1]).toHaveTextContent("Course1");
      expect(options[2]).toHaveTextContent("Course2");
    });
  });

  it("calls onChange when a filter is changed", async () => {
    setup();
    const select = screen.getByLabelText("Select Area");
    userEvent.click(select);
    waitFor(async () => {
      const option = await screen.findByText("Area1");
      userEvent.click(option);
      expect(mockOnChange).toHaveBeenCalledWith({ ...mockFilters, area: "Area1" });
    });
  });
  
  it("calls clearFilters when reset button is clicked", () => {
    setup();

    fireEvent.click(screen.getByText("Reset Filters"));
    expect(mockClearFilters).toHaveBeenCalled();
  });
});