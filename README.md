# socketMusicBoiler
some boiler plate for socketMusic project using node.js with express,socket.io and node-osc; webaudioapi; and supercollider.

- server.js - js file run by node
- package.json - the manifest file for node file
- index.html - webpage being served by node
- javascript/client.js - the client side interpreter of socket broadcasts
- javascript/audio.js - the client side web audio api stuff with example code of unusual ways to use webaudioapi
- frontend.scd - the supercollider file to act as a frontend for node with example automation of osc message sending
- hosts.conf - conf file used by dnsmasq for the dhcp/dns server i serve on my computer
- dnsmasq.conf - belongs in /etc, conf file for dnsmasq dhcp/dns services
- interfaces - belongs in /etc/network, way to configure static ip
- misc/socketMusic-diagram.pdf - schematic of the original realization
Note: to get node to run on port 80 use: setcap 'cap_net_bind_service+3p' /usr/bin/nodejs
