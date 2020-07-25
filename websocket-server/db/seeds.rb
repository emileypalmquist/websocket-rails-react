Message.destroy_all
User.destroy_all

em = User.create(name: "Emiley", username: "emileymarie", password: "helloworld", password_confirmation: "helloworld", email: "emiley@fakemail.com")
co = User.create(name: "Conner", username: "connermarie", password: "helloworld", password_confirmation: "helloworld", email: "conner@fakemail.com")
ca = User.create(name: "Carisa", username: "carisamarie", password: "helloworld", password_confirmation: "helloworld", email: "carisa@fakemail.com")
ka = User.create(name: "Kailey", username: "kaileymarie", password: "helloworld", password_confirmation: "helloworld", email: "kailey@fakemail.com")

m1 = Message.create(content: "hello, world", sender: em, receiver: co)
m2 = Message.create(content: "hello", sender: em, receiver: ca)
m3 = Message.create(content: "hola", sender: em, receiver: co)
m4 = Message.create(content: "hi", sender: ka, receiver: em)
