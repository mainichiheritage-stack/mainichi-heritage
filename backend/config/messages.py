class LogMsg:
    # Quiz関連
    QUIZ_REQUEST_RECEIVED = "Quiz request received"
    QUIZ_QUERY_SUCCESS = "Quiz query successful"
    QUIZ_NOT_FOUND = "No quizzes match"

    # バリデーションエラー
    INVALID_CODE_FORMAT = "Invalid code format received"
    MISSING_CATEGORY_PARAMS = "Category requested without necessary parameters"
    
    # システム
    AXIOM_ENABLED = "Axiom logging enabled"

    # 認証
    AUTH_REGISTER_SUCCESS = "User registration successful"
    AUTH_REGISTER_FAILED = "User registration failed"
    AUTH_LOGIN_SUCCESS = "User login successful"
    AUTH_LOGIN_FAILED = "User login failed"