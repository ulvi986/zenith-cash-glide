import mysql.connector
import logging

logger = logging.getLogger(__name__)

def get_db_connection():
    try:
        return mysql.connector.connect(
            host="localhost",
            user="root",
            password="printzodiac21A!",
            database="paymentsystem",
            autocommit=True
        )
    except mysql.connector.Error as err:
        logger.error(f"Database connection error: {err}")
        return None
