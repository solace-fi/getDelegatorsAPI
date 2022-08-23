# API user instructions

API to expose getDelegators function - gets array of voters who have delegated their vote (in Solace Native insurance gauge voting system) to a given address.

```bash

curl <ENDPOINT>/getDelegators?address=0x501ACe67a1cba9ca9793c300B3AEB29394ae8C7b

# { ["0xC32e0d89e25222ABb4d2d68755baBF5aA6648F15"] }

```

# Server instructions

To run server and caching cronjob

```bash
./run.sh
```