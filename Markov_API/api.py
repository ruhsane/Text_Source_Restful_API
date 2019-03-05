import sys
from flask import Flask
from flask import render_template
import Markov

app = Flask(__name__)

app.config.update(
    DEBUG=True,
    # TEMPLATES_AUTO_RELOAD=True
)

@app.route('/')

def hello_world():

    app.word_list = Markov.Markov.words_list("story.txt")
    app.markov = Markov.Markov.model(app.word_list)
    app.string = Markov.Markov.result_sentence(app.markov)
    print(app.string)

    return render_template("home.html", sentence = app.string)

if __name__ == '__main__':
    app.run()
