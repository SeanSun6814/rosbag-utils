import time


class RateLimiter:
    def __init__(self, delay, success_callback, drop_callback):
        self.delay = delay
        self.prevTimestamp = time.time()
        self.success_callback = success_callback
        self.drop_callback = drop_callback

    def run(self):
        if time.time() - self.prevTimestamp > self.delay:
            self.prevTimestamp = time.time()
            return self.success_callback
        else:
            return self.drop_callback
