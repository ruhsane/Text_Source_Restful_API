from dictogram import Dictogram
import random

class Markov(dict):

    def __init__(self):
        """Initialize this histogram as a new dict and count given words. """
        super(Markov, self).__init__()

    @staticmethod
    def words_list(content):
        words = []
        with open(content) as file:
            for line in file: #for each line of the file
                for word in line.split(): #split the words
                    words.append(word)
        return words

    @staticmethod
    def model(words_list):
        markov = {}
        for i in range(len(words_list)-2):
            key_tuple = (words_list[i], words_list[i+1])
            value = words_list[i+2]
            if key_tuple in markov:
                markov[key_tuple].add_count(value)
            else:
                markov[key_tuple] = Dictogram([value]) #create dictionary with tuple key

        return markov
    @staticmethod
    def sample_weighted(words_dict, tuple):
        words=[]
        inner_dict = words_dict.get(tuple)

        for word in inner_dict: #go into each value,key of dictionary
            for i in range(inner_dict[word]): #take in the value of the word which is the frequency.
                words.append(word) #add the word to the list based on number of its frequency. ex: if fish:4 , add fish to list four times
        return random.choice(words) #randomly choose word from the new list

    @staticmethod
    def result_sentence(words_dict):
        start = random.choice(list(words_dict))
        final_words_list = [start[0], start[1]]
        sentence_length = 0
        end_not_period = True
        has_follow_up = True

        while sentence_length < 20 or end_not_period:
            next = Markov.sample_weighted(words_dict, start)
            start = (start[1], next)
            final_words_list.append(next)
            if next[-1] == '.':
                end_not_period = False
            else:
                end_not_period = True
            sentence_length += 1


        final_sentence = " ".join(final_words_list)
        return final_sentence


if __name__ == "__main__":
    word_list = Markov.words_list("story.txt")
    data_structure = Markov.model(word_list)
    # print(data_structure)
    # print(Markov.result_sentence(data_structure))
