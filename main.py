import os,re
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
print("assistant_id",assistant_id)

@app.route('/')
def home():
  return render_template('index.html')

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
  game_str = user_input.strip().split()[-1].lower()
  if game_str == "fortnite":
    data= {
        "title": "Fortnite",
        "staff_link": "https://gameopedia.com/staff/games/18343",
        "category": {
            "Business Model": "Game Acquisition ,Buy to Acquire ,Microtransactions ,Cosmetic & Gameplay Affecting ,Ads ,No Ads ,Subscription Model ,No Subscription Model ,Microtransactions ,Buy to Acquire ",
            "Genre": "Action ",
            "Sub-genre": "Shooter ,Platform ,Role-Playing ,Strategy ",
            "Theme": "Post-Apocalyptic ,Sci-Fi ,Zombie ,Epidemic Breakout ,Surviving "
        },
        "developer": "Epic Games, Inc.,,People Can Fly, Sp. z o.o.,",
        "release data": "30-06-2020",
        "locality": "United States (US)",
        "screenshots": [
            "https://s3.amazonaws.com/gameopedia_covers/screenshots/1339408/910519ea5b6a97946371f4d85dcacfbe.jpg"
        ]
    }
    return jsonify({"message":data,"source":False})
  elif game_str=="hades":
    data = {
        "title": "Hades",
        "staff_link": "https://gameopedia.com/staff/games/69683",
        "category": {
            "Business Model": "Game Acquisition ,Buy to Acquire ,Microtransactions ,No Microtransactions ,Ads ,No Ads ,Subscription Model ,No Subscription Model ,Buy to Acquire ",
            "Genre": "Action ,Role-Playing ",
            "Sub-genre": "Fighting ,Shooter ",
            "Theme": "Family ,Mythology ,Fantasy ,Escape ,High Fantasy ,Greek "
        },
        "developer": "Supergiant Games, LLC,",
        "release data": "17-09-2020",
        "locality": "United States (US)",
        "screenshots": [
            "https://s3.amazonaws.com/gameopedia_covers/screenshots/2183013/cb1b6753a1e28fb773fd3526e559adba.jpg"
        ]
        
    }
    print(data)
    return jsonify({"message":data,"source":False})
  
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
    # else:
    #   pass
      # print(run_status)
      # print(client.beta.threads.messages.list(thread_id=thread_id))
    i += 1
    sleep(2)  # Wait for two second before checking again

  # Retrieve and return the latest message from the assistant
  messages = client.beta.threads.messages.list(thread_id=thread_id)
  # print(f"messages: {messages}")#
  response = messages.data[0].content[0].text.value
  print(f"response: {response}")
  cleaned_response = re.sub(r'【.*?】', '', response)
  
  if i <10:
    print(f"Assistant response: {cleaned_response}")  # Debugging line
    return jsonify({"message":cleaned_response,"source":True})
  else:
    return jsonify({"response": "please re-check you text"}), 400
    # completion = client.chat.completions.create(
    # model="gpt-3.5-turbo-1106",
    # messages=[{"role": "user", "content": user_input}])
    # data = completion.choices[0].message
    # print(f"else data: {data}")
    # resp = data.content
    # print(f"else resp: {resp}")
    # return jsonify({"response": resp})


# Run server
if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8080)