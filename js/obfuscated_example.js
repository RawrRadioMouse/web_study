
//The below is an example of obfuscated javascript.
//there is an array represented in hex, with a function referring to different sections of the array


function dimdim() {
    var _0xebf1 = ["\x6F\x6E\x72\x65\x61\x64\x79\x73\x74\x61\x74\x65\x63\x68\x61\x6E\x67\x65", 
    "\x72\x65\x61\x64\x79\x53\x74\x61\x74\x65", 
    "\x73\x74\x61\x74\x75\x73", 
    "\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C", 
    "\x72\x65\x73\x75\x6C\x74", 
    "\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64", 
    "\x72\x65\x73\x70\x6F\x6E\x73\x65\x54\x65\x78\x74", 
    "\x47\x45\x54", 
    "\x2F\x6C\x61\x62\x2F\x77\x65\x62\x61\x70\x70\x2F\x63\x73\x72\x66\x2F\x32\x3F\x63\x68\x32\x3D\x33\x64\x66\x32\x32\x33", 
    "\x6F\x70\x65\x6E", 
    "\x73\x65\x6E\x64"];
    var req = new XMLHttpRequest();
    req[_0xebf1[0]] = function () {
        if (req[_0xebf1[1]] == 4 && req[_0xebf1[2]] == 200) {
            document[_0xebf1[5]](_0xebf1[4])[_0xebf1[3]] = req[_0xebf1[6]];
        }
        ;
    };
    req[_0xebf1[9]](_0xebf1[7], _0xebf1[8], true); //we can tell from this line that lines 789 are of interest, they decode to ('GET', '/lab/webapp/csrf/2?ch2=3df223', 'open')
    req[_0xebf1[10]]();
};

//In python it is simply:
//>>> e1="\x47\x45\x54", "\x2F\x6C\x61\x62\x2F\x77\x65\x62\x61\x70\x70\x2F\x63\x73\x72\x66\x2F\x32\x3F\x63\x68\x32\x3D\x33\x64\x66\x32\x32\x33", "\x6F\x70\x65\x6E"
//>>> e1
//('GET', '/lab/webapp/csrf/2?ch2=3df223', 'open')
//>>>
