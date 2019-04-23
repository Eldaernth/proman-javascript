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
def get_cards_for_board(cursor, board_id):
    cursor.execute(
        sql.SQL(
            """
            SELECT * FROM cards
            WHERE board_id = {board_id}
            """
        ).format(board_id=sql.Literal(board_id))
    )
    return cursor.fetchall()


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