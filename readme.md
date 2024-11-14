## WC Dupe: Based on Coding Challenges

Challenge Link: [Build Your Own wc Tool](https://codingchallenges.fyi/challenges/challenge-wc)

### Install and Usage
1. Clone this repository in your machine.
2. run `npm install` , this will install all the required packages
3. run `npm package` to transpile the code to commonJS modules and create an executable *'app.exe'*.
4. We will finally use app.exe which is WC dupe
Usage: `app.exe -[Flag] <TextFile>.txt -[optional: debug]`

### Current Functionality
1. `-c` to get the number of bytes in the text file. 
Usage: `app.exe -c <TextFile>.txt`
2. `-l` to get the number of lines in the text file
Usage: `app.exe -l <TextFile>.txt`
3. `-w` to get the number of words in the text file
Usage: `app.exe -w <TextFile>.txt`
4. `-m` to get the number of characters in text file
Usage: `app.exe -m <TextFile>.txt`
5. No flags to get `-c`, `-l` and `-w` responses
Usage: `app.exe <TextFile>.txt`
5. `-debug` for using debug mode --still incomplete
Usage: `app.exe -[optional:Flag] <TextFile>.txt -debug`

#### *TODO:*
1. Cleanup code
2. Add examples section in Readme
3. Add a man and --help page in shell
4. Support stdin
5. Support Multiple Files
6. Extend ErrorModule + code cleanup
7. Extend DebugModule + code cleanup
