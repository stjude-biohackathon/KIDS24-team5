import csv
import requests
import os
import pandas as pd
import time
import json
from tqdm import tqdm
import sys

# To run the script 
# python utils/section_titles_check.py section_titles_prompt.csv

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
		# Generate answer prompt (assuming query_api function remains unchanged)
		i += 1
		answer_prompt = {
			"model": 'llama3.1:latest',
			"prompt": 'answer the question and respond in with this json format {"titles_present" :[], "titles_missing" :[], "comment": string} where titles_present and titles_missing are array of section titles and comment is in text in less than 100 words: ' + prompt + ' ```' + text + '```',
			"stream": False,
			"options": {
				"temperature": 0.1,
				"top_k": 5,
				"top_p": 0.3
			}
		}

		# Choose API endpoint based on model type (assuming query_api function remains unchanged)
		response = query_api(answer_api, answer_prompt).get('response', '')
		# print(response)
		# Save the response to a json file
		result_file = 'utils/' + file_name + '.json'
		results = { "prompt": prompt, "text": text, "response": response }
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
		writer.writerow(['prompt', 'text', 'response'])
		# write the data
		for row in data:
			writer.writerow([row['prompt'], row['text'], row['response']])

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