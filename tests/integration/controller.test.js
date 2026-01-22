const { TodoService } = require('../../js/model');
const { Controller } = require('../../js/controller');

// Mock the View because we are not testing the UI, only Controller-Model interaction.
const mockView = {
    update: jest.fn(),
    bindAddTodo: jest.fn(),
    bindToggleTodo: jest.fn(),
    bindRemoveTodo: jest.fn(),
};

describe('Controller-Service Integration Tests', () => {
    let service;
    let controller;

    beforeEach(() => {
        service = new TodoService();
        service.todos = []; // Reset singleton for tests
        controller = new Controller(service, mockView);
    });

    test('handleAddTodo should call service.addTodo and update the model', () => {
        const text = 'Integration Test Todo';

        // Simulate user action via Controller
        controller.handleAddTodo(text);

        // Assert model state changed
        expect(service.todos.length).toBe(1);
        expect(service.todos[0].text).toBe(text);
        expect(service.todos[0].completed).toBe(false);
    });

    test('handleRemoveTodo should call service.removeTodo and update the model', () => {
        // Directly add a todo to the model
        service.addTodo('Todo to be removed');
        const todoId = service.todos[0].id;

        // Simulate user action via Controller
        controller.handleRemoveTodo(todoId);

        // Assert model state changed
        expect(service.todos.length).toBe(0);
    });
});
