#!/bin/bash

HOST1=waf:80
HOST2=waf:80
#HOST3=10.25.104.101
#HOST4=hackmehost.com




while :
do
declare -a curlArgs=('-H' "Content-Type: application/json" '-H' "55555: 4.15.16.17" )

#FOR NODE _ any host
# Directory listing
curl -s -i -m 2 --compressed --referer http://$HOST1/ --header "55555: 27.116.59.251" --user-agent \"AppleWebKit/53\" http://$HOST1/test-site/features/PI/
sleep 1
# Credit card info leakage
curl -s -i -m 2 --compressed --referer http://$HOST1/ --header "55555: 41.63.191.251" --user-agent \"AppleWebKit/53\" http://$HOST1/test-site/features/PI/Page1.html
sleep 1
# Session - cookie poisoning
curl -s -i -m 2 --compressed --referer http://$HOST1/ --header "55555: 5.7.7.7" -H "Cookie: hacker=foo" --user-agent \"AppleWebKit/53\" http://$HOST1/test-site/features/PI/new.html
sleep 1
# HTTP Method HEAD
curl -I -s -i -m 2 --compressed --referer http://$HOST1/ --header "55555: 41.223.91.251" --user-agent \"AppleWebKit/53\" http://$HOST1/test-site/features/PI/Page1.html
sleep 1
# XML Security Invalid POST
curl -s -i -m 2 -X POST -H "Accept: text/xml" -H "Content-Type: text/xml" --header "55555: 27.34.180.31"  -d "<abcd" http://$HOST1/test-site/features/PI/Page1.html
sleep 1
# Vulnerabilities Path Traversal
curl -s -i -m 2 --compressed --referer http://$HOST1/ --header "55555: 5.8.8.8" --user-agent \"AppleWebKit/53\" http://$HOST1/test-site/features/PI/Page1.html?view=../../../../etc/passwd
sleep 1
# Vulnerabilities Server Info leakage
curl -s -i -m 2 --compressed --referer http://$HOST1/ --header "55555: 5.5.5.5" --user-agent \"AppleWebKit/53\" http://$HOST1/test-site/features/PI/Page1.html?doc=/bin/ls|
sleep 1
# Database SQL injection
curl -s -i -m 2 --compressed --referer http://$HOST1/ --header "55555: 63.143.105.255" --user-agent \"AppleWebKit/53\" http://$HOST1/test-site/features/PI/Page1.html?SELECT%20user_id,%20username,%20password_hash%20FROM%20users%20WHERE%20username%20=%20%27john%27
sleep 1
# Vulnerabilities URL Access Violation
curl -s -i -m 2 --compressed --referer http://$HOST1/ --header "55555: 5.8.159.251" --user-agent \"AppleWebKit/53\" http://$HOST1/test-site/features/PI/Page1.html?cmd.exe=100
sleep 1
#HTTP Method PUT
curl -s -i -m 2 "${curlArgs[@]}" --request PUT --data '{"id":"1","emailAddress":"george.washington@america.com","businessPhone":"555-555-5555"}' http://$HOST1/test-site/features/PI/Page1.html
sleep 1
# Directory listing
curl -s -i -m 2 --compressed --referer http://$HOST1/ --header "55555: 27.116.59.251" --user-agent \"AppleWebKit/53\" http://$HOST1/test-site/features/
sleep 1
# Directory listing
curl -s -i -m 2 --compressed --referer http://$HOST1/ --header "55555: 27.116.59.251" --user-agent \"AppleWebKit/53\" http://$HOST1/?cmd.exe=0
sleep 1

#PathBlocking
curl -s -i -m 2 --compressed --referer http://$HOST1/ --header "55555: 27.116.59.251" --user-agent \"AppleWebKit/53\" http://$HOST1/test-site/features/BCI/auto/frame1.html
sleep 1

#normal traffic
curl -s -i -m 2 --compressed --referer http://$HOST1/ --header "55555: 27.116.59.251" --user-agent \"AppleWebKit/53\" http://$HOST1/test-site/features/PI/new.html
sleep 1
curl -s -i -m 2 --compressed --referer http://$HOST1/ --header "55555: 27.116.59.251" --user-agent \"AppleWebKit/53\" http://$HOST1/dev/ResponseRewriterFilterTest.aspx
sleep 1
curl -s -i -m 2 --compressed --referer http://$HOST1/ --header "55555: 27.116.59.251" --user-agent \"AppleWebKit/53\" http://$HOST1/dev/ImageTest.aspx
sleep 1
curl -s -i -m 2 --compressed --referer http://$HOST1/ --header "55555: 27.116.59.251" --user-agent \"AppleWebKit/53\" http://$HOST1/dev/TransferTest.aspx
sleep 1



