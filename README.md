Jethro
======
Jethro Logger is an all-in-one logging utility designed to give developers the logging tools and flexibility they need within one complete package. It is also designed to be used in cooperation with other tools and transport services.



Installation
------------
`npm install jethro`

(Almost done!)

#### Usage

```js

logger = require('jethro')

//Initialises settings
logger.init({
	//quickStart: true
	//database: {run: true}

})
```

However, init is called upon sending the first message, init settings will be the default ones in this case. The first message tat is sent will be delayed and this is a bug that will be fixed shortly!

More features Coming!
---------------------
* Better/improved API with more transport options, methods and settings
* Basic level of file logging
* Logger Web/socket server
* Logger socket client
* Database transport

Credits
-------
Based on work started by Marak (Marak Squires), cloudhead (Alexis Sellier), mmalecki (Maciej Małecki), nicoreed (Nico
Reed), morganrallen (Morgan Allen), JustinCampbell (Justin Campbell) and ded (Dustin Diaz).

License
-------
Licensed under the LGPL v3 License

Copyright (C) 2014  Samuel Mills (known as Henchman, under the github team: HenchSpace)

You can find full license [here.](https://github.com/HenchSpace/Jethro/blob/master/LICENSE.txt)