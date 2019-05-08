import connection
from psycopg2 import sql


@connection.connection_handler
def get_boards(cursor):
    cursor.execute(
        sql.SQL(
            """
            SELECT * FROM boards
            """
        )
    )
    return cursor.fetchall()


@connection.connection_handler
def get_cards(cursor):
    cursor.execute(
        """
        SELECT id, board_id, title, status_id, orders
        FROM cards
        """)
    
    cards = cursor.fetchall()
    return cards


@connection.connection_handler
def get_all_statuses(cursor):
    cursor.execute(
        sql.SQL(
            """
            SELECT * FROM statuses
            """
        )
    )
    return cursor.fetchall()


@connection.connection_handler
def insert_board(cursor, boardtitle):
    cursor.execute(
        """
        INSERT INTO boards (title)
        VALUES (%(boardtitle)s)
        """,
        {"boardtitle": boardtitle})


@connection.connection_handler
def get_new_board_data(cursor):
    cursor.execute(
        """
        SELECT id, title FROM boards
        ORDER BY id DESC
        LIMIT 1
        """
    )
    return cursor.fetchone()


@connection.connection_handler
def insert_card(cursor, card):
    cursor.execute(
        """
        INSERT INTO cards (board_id, title, status_id, orders)
        VALUES (%(board_id)s, %(title)s, %(status_id)s, %(orders)s)
        
        """, {"board_id": card["board_id"],
              "title": card["title"],
              "status_id": card["status_id"],
              "orders": card["orders"]}
    )
