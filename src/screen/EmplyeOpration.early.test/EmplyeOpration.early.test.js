// Unit tests for: EmplyeOpration

import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import EmplyeOpration from '../EmplyeOpration';

describe('EmplyeOpration() EmplyeOpration method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    it('should render the initial list of employees', () => {
      // Render the component
      const {getByText} = render(<EmplyeOpration />);

      // Check if the initial employees are rendered
      expect(getByText('John Doe')).toBeTruthy();
      expect(getByText('Jane Smith')).toBeTruthy();
    });

    it('should add a new employee when valid details are provided', async () => {
      const {getByText, getByPlaceholderText, queryByText} = render(
        <EmplyeOpration />,
      );

      // Open the modal to add a new employee
      fireEvent.press(getByText('add Employee'));

      // Fill in the employee details
      fireEvent.changeText(
        getByPlaceholderText('Employee Name'),
        'New Employee',
      );
      fireEvent.changeText(getByPlaceholderText('age'), '30');
      fireEvent.changeText(getByPlaceholderText('company'), 'New Company');

      // Submit the new employee
      fireEvent.press(getByText('Submit'));

      // Wait for the new employee to be added to the list
      await waitFor(() => {
        expect(queryByText('New Employee')).toBeTruthy();
      });
    });

    it('should delete an employee when the delete button is pressed', async () => {
      const {getByText, queryByText} = render(<EmplyeOpration />);

      // Delete the first employee
      fireEvent.press(getByText('Delete'));

      // Wait for the employee to be removed from the list
      await waitFor(() => {
        expect(queryByText('John Doe')).toBeNull();
      });
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should not add an employee with missing details', async () => {
      const {getByText, getByPlaceholderText, queryByText} = render(
        <EmplyeOpration />,
      );

      // Open the modal to add a new employee
      fireEvent.press(getByText('add Employee'));

      // Fill in incomplete employee details
      fireEvent.changeText(getByPlaceholderText('Employee Name'), '');
      fireEvent.changeText(getByPlaceholderText('age'), '');
      fireEvent.changeText(getByPlaceholderText('company'), '');

      // Attempt to submit the new employee
      fireEvent.press(getByText('Submit'));

      // Ensure no new employee is added
      await waitFor(() => {
        expect(queryByText('')).toBeNull();
      });
    });

    it('should handle editing an employee correctly', async () => {
      const {getByText, getByPlaceholderText} = render(<EmplyeOpration />);

      // Edit the first employee
      fireEvent.press(getByText('Edit'));

      // Change the employee details
      fireEvent.changeText(
        getByPlaceholderText('Employee Name'),
        'Updated Name',
      );
      fireEvent.changeText(getByPlaceholderText('age'), '35');
      fireEvent.changeText(getByPlaceholderText('company'), 'Updated Company');

      // Submit the changes
      fireEvent.press(getByText('Submit'));

      // Verify the employee details are updated
      await waitFor(() => {
        expect(getByText('Updated Name')).toBeTruthy();
        expect(getByText('35')).toBeTruthy();
        expect(getByText('Updated Company')).toBeTruthy();
      });
    });

    it('should toggle the modal visibility', () => {
      const {getByText, queryByText} = render(<EmplyeOpration />);

      // Open the modal
      fireEvent.press(getByText('add Employee'));
      expect(queryByText('Please enter new Employee details')).toBeTruthy();

      // Close the modal
      fireEvent.press(getByText('Hide modal'));
      expect(queryByText('Please enter new Employee details')).toBeNull();
    });
  });
});

// End of unit tests for: EmplyeOpration
