wsgi_app = "sut:app"
daemon = False  # daemon mode
bind = "127.0.0.1:8888"  # Server Socket
workers = 1  # Worker Processes
errorlog = "-"
loglevel = "info"
