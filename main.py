from flask import Flask, render_template, url_for, request
from util import json_response, jsonify

import data_handler
import queries

app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/get-boards")
def get_boards():
    """
    All the boards
    """
    
    boards = queries.get_boards()
    return jsonify(boards)


@app.route("/get-cards")
def get_cards():
    cards = queries.get_cards()
    return jsonify(cards)


@app.route("/add-board", methods=["POST", "GET"])
def add_board():
    board = request.get_json()
    queries.insert_board(board["title"])
    id = dict(queries.get_last_board_id())
    return jsonify(id)


@app.route("/add-card", methods=["POST"])
def add_card():
    card = request.get_json()
    queries.update_card_orders(card["board_id"], card["status_id"])
    queries.insert_card(card)
    last_card = queries.get_last_card()
    
    return jsonify(last_card)


@app.route("/get-cards/<int:board_id>")
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    cards = queries.get_cards_for_board(board_id)
    return jsonify(cards)


@app.route("/update-card-status", methods=["POST"])
def update_card_status():
    cards = request.get_json()
    for card in cards:
        queries.update_card(card["id"], card["status_id"], card["orders"])
    return jsonify({"result": "OK"})


def main():
    app.run(debug=True)
    
    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
