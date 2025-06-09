import React from 'react'

export default function TodoList() {
  return (
    <div>
      <div>
        <form>
          <h1>Add a Todo</h1>
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" required />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input type="text" id="description" name="description" required />
          </div>
          <div>
            <label htmlFor="dueDate">Due Date:</label>
            <input type="date" id="dueDate" name="dueDate" required />
          </div>
          <div>
            <label htmlFor="priority">Priority:</label>
            <select id="priority" name="priority" required>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label htmlFor="status">Status:</label>
            <select id="status" name="status" required>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button type="submit">Add Todo</button>
          <button type="reset">Reset</button>
        </form>
      </div>
    </div>
  )
}
