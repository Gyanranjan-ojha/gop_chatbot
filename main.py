import os
from time import sleep
from flask import Flask, request, jsonify,render_template,request,redirect,url_for
from openai import OpenAI
from function import create_assistant


OPENAI_API_KEY = os.environ['OPENAI_API_KEY']
print(OPENAI_API_KEY)

# Start Flask app
app = Flask(__name__)

# Init client
client = OpenAI(api_key=OPENAI_API_KEY)  

# Create new assistant or load existing
assistant_id = create_assistant(client)

@app.route('/')
def home():
  return render_template('index1.html')

# Start conversation thread
@app.route('/getGPTAssistant', methods=['GET'])
def start_conversation():
  print("Starting a new conversation...")  # Debugging line
  thread = client.beta.threads.create()
  print(f"New thread created with ID: {thread.id}")  # Debugging line
  return jsonify({"thread_id": thread.id})

# Generate response
@app.route('/getGPTPromt', methods=['POST'])
def chat():
  data = request.json
  thread_id = data.get('thread_id')
  print(f"getGPTPromt -> {thread_id}, Type:{type(thread_id)}")
  user_input = data.get('message', '')
  print(f"getGPTPromt -> {user_input},Type:{type(user_input)}")

  if not thread_id:
    print("Error: Missing thread_id")  # Debugging line
    return jsonify({"error": "Missing thread_id"}), 400

  print(f"Received message: {user_input} for thread ID: {thread_id}")  # Debugging line

  # Add the user's message to the thread
  client.beta.threads.messages.create(thread_id=thread_id,role="user",content=user_input)

  # Run the Assistant
  run = client.beta.threads.runs.create(thread_id=thread_id,assistant_id=assistant_id)
  print(f"run.id: {run.id}")
  i =0
  # Check if the Run requires action (function call)
  while i<10:
    run_status = client.beta.threads.runs.retrieve(thread_id=thread_id,run_id=run.id)
    print(f"Run status: {run_status.status}")
    if run_status.status == 'completed':
      break
    i += 1
    sleep(2)  # Wait for a second before checking again

  # Retrieve and return the latest message from the assistant
  messages = client.beta.threads.messages.list(thread_id=thread_id)
  response = messages.data[0].content[0].text.value
  print(f"response: {response}")

  if i <10 :
    print(f"Assistant response: {response}")  # Debugging line
    return jsonify({"response": response})
  else:
    return jsonify({"response": "please re-check you text"}), 400


# Run server
if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8080)