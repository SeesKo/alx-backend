# 0x02. i18n

## Description

Internationalization, often abbreviated as `i18n`, is the process of designing and developing a software application in a way that makes it easy to adapt to different languages and regions without requiring changes to the underlying code.

## Key Concepts of i18n

### 1. Design for Flexibility:
- **Separation of Content from Code:** Keep text and content separate from the application logic. This makes it easier to translate and update content without altering the code.
- **Support for Multiple Languages:** Prepare your application to handle various languages and character sets.

### 2. Locale Awareness:
- **Locale:** A locale represents the user's cultural and linguistic preferences, such as language, region, and formatting conventions. For example, `en_US` for English (United States) or `fr_FR` for French (France).
- **Date/Time Formatting:** Different regions have different formats for dates and times. `i18n` should accommodate these differences.

### 3. Translation:
- **Text Extraction:** Extract text from your application that needs to be translated into other languages.
- **Translation Files:** Store translations in files (like `.po` or `.json`), which map original text to translated text.

### 4. Internationalization Tools:
- **Libraries and Frameworks:** Use tools and libraries (e.g., `Flask-Babel` for Flask applications) to facilitate the internationalization process. These tools often provide functions to handle text translations, date/time formatting, and locale selection.

## Requirements

- Ubuntu 18.04 LTS
- Python 3.7
- Flask
- Flask-Babel
- pytz
- Code should use the pycodestyle style (version 2.5)
- All `.py` files should be executable
