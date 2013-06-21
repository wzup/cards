# coding: utf-8

module Cards
  class GameUser < ActiveRecord::Base
    
    attr_accessible(:game_id, :user_id, :updated_at)
    validates(:game_id, :user_id, :presence => true)

    # Как и в модели Game - создать геттер и сеттер user_ip.
    # Т.к. это единственный параметр, по которому можно определить юзера.
    attr_accessor(:user_ip)

    # Уникальность не каждой отдельной колонки,
    # а целой пары.
    # http://api.rubyonrails.org/classes/ActiveRecord/Validations/ClassMethods.html#method-i-validates_uniqueness_of
    # Удобно для game#create
    validates_uniqueness_of(:game_id, :scope => :user_id)
    
    belongs_to(:game, :class_name => :Game, :foreign_key => :game_id)
    belongs_to(:user, :class_name => Cards.user_class.to_s, :foreign_key => :user_id)
  end
end
