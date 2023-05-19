module Types
  class QueryType < Types::BaseObject
    field :todoItems, [TodoItemType], null: false, description: "Retrieve all todo items"

    def todoItems
      TodoItem.all
    end

    field :todoItem, TodoItemType, null: true do
      description "Retrieve a todo item by ID"
      argument :id, ID, required: true
    end

    def todoItem(id:)
      TodoItem.find_by(id: id)
    end
  end
end
