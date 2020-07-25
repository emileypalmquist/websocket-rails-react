module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def Connection
      self.current_user = find_verified_user
    end

    private

      def find_verified_user
        begin
          token = request.headers[:HTTP_WEBSOCKET_PROTOCOL].split(' ').last
          decoded_token = JWT.decode(token, 'my_s3cr3t', true, algorithm: 'HS256')
          if (current_user = User.find(decoded_token[0]["id"]))
            current_user
          end
        rescue JWT::DecodeError
          nil
        end
      end
  end
end

