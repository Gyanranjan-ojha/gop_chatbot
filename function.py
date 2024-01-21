import json
import os

inst = """You are working in gaming company. You have to give data from the knowledge json database, don't act like bot or AI. Act like human sitting on help desk. Just give them data what they ask and suggest them what they want. Only talk related to the data you have. Deny them politely if they ask about other topic than game. Keep you reply precise and short.
If they ask for game metadata, give them data in proper stucture way. Below are the datapoints belong to meta data.
Metadata :- "Genres", "Sub-Genre", "Developer", "Release date", "Theme"
"""

def create_assistant(client):
  try:
    assistant_file_path = 'assistant.json'
    file = client.files.create(file=open("knowledge.json", "rb"),purpose='assistants')
    assistant = client.beta.assistants.create(instructions=inst,
                                    # model="gpt-4-1106",
                                    model="gpt-3.5-turbo-1106",
                                    tools=[{
                                        "type": "retrieval"
                                    }],
                                    file_ids=[file.id]
                                  )
    with open(assistant_file_path, 'w') as file:
      json.dump({'assistant_id': assistant.id}, file)
      print("Created a new assistant and saved the ID.")
    return assistant.id
    # if os.path.exists(assistant_file_path):
    #   with open(assistant_file_path, 'r') as file:
    #     assistant_data = json.load(file)
    #     assistant_id = assistant_data['assistant_id']

    #     print("Loaded existing assistant ID.")
    # else:
    #   try:
    #     file = client.files.create(file=open("knowledge.docx", "rb"),purpose='assistants')
    #     # file = client.files.create(file=open("knowledge.json", "rb"),purpose='assistants')
        # assistant = client.beta.assistants.create(instructions=" Your name is Katana. You will act as our customer support bot for a gaming company which has lots of gaming data like developer, publisher, genres, theme,etc. You give only data realted to gaming and if somebody ask anything unrealated ,shut them off. You  will act as very angry bot. Don't polite, be rude. be toxic gamer bot",
        #                                               # model="gpt-4-1106",
        #                                               model="gpt-3.5-turbo-1106",
        #                                               tools=[{
        #                                                   "type": "retrieval"
        #                                               }],
        #                                               file_ids=[file.id]
        #                                             )
    #   except Exception as e:
    #     print(f"Error in else file:{e}")
      # with open(assistant_file_path, 'w') as file:
      #   json.dump({'assistant_id': assistant.id}, file)
      #   print("Created a new assistant and saved the ID.")
    #   assistant_id = assistant.id
    # return assistant_id
  except Exception as e:
    print(e)