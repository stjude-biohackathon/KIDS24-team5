import csv
import requests
import os
import pandas as pd
import time
import json
from tqdm import tqdm
import sys

# To run the script 
# python utils/introduction_paragraph_score.py intro_score_prompts.csv

# Define API endpoints
answer_api = 'http://40.124.104.197/api/generate/'

# Function to query APIs with payload and measure time taken
def query_api(url, payload):
    headers = {'Content-Type': 'application/json'}
    start_time = time.time()
    response = requests.post(url, headers=headers, json=payload)
    end_time = time.time()
    print(f"API call to {url} took {end_time - start_time:.2f} seconds.")
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        print(response.reason)
        return None

# read a csv file and get data from each row
def read_csv_file(file_path):
	data = []
	with open(file_path, 'r') as file:
		data = pd.read_csv(file)
		
	return data

# run api call for each row in the csv file
def run_api_calls(data, file_name):
	for i in tqdm(range(len(data))):
		# get the data from the row
		labels = data.iloc[i]
		# get the question and answer
		prompt = str(labels['prompt'])
		text = str(labels['text'])
		context = str(labels['context'])
		# Generate answer prompt (assuming query_api function remains unchanged)
		i += 1
		answer_prompt = {
			"model": 'llama3.1:latest',
			"prompt": 'answer the question and respond in with this json format {"score" :number, "comment" :text} where scores can be number from 1 to 5 and comment can be text with less than 200 words: ' + prompt + ' ```' + text + '```',
			"stream": False,
			"sytem": 'given the following context: ```' + context + '```',
			"options": {
				"temperature": 0.2,
				"top_k": 10,
				"top_p": 0.5
			}
		}

		# Choose API endpoint based on model type (assuming query_api function remains unchanged)
		response = query_api(answer_api, answer_prompt).get('response', '')
		# print(response)
		# Save the response to a json file
		result_file = 'utils/' + file_name + '.json'
		results = { "prompt": prompt, "text": text, "context": context, "response": response }
		# check if the directory exists
		if os.path.exists(result_file):
			with open(result_file, 'r+') as f:
				json_data = json.load(f)
				json_data.append(results)
				f.seek(0)
				json.dump(json_data, f, indent=4)
		else:
			with open(result_file, 'w') as f:
				json.dump([results], f, indent=4)

# convert json to csv
def json_to_csv(file_name):
	# read the json file
	file_path = 'utils/'+ file_name + '.json'
	with open(file_path, 'r', encoding='utf-8') as file:
		data = json.load(file)
	# write to csv file
	csv_file = 'utils/' + file_name + '.csv'
	with open(csv_file, 'w', encoding='utf-8') as file:
		writer = csv.writer(file)
		# write the header
		writer.writerow(['prompt', 'text', 'context', 'response'])
		# write the data
		for row in data:
			writer.writerow([row['prompt'], row['text'], row['context'], row['response']])

# main function

def main():

	args = sys.argv
	if len(args) < 2:
		print("Please provide the path to the csv file")
		return
	file_path = 'utils/' + args[1]
	# read the csv file
	data = read_csv_file(file_path)
	# run api calls
	file_name = args[1].split('.')[0]
	run_api_calls(data, file_name)
	# convert json to csv
	json_to_csv(file_name)

if __name__ == '__main__':
	main()