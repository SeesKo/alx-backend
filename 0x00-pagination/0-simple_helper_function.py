#!/usr/bin/env python3
"""
Module provides a helper function to calculate index ranges for pagination.
"""


def index_range(page: int, page_size: int) -> tuple:
    """
    Calculate the start and end index for a given page and page size.
    """
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return (start_index, end_index)
