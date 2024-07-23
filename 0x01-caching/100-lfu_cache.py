#!/usr/bin/env python3
"""
LFU Caching Module
"""
from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """ LFU caching system """

    def __init__(self):
        """ Initialize """
        super().__init__()
        self.freq = {}
        self.order = []

    def put(self, key, item):
        """ Add an item in the cache """
        if key is not None and item is not None:
            if key in self.cache_data:
                self.cache_data[key] = item
                self.freq[key] += 1
                self.order.remove(key)
            else:
                if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                    min_freq = min(self.freq.values())
                    lfu_keys = [
                        k for k, v in self.freq.items()
                        if v == min_freq
                    ]
                    if len(lfu_keys) > 1:
                        lru_key = None
                        for k in self.order:
                            if k in lfu_keys:
                                lru_key = k
                                break
                        if lru_key is not None:
                            lfu_key = lru_key
                    else:
                        lfu_key = lfu_keys[0]
                    del self.cache_data[lfu_key]
                    del self.freq[lfu_key]
                    self.order.remove(lfu_key)
                    print(f"DISCARD: {lfu_key}")
                self.cache_data[key] = item
                self.freq[key] = 1
            self.order.append(key)

    def get(self, key):
        """ Get an item by key """
        if key in self.cache_data:
            self.freq[key] += 1
            self.order.remove(key)
            self.order.append(key)
            return self.cache_data[key]
        return None