#FOR NODE_custom host
# Directory listing
curl -s -i -m 2 --compressed --referer http://$HOST3/ --header "55555: 27.116.59.251" --user-agent \"AppleWebKit/53\" http://$HOST3/test-site/features/PI/
sleep 1
# Page used to test 'AllowList' filter
curl -s -i -m 2 --compressed --referer http://$HOST3/ --header "55555: 41.63.191.251" --user-agent \"AppleWebKit/53\" http://$HOST3/test-site/features/PI/new.html
sleep 1
# SafeReply - leakage & Session - cookie poisoning
curl -s -i -m 2 --compressed --referer http://$HOST3/ --header "55555: 5.7.7.7" -H "Cookie: hacker=foo" --user-agent \"AppleWebKit/53\" http://$HOST3/test-site/features/PI/Page1.html
sleep 1
# HTTP Method HEAD
curl -I -s -i -m 2 --compressed --referer http://$HOST3/ --header "55555: 41.223.91.251" --user-agent \"AppleWebKit/53\" http://$HOST3/test-site/features/PI/Page1.html
sleep 1
# XML Security Invalid POST
curl -s -i -m 2 -X POST -H "Accept: text/xml" -H "Content-Type: text/xml" --header "55555: 27.34.180.31"  -d "<abcd" http://$HOST3/test-site/features/PI/Page1.html
sleep 1
# Vulnerabilities Path Traversal
curl -s -i -m 2 --compressed --referer http://$HOST3/ --header "55555: 5.8.8.8" --user-agent \"AppleWebKit/53\" http://$HOST3/test-site/features/PI/Page1.html?view=../../../../etc/passwd
sleep 1
# Vulnerabilities Server Info leakage
curl -s -i -m 2 --compressed --referer http://$HOST3/ --header "55555: 5.5.5.5" --user-agent \"AppleWebKit/53\" http://$HOST3/test-site/features/PI/Page1.html?doc=/bin/ls|
sleep 1
# Database SQL injection
curl -s -i -m 2 --compressed --referer http://$HOST3/ --header "55555: 63.143.105.255" --user-agent \"AppleWebKit/53\" http://$HOST3/test-site/features/PI/Page1.html?SELECT%20user_id,%20username,%20password_hash%20FROM%20users%20WHERE%20username%20=%20%27john%27
sleep 1
# Vulnerabilities URL Access Violation
curl -s -i -m 2 --compressed --referer http://$HOST3/ --header "55555: 5.8.159.251" --user-agent \"AppleWebKit/53\" http://$HOST3/test-site/features/PI/Page1.html?cmd.exe=100
sleep 1
#HTTP Method PUT
curl -s -i -m 2 "${curlArgs[@]}" --request PUT --data '{"id":"1","emailAddress":"george.washington@america.com","businessPhone":"555-555-5555"}' http://$HOST3/test-site/features/PI/Page1.html
sleep 1


#hackMe
# Directory Listing with query
curl -s -i -m 2 --compressed --referer http://$HOST2/ --user-agent \"AppleWebKit/53\" http://$HOST2/DirectoryListing/?a=b'&'a=c
sleep 1
# HTTP Method HEAD
curl -I -s -i -m 2 --compressed --referer http://$HOST2/ --user-agent \"AppleWebKit/53\" http://$HOST2/SecurityPage/SecurityBlock.asp
sleep 1

# Session - cookie poisoning with query
curl -s -i -m 2 --compressed --referer http://$HOST2/ -H "Cookie: hacker=foo" --user-agent \"AppleWebKit/53\" http://$HOST2/SecurityPage/SecurityBlock.asp
sleep 1
# Vulnerabilities URL Access Violation
curl -s -i -m 2 --compressed --referer http://$HOST2/ --user-agent \"AppleWebKit/53\" http://$HOST2/?cmd.exe=0
sleep 1

