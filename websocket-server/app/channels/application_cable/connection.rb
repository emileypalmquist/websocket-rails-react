module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
      # byebug
    end

    private

    def find_verified_user
      token = request.params[:token]
      decoded_token = JWT.decode(token, 'my_s3cr3t', true, algorithm: 'HS256')
      if (current_user = User.find(decoded_token[0]["id"]))
        current_user
      else 
        reject_unauthorized_connection
      end
    end
  end
end

