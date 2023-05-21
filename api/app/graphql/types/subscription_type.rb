module Types
  class SubscriptionType < Types::BaseObject
    field :newTodoItem, Types::TodoItemType, null: false,
          description: 'Subscription for new todo items'

    def newTodoItem
       Rails.logger.info('new_todo_item method called') # Add this line
       context[:subscription_scope].async.yield(TodoItem.last)
       {
         subscription: -> {
           # Implement your subscription logic here
           # For example, if you're using Action Cable, you can subscribe to the relevant channel
           # and handle the incoming updates
           # ApiSchema.subscriptions.trigger('newTodoItem', {}, new_todo_item)
         }
       }
    end
  end
end