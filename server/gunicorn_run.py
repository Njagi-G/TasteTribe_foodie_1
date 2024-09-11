from config import Config

# Existing configurations
bind = Config.GUNICORN_BIND
workers = Config.GUNICORN_WORKERS
threads = Config.GUNICORN_THREADS
timeout = Config.GUNICORN_TIMEOUT
accesslog = Config.GUNICORN_ACCESSLOG
errorlog = Config.GUNICORN_ERRORLOG
loglevel = Config.GUNICORN_LOGLEVEL

# New configurations for enhanced logging
capture_output = True
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s" %(L)s'

# ANSI color codes
GREEN = "\033[92m"
RED = "\033[91m"
RESET = "\033[0m"
BOLD = "\033[1m"


def post_request(worker, req, environ, resp):
    spacer = "-" * 50
    if resp.status_code >= 400:
        worker.log.error(f"\n{spacer}")
        worker.log.error(
            f"{RED}{BOLD}Failed request:{RESET} {req.method} {req.path} - {resp.status}"
        )
        worker.log.error(f"{spacer}\n")
    else:
        worker.log.info(f"\n{spacer}")
        worker.log.info(
            f"{GREEN}{BOLD}Successful request:{RESET} {req.method} {req.path} - {resp.status}"
        )
        worker.log.info(f"{spacer}\n")


# Enable post_request hook
post_request = post_request
