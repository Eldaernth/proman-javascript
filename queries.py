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
def get_last_board_id(cursor):
    cursor.execute(
        """
        SELECT id, title FROM boards
        ORDER BY id DESC
        LIMIT 1
        """
    )
    return cursor.fetchone()


@connection.connection_handler
def get_last_card(cursor):
    cursor.execute(
        """
        SELECT id,board_id,title,status_id
        FROM cards
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


@connection.connection_handler
def get_cards_for_board(cursor, board_id):
    cursor.execute(
        """
        SELECT id, board_id, title, status_id, orders
        FROM cards
        WHERE board_id= %(board_id)s
        ORDER BY orders DESC
        
        """, {"board_id": board_id}
    )
    
    return cursor.fetchall()


@connection.connection_handler
def update_card(cursor, card_id, status_id, orders):
    cursor.execute(
        """
        UPDATE cards
        SET status_id = %(status_id)s, orders = %(orders)s
        WHERE id=%(id)s
        
        """, {"id": card_id,
              "status_id": status_id,
              "orders": orders}
    )


@connection.connection_handler
def update_card_orders(cursor, board_id, status_id):
    cursor.execute(
        """
        UPDATE cards
        SET orders = orders + 1
        WHERE board_id = %(board_id)s
          AND status_id = %(status_id)s
        """, {"board_id": board_id,
              "status_id": status_id}
    )


@connection.connection_handler
def update_board_title(cursor, title, id):
    cursor.execute(
        """
        UPDATE boards
        SET title = %(title)s
        WHERE id = %(id)s
        """, {"id": id,
              "title": title}
    )

