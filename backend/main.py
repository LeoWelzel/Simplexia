import re

import json
import requests


def get_api_data(filename):
    with open(filename) as details_json_file:
        data = json.load(details_json_file)
    return data


def get_original_text(filename):
    with open(filename, 'r', encoding='UTF-8') as input_text_file:
        input_text = input_text_file.read()
    return input_text


def make_request(input_text, data, api_url):
    r = requests.post(
        api_url,
        data={
            'text': input_text
        },
        headers={'api-key': data["APIkey"]}
    )
    return r


def process_summarise_result(r, input_text):
    output = r.json()['output']
    sentences = re.split("(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s", output)
    original_sentences = re.split("(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s", input_text)
    return output, sentences, original_sentences


def find_indices(original_text, output_sentences):
    indices = []
    for sentence in output_sentences:
        start = original_text.find(sentence)
        if start >= 0 and start+len(sentence) < len(original_text):
            indices.append([start, start + len(sentence)])
    return indices


def summarise(results):
    data = get_api_data('deepai_details.json')
    input_text = get_original_text('tmp/input.txt')

    # summarise API call
    api_return = make_request(input_text, data, "https://api.deepai.org/api/summarization")

    if 'output' in api_return.json().keys():
        output, sentences, original_sentences = process_summarise_result(api_return, input_text)

        summarise_results = {"indices": find_indices(input_text, sentences),
                             "summarised": sentences,
                             "valid": True}
    else:
        summarise_results = {"indices": [], "summarised": [],
                             "valid": False}

    results["summarise"] = summarise_results
    return results


def process_keyword_results(r):
    keywords_list = r.json()["output"].split("\n")
    return keywords_list


def keyword(results):
    data = get_api_data('deepai_details.json')
    input_text = get_original_text('tmp/input.txt')

    # summarise API call
    api_return = make_request(input_text, data, "https://api.deepai.org/api/text-tagging")

    if 'output' in api_return.json().keys():
        keyword_results = {"words": process_keyword_results(api_return), "valid": True}
    else:
        keyword_results = {"words": [], "valid": False}

    results["keyword"] = keyword_results
    return results


def find_words_before(original_text, acronym, location):
    count = 0
    for ch in acronym:
        if ch.isalpha():
            count += 1
    search_in = original_text[0:location - 1]
    search_in_words = search_in.split(" ")
    return search_in_words, count


def letter_repeat_count(letter, text):
    count = 0
    for l in text:
        if l == letter:
            count += 1
    return count


def simple_word_count(original_text, acronym, location):
    search_in_words, count = find_words_before(original_text, acronym, location)
    if len(search_in_words) > count:
        return ' '.join(search_in_words[-count:])
    else:
        return ' '.join(search_in_words[1:])


def find_letter_caps(original_text, acronym, location):
    search_in = original_text[0:location - 1]
    first_letter = acronym[0]
    count = letter_repeat_count(first_letter, acronym)
    search_in_copy = search_in
    loc = location
    while count > 0:
        loc = search_in.rfind(first_letter)
        if loc < 0:
            break
        count -= 1
        search_in = search_in[0:loc]
    if loc >= 0:
        return search_in_copy[loc:location - 1]
    else:
        return 0


def locate_meaning(original_text, acronym, location):
    meaning = find_letter_caps(original_text, acronym, location)
    if meaning == 0:
        meaning = simple_word_count(original_text, acronym, location)
    return meaning


def find_acronyms(original_text):
    acronyms_regex = re.findall("(([A-Z]\.){2,}[A-Z]?)|([A-Z]{2,})", original_text)
    acronyms = []
    for group in acronyms_regex:
        for word in group:
            if word != '':
                acronyms.append(word)
    acronyms = set(acronyms)
    acr_map = {}
    for acronym in acronyms:
        location = original_text.find("({})".format(acronym))
        if location >= 0:
            meaning = locate_meaning(original_text, acronym, location)
            acr_map[acronym] = [meaning]

    return acr_map


def acronym_meanings(results):
    results["acronyms"] = find_acronyms(get_original_text('tmp/input.txt'))
    return results

if __name__ == '__main__':
    results = {}
    find_acronyms(get_original_text("tmp/input.txt"))
    results = summarise(results)
    results = keyword(results)
    results = acronym_meanings(results)
    with open('tmp/output.json', 'w') as output_json_file:
        json.dump(results, output_json_file)
