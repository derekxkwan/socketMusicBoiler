# socketMusicBoiler
some boiler plate for socketMusic project using node.js with express and socket.io, webaudioapi, and supercollider.

- server.js - js file run by node
- package.json - the manifest file for node file
- index.html - webpage being served by node
- javascript/client.js - the client side interpreter of socket broadcasts
- javascript/audio.js - the client side web audio api stuff with example code of unusual ways to use webaudioapi
- frontend.scd - the supercollider file to act as a frontend for node with example automation of osc message sending
- hosts.conf - conf file used by dnsmasq for the dns server i serve on my computer

Note: to get node to run on port 80 use: setcap 'cap_net_bind_service+3p' /usr/bin/nodejs
