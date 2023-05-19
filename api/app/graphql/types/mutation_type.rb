module Types
  class MutationType < Types::BaseObject
    field :createTodoItem, TodoItemType, null: true do
      description "Create a new todo item"
      argument :title, String, required: true
      argument :description, String, required: false
    end

    def createTodoItem(title:, description:)
      todo_item = TodoItem.create(title: title, description: description)

      ApiSchema.subscriptions.trigger('newTodoItem', {}, todo_item)

      todo_item
    end
  end
end
