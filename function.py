import json
import os

def create_assistant(client):
  try:
    assistant_file_path = 'assistant.json'
    knowledge_file = client.files.create(file=open("knowledge.json", "rb"),purpose='assistants')
    # prompt_file = client.files.create(file=open("ui_prompt.txt", "rb"),purpose='assistants')
    # file = client.files.create(file=open("knowledge.docx", "rb"),purpose='assistants')
    assistant = client.beta.assistants.create(instructions="You are game data assistant of online website. you will be given multiple game data and you have to assisst user that visit this website with their query. Only assisst them in gaming related queries that are in knowledge data and reject them politely if it is not related to gaming. Also I need the data in this ways.",
                                    # model="gpt-4-1106",
                                    model="gpt-3.5-turbo-1106",
                                    tools=[{
                                        "type": "retrieval"
                                    }],
                                    file_ids=[knowledge_file.id]
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