# XML Security Invalid POST
curl -s -i -m 2 -X POST -H "Accept: text/xml" -H "Content-Type: text/xml" -d "<foo" --user-agent \"AppleWebKit/53\" http://$HOST2/HacmeBank_V2_Website/aspx/login.aspx
sleep 1
#Parsing Error RFC Violation
curl -s -i -m 2 --compressed --referer http://$HOST2/ --user-agent \"AppleWebKit/53\" http://$HOST2/HacmeBank_V2_Website/aspx/login.aspx/HacmeBank_V2_Website/aspx/login.aspx?view=manager'&'view=config.html
sleep 1
# Vulnerabilities - Server Info Leakage
curl -s -i -m 2 --compressed --referer http://$HOST2/ --user-agent \"AppleWebKit/53\" http://$HOST2/HacmeBank_V2_Website/aspx/login.aspx?doc=/bin/ls|

sleep 1
# SafeReply - CreditCard number Leakage
curl -s -i -m 2 --compressed --referer http://$HOST2/ --user-agent \"AppleWebKit/53\" http://$HOST2/SafeReplyTest/ccn.txt
sleep 1

# Database SQL injection
curl -s -i -m 2 --compressed --referer http://$HOST2/ --user-agent \"AppleWebKit/53\" http://$HOST2/HacmeBank_V2_Website/aspx/login.aspx?select*from%20nuser%20where%20user_id=%27blah%27%20or%201=1--%20and%20password=%27anything%27
sleep 1
#XSS Attack
curl -s -i -m 2 --compressed --referer http://$HOST2/ --user-agent \"AppleWebKit/53\" http://$HOST2/index.php
sleep 1


# Directory Listing with query
curl -s -i -m 2 --compressed --referer http://$HOST4/ --user-agent \"AppleWebKit/53\" http://$HOST4/DirectoryListing/
sleep 1
# HTTP Method HEAD
curl -I -s -i -m 2 --compressed --referer http://$HOST4/ --user-agent \"AppleWebKit/53\" http://$HOST4/SecurityPage/SecurityBlock.asp
sleep 1

# Session - cookie poisoning with query
curl -s -i -m 2 --compressed --referer http://$HOST4/ -H "Cookie: hacker=foo" --user-agent \"AppleWebKit/53\" http://$HOST4/SecurityPage/SecurityBlock.asp
sleep 1
# Vulnerabilities URL Access Violation
curl -s -i -m 2 --compressed --referer http://$HOST4/ --user-agent \"AppleWebKit/53\" http://$HOST4/?cmd.exe=1
sleep 1
curl -s -i -m 2 --compressed --referer http://$HOST4/ --user-agent \"AppleWebKit/53\" http://$HOST4/
sleep 1

# XML Security Invalid POST
curl -s -i -m 2 -X POST -H "Accept: text/xml" -H "Content-Type: text/xml" -d "<foo" --user-agent \"AppleWebKit/53\" http://$HOST4/HacmeBank_V2_Website/aspx/login.aspx
sleep 1
curl -s -i -m 2 --compressed --referer http://$HOST4/ --user-agent \"AppleWebKit/53\" http://$HOST4/HacmeBank_V2_Website/aspx/login.aspx/HacmeBank_V2_Website/aspx/login.aspx
sleep 1
# Vulnerabilities - Server Info Leakage
curl -s -i -m 2 --compressed --referer http://$HOST4/ --user-agent \"AppleWebKit/53\" http://$HOST4/HacmeBank_V2_Website/aspx/login.aspx?doc=/bin/ls|
sleep 1
# SafeReply - CreditCard number Leakage
curl -s -i -m 2 --compressed --referer http://$HOST4/ --user-agent \"AppleWebKit/53\" http://$HOST4/SafeReplyTest/ccn.txt
sleep 1

# Database SQL injection
curl -s -i -m 2 --compressed --referer http://$HOST4/ --user-agent \"AppleWebKit/53\" http://$HOST4/HacmeBank_V2_Website/aspx/login.aspx?select*from%20nuser%20where%20user_id=%27blah%27%20or%201=1--%20and%20password=%27anything%27
sleep 1

#XSS Attack
curl -s -i -m 2 --compressed --referer http://$HOST4/ --user-agent \"AppleWebKit/53\" http://$HOST4/index.php
sleep 1



done
