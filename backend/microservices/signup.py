# services/auth.py
import logging
from typing import Optional
import mysql.connector

logger = logging.getLogger(__name__)
"""
# PROD-da test kodunu söndür!
DEV_TEST_CODES = {"2222"}

def is_mfa_valid(entered_code: str, session_code: Optional[str], dev_mode: bool = True) -> bool:
    MFA kodunu yoxla. Dev modda test kodlarını da qəbul edir.
    if not entered_code:
        return False
    if entered_code == session_code:
        return True
    if dev_mode and entered_code in DEV_TEST_CODES:
        return True
    return False

"""
def register_user(conn,
                  name: str,
                  email: str,
                  password_hash: str) -> int:
    """
    Yeni istifadəçi yazır və user_id qaytarır.
    Qeyd: Şifrənim HASH-ını ver (plaintext YOX).
    """
    sql = """
        INSERT INTO signup_login_system (name, gmail, password, is_verified)
        VALUES (%s, %s, %s, %s)
    """
    data = (name, email, password_hash, 1)

    cur = conn.cursor()
    try:
        cur.execute(sql, data)
        user_id = cur.lastrowid
        conn.commit()
        logger.info(f"User registered: {email} (id={user_id})")
        return user_id
    except mysql.connector.Error as e:
        conn.rollback()
        logger.error(f"DB error during registration for {email}: {e}")
        raise
    finally:
        cur.close()
