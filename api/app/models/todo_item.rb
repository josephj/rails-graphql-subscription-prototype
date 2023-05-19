class TodoItem < ApplicationRecord
  validates :title, presence: true
end
