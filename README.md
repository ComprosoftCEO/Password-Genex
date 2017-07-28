# Password-Genex
Generate a secure password using a combination of SHA-256 and Hexacrypt

<br>

## The Concept:
Passwords are hard to remember, and many people invent bad passwords. With Password Genex, you can remember the bad password, but easily use it to generate a good password. Plus, the algorithm is cross-platform, as Javascript is supported universally on every platform.

<br>

## How to Use
Type the bad password into the box labeled "Original Password" box, and type the associated "Account Name" into the box labeled "Account Name." Next, secure the password with a "Secret Code" that only you know. The secret code does not need to be a good password per se, but it needs to be kept secret. Since some accounts do not allow certain symbols, a filter option is included to remove illegal characters. Please note that modifying the filter changes the output, so be sure to make note of what characters are allowed when generating your passwords.

<br>

Click generate, and you will have a secure password.



<br>

## Theory
Password Generator relies on two algorithms:

* SHA-256
* Hexacrypt

SHA-256 is what's called a hashing algorithm. It takes an input of any length, and returns a string of 64 random hexadecimal bytes. The same input always returns the same output. However, it is almost impossible to derive the input from the output. Therefore, it is considered to be a one-way function. In addition, changing one character in the input completely changes the whole output in SHA-256. The javascript implementation used in Password Genex was programmed by Chen, Yi-Cyuan. More about his code is available [Here](https://github.com/emn178/js-sha256).

Hexacrypt, the second algorithm, is an advanced version of the Nazi Enigma Machine. Designed by Bryan McClain, the algorithm can be used for encrypting and decrypting messages, given that the same key is used. The algorithm works by doing letter subsitution, but the subsitution string is changed for every letter in the message. Therefore, the output message looks completely different from the input message. The benefit to Hexacrypt is that everything is encoded using ASCII text characters, which makes it easy to encrypt plaintext. The version used here only needs to encrypt the message, and doesn't use any advanced features such as adding "Garbage" or a checksum. To read more about Hexacrypt, check out the [official page](https://github.com/ComprosoftCEO/Hexacrypt).

<br>

## The Algorithm

To generate the secure password, Password Genex concatenates all the input boxes into a single string. The string is: 

     <Account>:<Original Password>:<Secret Code>. 

This string is fed into SHA-256 and hashed. The output of this hash, which is a string consisting of 0-9 and A-F, is fed into Hexacrypt with "Secret Key" as the encryption key used. This implementation of Hexacrypt also takes a third parameter, called "filter," which removes any illegal characters when running the password through Hexacrypt _(As some passwords do not allow certain characters)_. This outputs a "Good Password" consisting of capital and lowercase letters, numbers, and symbols.

<br>

You now have the perfect password for securing your accounts!
