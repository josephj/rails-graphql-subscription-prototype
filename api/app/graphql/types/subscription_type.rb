module Types
  class SubscriptionType < Types::BaseObject
    field :newTodoItem, Types::TodoItemType, null: false,
          description: 'Subscription for new todo items'

    def newTodoItem
      {
        subscription: -> {
          # Implement your subscription logic here
          # For example, if you're using Action Cable, you can subscribe to the relevant channel
          # and handle the incoming updates
#           ApiSchema.subscriptions.trigger('newTodoItem', {}, new_todo_item)
        }
      }
    end
  end
end